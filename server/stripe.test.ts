import { describe, it, expect, vi, beforeEach } from "vitest";
import express from "express";
import request from "supertest";
import { registerStripeWebhook } from "./stripeWebhook";

// Mock the db module
vi.mock("./db", () => ({
  getOrderByStripeSession: vi.fn().mockResolvedValue(null),
  updateOrderStatus: vi.fn().mockResolvedValue(undefined),
}));

function createTestApp() {
  const app = express();
  registerStripeWebhook(app);
  app.use(express.json());
  return app;
}

describe("Stripe Webhook", () => {
  beforeEach(() => {
    process.env.STRIPE_SECRET_KEY = "sk_test_51TOw2pD12hdfIODwWiecqpkVe0Mmm7yPi42p0mbGv977vYAec1noyC6mgO69qopVEU4BNShd8X3UoNU6kCRfGX9P00CBEHhUGW";
    delete process.env.STRIPE_WEBHOOK_SECRET;
  });

  it("should return 400 when Stripe is not configured", async () => {
    delete process.env.STRIPE_SECRET_KEY;
    const app = createTestApp();
    const res = await request(app)
      .post("/api/stripe/webhook")
      .send({ id: "evt_test_1", type: "test" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Stripe not configured");
  });

  it("should return verified:true for test events", async () => {
    const app = createTestApp();
    const res = await request(app)
      .post("/api/stripe/webhook")
      .set("Content-Type", "application/json")
      .send(JSON.stringify({ id: "evt_test_abc123", type: "test" }));
    expect(res.status).toBe(200);
    expect(res.body.verified).toBe(true);
  });

  it("should return received:true for checkout.session.completed", async () => {
    const app = createTestApp();
    const res = await request(app)
      .post("/api/stripe/webhook")
      .set("Content-Type", "application/json")
      .send(JSON.stringify({
        id: "evt_real_checkout_123",
        type: "checkout.session.completed",
        data: {
          object: {
            id: "cs_test_fake",
            payment_intent: "pi_test_fake",
            payment_status: "paid",
            customer_email: "test@example.com",
          },
        },
      }));
    expect(res.status).toBe(200);
    expect(res.body.received).toBe(true);
  });

  it("should return received:true for payment_intent.succeeded", async () => {
    const app = createTestApp();
    const res = await request(app)
      .post("/api/stripe/webhook")
      .set("Content-Type", "application/json")
      .send(JSON.stringify({
        id: "evt_real_pi_123",
        type: "payment_intent.succeeded",
        data: {
          object: {
            id: "pi_test_fake",
            amount: 398000,
            currency: "twd",
          },
        },
      }));
    expect(res.status).toBe(200);
    expect(res.body.received).toBe(true);
  });

  it("should return received:true for unhandled event types", async () => {
    const app = createTestApp();
    const res = await request(app)
      .post("/api/stripe/webhook")
      .set("Content-Type", "application/json")
      .send(JSON.stringify({
        id: "evt_real_unknown_123",
        type: "customer.created",
        data: { object: { id: "cus_test" } },
      }));
    expect(res.status).toBe(200);
    expect(res.body.received).toBe(true);
  });
});
