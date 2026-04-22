import { Express, Request, Response } from "express";
import { getOrderByStripeSession, updateOrderStatus } from "./db";

export function registerStripeWebhook(app: Express) {
  // IMPORTANT: Must use express.raw BEFORE express.json for webhook signature verification
  app.post(
    "/api/stripe/webhook",
    // raw body middleware specifically for this route
    (req: Request, res: Response, next) => {
      // If already parsed (Buffer), pass through
      if (Buffer.isBuffer(req.body)) return next();
      // Otherwise collect raw body
      let data = "";
      req.setEncoding("utf8");
      req.on("data", (chunk) => { data += chunk; });
      req.on("end", () => {
        (req as any).rawBody = data;
        next();
      });
    },
    async (req: Request, res: Response) => {
      const stripeKey = process.env.STRIPE_SECRET_KEY;
      const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

      if (!stripeKey) {
        return res.status(400).json({ error: "Stripe not configured" });
      }

      let event: any;

      try {
        const rawBody = (req as any).rawBody as string | undefined;
        const sig = req.headers["stripe-signature"] as string;

        if (webhookSecret && sig && rawBody) {
          // Verify webhook signature with raw body
          const Stripe = (await import("stripe")).default;
          const stripe = new Stripe(stripeKey, { apiVersion: "2024-12-18.acacia" as any });
          event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
        } else {
          // No webhook secret configured, parse body directly from rawBody or req.body
          const bodyStr = rawBody || (typeof req.body === "string" ? req.body : JSON.stringify(req.body));
          event = JSON.parse(bodyStr);
        }
      } catch (err: any) {
        console.error("[Stripe Webhook] Signature verification failed:", err.message);
        return res.status(400).json({ error: `Webhook Error: ${err.message}` });
      }

      // Guard: event must be defined
      if (!event) {
        return res.status(400).json({ error: "Invalid event" });
      }

      // Handle test events
      if (event.id && event.id.startsWith("evt_test_")) {
        console.log("[Stripe Webhook] Test event detected, returning verification response");
        return res.json({ verified: true });
      }

      console.log(`[Stripe Webhook] Event: ${event.type} | ID: ${event.id}`);

      try {
        switch (event.type) {
          case "checkout.session.completed": {
            const session = event.data.object;
            const stripeSessionId = session.id;
            const paymentIntentId = session.payment_intent;

            // Find order by stripe session ID
            const order = await getOrderByStripeSession(stripeSessionId);
            if (order) {
              await updateOrderStatus(order.id, "paid", {
                stripePaymentIntentId: paymentIntentId,
                paidAt: new Date(),
              });
              console.log(`[Stripe Webhook] Order ${order.orderNumber} marked as paid`);
            } else {
              console.warn(`[Stripe Webhook] No order found for session: ${stripeSessionId}`);
            }
            break;
          }

          case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            console.log(`[Stripe Webhook] Payment succeeded: ${paymentIntent.id}`);
            break;
          }

          case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            console.log(`[Stripe Webhook] Payment failed: ${paymentIntent.id}`);
            break;
          }

          default:
            console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
        }
      } catch (err: any) {
        console.error("[Stripe Webhook] Processing error:", err.message);
        return res.status(500).json({ error: "Webhook processing failed" });
      }

      res.json({ received: true });
    }
  );
}
