import { z } from "zod";
export const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().optional(),
  notes: z.string().optional(),
});
export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().optional(),
  sku: z.string().optional(),
  purchase_price: z.number().min(0).default(0),
  selling_price: z.number().min(0).default(0),
  current_stock: z.number().min(0).default(0),
  minimum_stock: z.number().min(0).default(0),
  location: z.string().optional(),
  remarks: z.string().optional(),
});
export const orderItemSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.number().min(1),
  price: z.number().min(0),
});
export const orderSchema = z.object({
  customer_id: z.string().uuid(),
  items: z.array(orderItemSchema).min(1, "At least one item required"),
  discount: z.number().min(0).default(0),
  tax: z.number().min(0).default(0),
  advance_payment: z.number().min(0).default(0),
  delivery_date: z.string().optional(),
  status: z
    .enum([
      "pending",
      "checking",
      "processing",
      "waiting_parts",
      "ready",
      "delivered",
      "cancelled",
    ])
    .default("pending"),
  notes: z.string().optional(),
});
export const paymentSchema = z.object({
  customer_id: z.string().uuid(),
  order_id: z.string().uuid().optional(),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  method: z.enum(["cash", "upi", "bank"]).default("cash"),
  reference: z.string().optional(),
  notes: z.string().optional(),
});
export const purchaseSchema = z.object({
  supplier: z.string().min(1, "Supplier is required"),
  invoice_number: z.string().optional(),
  items: z
    .array(
      z.object({
        product_id: z.string().uuid(),
        quantity: z.number().min(1),
        cost: z.number().min(0),
      }),
    )
    .min(1),
  transport_cost: z.number().min(0).default(0),
  notes: z.string().optional(),
});
export const saleSchema = z.object({
  customer_id: z.string().uuid(),
  items: z
    .array(
      z.object({
        product_id: z.string().uuid(),
        quantity: z.number().min(1),
        price: z.number().min(0),
      }),
    )
    .min(1),
  discount: z.number().min(0).default(0),
  payment_amount: z.number().min(0).default(0),
  notes: z.string().optional(),
});
export const expenseSchema = z.object({
  category: z.enum([
    "fuel",
    "office",
    "salary",
    "transport",
    "electricity",
    "internet",
    "miscellaneous",
  ]),
  amount: z.number().min(0.01),
  description: z.string().optional(),
  date: z.string(),
  notes: z.string().optional(),
});
export const serviceJobSchema = z.object({
  customer_id: z.string().uuid(),
  product_id: z.string().uuid().optional(),
  serial_number: z.string().optional(),
  problem: z.string().min(1, "Problem description is required"),
  accessories: z.string().optional(),
  engineer: z.string().optional(),
  expected_date: z.string().optional(),
  status: z
    .enum(["pending", "in_progress", "waiting_parts", "completed", "delivered"])
    .default("pending"),
  remarks: z.string().optional(),
});
export const parcelSchema = z.object({
  parcel_number: z.string().min(1, "Parcel number is required"),
  bus_name: z.string().min(1, "Bus name is required"),
  driver_name: z.string().optional(),
  driver_phone: z.string().optional(),
  destination: z.string().min(1, "Destination is required"),
  receiver_name: z.string().min(1, "Receiver name is required"),
  receiver_phone: z.string().optional(),
  charges: z.number().min(0).default(0),
  status: z.enum(["booked", "in_transit", "delivered"]).default("booked"),
  notes: z.string().optional(),
});
export type CustomerFormData = z.infer<typeof customerSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
export type OrderFormData = z.infer<typeof orderSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;
export type PurchaseFormData = z.infer<typeof purchaseSchema>;
export type SaleFormData = z.infer<typeof saleSchema>;
export type ExpenseFormData = z.infer<typeof expenseSchema>;
export type ServiceJobFormData = z.infer<typeof serviceJobSchema>;
export type ParcelFormData = z.infer<typeof parcelSchema>;
