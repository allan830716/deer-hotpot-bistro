import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import {
  addCartItem,
  clearCart,
  createCategory,
  createOrder,
  createProduct,
  deleteProduct,
  getCartItems,
  getCategories,
  getDashboardStats,
  getOrderById,
  getOrders,
  getProductById,
  getProducts,
  removeCartItem,
  updateCartItem,
  updateOrderStatus,
  updateProduct,
  getAllUsers,
} from "./db";

// ── Products Router ────────────────────────────────────────────────────────────
const productsRouter = router({
  list: publicProcedure
    .input(z.object({ categoryId: z.number().optional(), activeOnly: z.boolean().optional() }).optional())
    .query(({ input }) => getProducts({ categoryId: input?.categoryId, activeOnly: input?.activeOnly ?? true })),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getProductById(input.id)),

  create: adminProcedure
    .input(z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      price: z.string(),
      originalPrice: z.string().optional(),
      imageUrl: z.string().optional(),
      images: z.array(z.string()).optional(),
      stock: z.number().default(0),
      isActive: z.boolean().default(true),
      isFeatured: z.boolean().default(false),
      tags: z.array(z.string()).optional(),
      sortOrder: z.number().default(0),
      categoryId: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      await createProduct(input as any);
      return { success: true };
    }),

  update: adminProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      description: z.string().optional(),
      price: z.string().optional(),
      originalPrice: z.string().optional(),
      imageUrl: z.string().optional(),
      images: z.array(z.string()).optional(),
      stock: z.number().optional(),
      isActive: z.boolean().optional(),
      isFeatured: z.boolean().optional(),
      tags: z.array(z.string()).optional(),
      sortOrder: z.number().optional(),
      categoryId: z.number().optional(),
      stripeProductId: z.string().optional(),
      stripePriceId: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateProduct(id, data as any);
      return { success: true };
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deleteProduct(input.id);
      return { success: true };
    }),
});

// ── Categories Router ──────────────────────────────────────────────────────────
const categoriesRouter = router({
  list: publicProcedure.query(() => getCategories()),

  create: adminProcedure
    .input(z.object({
      name: z.string().min(1),
      slug: z.string().min(1),
      description: z.string().optional(),
      sortOrder: z.number().default(0),
    }))
    .mutation(async ({ input }) => {
      await createCategory(input);
      return { success: true };
    }),
});

// ── Cart Router ────────────────────────────────────────────────────────────────
const cartRouter = router({
  getCart: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ input }) => {
      const items = await getCartItems(input.sessionId);
      // Enrich with product info
      const enriched = await Promise.all(items.map(async (item) => {
        const product = await getProductById(item.productId);
        return { ...item, product };
      }));
      return enriched;
    }),

  addItem: publicProcedure
    .input(z.object({
      sessionId: z.string(),
      productId: z.number(),
      quantity: z.number().min(1).default(1),
      userId: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      await addCartItem(input as any);
      return { success: true };
    }),

  updateQuantity: publicProcedure
    .input(z.object({ id: z.number(), quantity: z.number().min(0) }))
    .mutation(async ({ input }) => {
      await updateCartItem(input.id, input.quantity);
      return { success: true };
    }),

  removeItem: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await removeCartItem(input.id);
      return { success: true };
    }),

  clearCart: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .mutation(async ({ input }) => {
      await clearCart(input.sessionId);
      return { success: true };
    }),
});

// ── Orders Router ──────────────────────────────────────────────────────────────
const ordersRouter = router({
  list: adminProcedure
    .input(z.object({ limit: z.number().optional() }).optional())
    .query(({ input }) => getOrders({ limit: input?.limit })),

  myOrders: protectedProcedure
    .query(({ ctx }) => getOrders({ userId: ctx.user.id })),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getOrderById(input.id)),

  updateStatus: adminProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["pending", "paid", "processing", "shipped", "delivered", "cancelled", "refunded"]),
    }))
    .mutation(async ({ input }) => {
      await updateOrderStatus(input.id, input.status);
      return { success: true };
    }),
});

// ── Admin Router ───────────────────────────────────────────────────────────────
const adminRouter = router({
  dashboard: adminProcedure.query(() => getDashboardStats()),
  users: adminProcedure.query(() => getAllUsers()),
});

