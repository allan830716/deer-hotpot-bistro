import { and, desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  cartItems,
  orderItems,
  orders,
  productCategories,
  products,
  users,
  type InsertCartItem,
  type InsertOrder,
  type InsertOrderItem,
  type InsertProduct,
  type InsertProductCategory,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ── Users ─────────────────────────────────────────────────────────────────────
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = 'admin'; updateSet.role = 'admin'; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllUsers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(users).orderBy(desc(users.createdAt));
}

// ── Product Categories ─────────────────────────────────────────────────────────
export async function getCategories() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(productCategories).orderBy(productCategories.sortOrder);
}

export async function createCategory(data: InsertProductCategory) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(productCategories).values(data);
  return result;
}

// ── Products ──────────────────────────────────────────────────────────────────
export async function getProducts(opts?: { categoryId?: number; activeOnly?: boolean }) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [];
  if (opts?.activeOnly) conditions.push(eq(products.isActive, true));
  if (opts?.categoryId) conditions.push(eq(products.categoryId, opts.categoryId));
  return db.select().from(products)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(products.sortOrder, products.id);
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createProduct(data: InsertProduct) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(products).values(data);
  return result;
}

export async function updateProduct(id: number, data: Partial<InsertProduct>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(products).set(data).where(eq(products.id, id));
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(products).where(eq(products.id, id));
}

// ── Cart ──────────────────────────────────────────────────────────────────────
export async function getCartItems(sessionId: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(cartItems).where(eq(cartItems.sessionId, sessionId));
}

export async function addCartItem(data: InsertCartItem) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // Check if item already exists
  const existing = await db.select().from(cartItems)
    .where(and(eq(cartItems.sessionId, data.sessionId), eq(cartItems.productId, data.productId)))
    .limit(1);
  if (existing.length > 0) {
    await db.update(cartItems)
      .set({ quantity: existing[0].quantity + (data.quantity ?? 1) })
      .where(eq(cartItems.id, existing[0].id));
    return existing[0].id;
  }
  const result = await db.insert(cartItems).values(data);
  return (result as any)[0]?.insertId;
}

export async function updateCartItem(id: number, quantity: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (quantity <= 0) {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  } else {
    await db.update(cartItems).set({ quantity }).where(eq(cartItems.id, id));
  }
}

export async function removeCartItem(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(cartItems).where(eq(cartItems.id, id));
}

export async function clearCart(sessionId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
}

// ── Orders ────────────────────────────────────────────────────────────────────
export async function createOrder(orderData: InsertOrder, items: InsertOrderItem[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(orders).values(orderData);
  const orderId = (result as any)[0]?.insertId;
  if (items.length > 0) {
    await db.insert(orderItems).values(items.map(item => ({ ...item, orderId })));
  }
  return orderId;
}

export async function getOrders(opts?: { userId?: number; limit?: number }) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [];
  if (opts?.userId) conditions.push(eq(orders.userId, opts.userId));
  return db.select().from(orders)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(orders.createdAt))
    .limit(opts?.limit ?? 100);
}

export async function getOrderById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const orderResult = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  if (orderResult.length === 0) return undefined;
  const itemsResult = await db.select().from(orderItems).where(eq(orderItems.orderId, id));
  return { ...orderResult[0], items: itemsResult };
}

export async function updateOrderStatus(id: number, status: string, extra?: { stripeSessionId?: string; stripePaymentIntentId?: string; paidAt?: Date }) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(orders).set({ status: status as any, ...extra }).where(eq(orders.id, id));
}

export async function getOrderByStripeSession(sessionId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(orders).where(eq(orders.stripeSessionId, sessionId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getDashboardStats() {
  const db = await getDb();
  if (!db) return { totalOrders: 0, totalRevenue: 0, totalUsers: 0, totalProducts: 0 };
  const [orderStats] = await db.select({
    totalOrders: sql<number>`COUNT(*)`,
    totalRevenue: sql<number>`COALESCE(SUM(CASE WHEN status = 'paid' THEN totalAmount ELSE 0 END), 0)`,
  }).from(orders);
  const [userCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(users);
  const [productCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(products);
  return {
    totalOrders: Number(orderStats.totalOrders),
    totalRevenue: Number(orderStats.totalRevenue),
    totalUsers: Number(userCount.count),
    totalProducts: Number(productCount.count),
  };
}