// ── Checkout Router (Stripe) ───────────────────────────────────────────────────
const checkoutRouter = router({
  createSession: publicProcedure
    .input(z.object({
      sessionId: z.string(),
      customerName: z.string().optional(),
      customerEmail: z.string().optional(),
      customerPhone: z.string().optional(),
      shippingAddress: z.string().optional(),
      notes: z.string().optional(),
      origin: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      // Get cart items
      const cartData = await getCartItems(input.sessionId);
      if (cartData.length === 0) throw new Error("Cart is empty");

      // Enrich with product info
      const enriched = await Promise.all(cartData.map(async (item) => {
        const product = await getProductById(item.productId);
        if (!product) throw new Error(`Product ${item.productId} not found`);
        return { ...item, product };
      }));

      const totalAmount = enriched.reduce((sum, item) => {
        return sum + parseFloat(item.product!.price) * item.quantity;
      }, 0);

      // Check if Stripe is configured
      const stripeKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeKey) {
        // Return mock session for demo
        const orderNumber = `DEER-${Date.now()}`;
        const orderId = await createOrder(
          {
            orderNumber,
            status: "pending",
            totalAmount: totalAmount.toFixed(2),
            currency: "TWD",
            customerName: input.customerName,
            customerEmail: input.customerEmail,
            customerPhone: input.customerPhone,
            shippingAddress: input.shippingAddress,
            notes: input.notes,
            userId: ctx.user?.id,
          },
          enriched.map(item => ({
            orderId: 0,
            productId: item.productId,
            productName: item.product!.name,
            productImageUrl: item.product!.imageUrl,
            quantity: item.quantity,
            unitPrice: item.product!.price,
            subtotal: (parseFloat(item.product!.price) * item.quantity).toFixed(2),
          }))
        );
        await clearCart(input.sessionId);
        return { mode: "demo" as const, orderId, orderNumber, totalAmount };
      }

      // Stripe integration
      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(stripeKey, { apiVersion: "2024-12-18.acacia" as any });

      const lineItems = enriched.map(item => ({
        price_data: {
          currency: "twd",
          product_data: {
            name: item.product!.name,
            images: item.product!.imageUrl ? [item.product!.imageUrl] : [],
          },
          unit_amount: Math.round(parseFloat(item.product!.price)),
        },
        quantity: item.quantity,
      }));

      const orderNumber = `DEER-${Date.now()}`;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${input.origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${input.origin}/cart`,
        metadata: { orderNumber, sessionId: input.sessionId },
        customer_email: input.customerEmail,
      });

      // Create pending order
      const orderId = await createOrder(
        {
          orderNumber,
          status: "pending",
          totalAmount: totalAmount.toFixed(2),
          currency: "TWD",
          customerName: input.customerName,
          customerEmail: input.customerEmail,
          customerPhone: input.customerPhone,
          shippingAddress: input.shippingAddress,
          notes: input.notes,
          stripeSessionId: session.id,
          userId: ctx.user?.id,
        },
        enriched.map(item => ({
            orderId: 0,
            productId: item.productId,
            productName: item.product!.name,
            productImageUrl: item.product!.imageUrl,
            quantity: item.quantity,
            unitPrice: item.product!.price,
            subtotal: (parseFloat(item.product!.price) * item.quantity).toFixed(2),
          }))
        );

      return { mode: "stripe" as const, url: session.url, orderId, orderNumber };
    }),

  verifySession: publicProcedure
    .input(z.object({ stripeSessionId: z.string() }))
    .query(async ({ input }) => {
      const stripeKey = process.env.STRIPE_SECRET_KEY;
      if (!stripeKey) return { status: "demo" };
      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(stripeKey, { apiVersion: "2024-12-18.acacia" as any });
      const session = await stripe.checkout.sessions.retrieve(input.stripeSessionId);
      return { status: session.payment_status, customerEmail: session.customer_email };
    }),
});

// ── App Router ─────────────────────────────────────────────────────────────────
export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  products: productsRouter,
  categories: categoriesRouter,
  cart: cartRouter,
  orders: ordersRouter,
  admin: adminRouter,
  checkout: checkoutRouter,
});

export type AppRouter = typeof appRouter;
