export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  notes: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  total_orders: number;
  outstanding_balance: number;
  last_visit: string | null;
  created_by: string;
}
export interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  purchase_price: number;
  selling_price: number;
  current_stock: number;
  minimum_stock: number;
  location: string;
  remarks: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  created_by: string;
}
export interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  customer?: Customer;
  items: OrderItem[];
  discount: number;
  tax: number;
  advance_payment: number;
  remaining_amount: number;
  total_amount: number;
  delivery_date: string | null;
  status: OrderStatus;
  notes: string;
  attachments: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  created_by: string;
}
export type OrderStatus =
  | "pending"
  | "checking"
  | "processing"
  | "waiting_parts"
  | "ready"
  | "delivered"
  | "cancelled";
export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product?: Product;
  quantity: number;
  price: number;
  total: number;
}
export interface OrderStatusHistory {
  id: string;
  order_id: string;
  status: OrderStatus;
  notes: string;
  created_at: string;
  created_by: string;
}
export interface Payment {
  id: string;
  customer_id: string;
  customer?: Customer;
  order_id: string | null;
  order?: Order;
  amount: number;
  method: PaymentMethod;
  reference: string;
  notes: string;
  created_at: string;
  created_by: string;
}
export type PaymentMethod = "cash" | "upi" | "bank";
export interface Purchase {
  id: string;
  supplier: string;
  invoice_number: string;
  items: PurchaseItem[];
  total_cost: number;
  transport_cost: number;
  notes: string;
  attachments: string[];
  created_at: string;
  created_by: string;
}
export interface PurchaseItem {
  id: string;
  purchase_id: string;
  product_id: string;
  product?: Product;
  quantity: number;
  cost: number;
  total: number;
}
export interface Sale {
  id: string;
  customer_id: string;
  customer?: Customer;
  items: SaleItem[];
  total_amount: number;
  discount: number;
  payment_amount: number;
  due_amount: number;
  notes: string;
  created_at: string;
  created_by: string;
}
export interface SaleItem {
  id: string;
  sale_id: string;
  product_id: string;
  product?: Product;
  quantity: number;
  price: number;
  total: number;
}
export interface ReturnRecord {
  id: string;
  type: "purchase" | "sales";
  reference_id: string;
  items: ReturnItem[];
  total_amount: number;
  reason: string;
  notes: string;
  created_at: string;
  created_by: string;
}
export interface ReturnItem {
  id: string;
  return_id: string;
  product_id: string;
  product?: Product;
  quantity: number;
  amount: number;
}
export interface Expense {
  id: string;
  category: ExpenseCategory;
  amount: number;
  description: string;
  date: string;
  notes: string;
  created_at: string;
  created_by: string;
}
export type ExpenseCategory =
  | "fuel"
  | "office"
  | "salary"
  | "transport"
  | "electricity"
  | "internet"
  | "miscellaneous";
export interface ServiceJob {
  id: string;
  job_number: string;
  customer_id: string;
  customer?: Customer;
  product_id: string | null;
  product?: Product;
  serial_number: string;
  problem: string;
  accessories: string;
  engineer: string;
  expected_date: string | null;
  status: ServiceStatus;
  remarks: string;
  timeline: ServiceTimeline[];
  attachments: string[];
  created_at: string;
  updated_at: string;
  created_by: string;
}
export type ServiceStatus =
  "pending" | "in_progress" | "waiting_parts" | "completed" | "delivered";
export interface ServiceTimeline {
  id: string;
  service_id: string;
  status: ServiceStatus;
  notes: string;
  created_at: string;
  created_by: string;
}
export interface Warranty {
  id: string;
  service_id: string;
  service?: ServiceJob;
  start_date: string;
  end_date: string;
  service_count: number;
  free_service_count: number;
  amc: boolean;
  reminder_date: string | null;
  created_at: string;
  updated_at: string;
}
export interface Parcel {
  id: string;
  parcel_number: string;
  bus_name: string;
  driver_name: string;
  driver_phone: string;
  destination: string;
  receiver_name: string;
  receiver_phone: string;
  charges: number;
  status: ParcelStatus;
  notes: string;
  attachments: string[];
  created_at: string;
  updated_at: string;
  created_by: string;
}
export type ParcelStatus = "booked" | "in_transit" | "delivered";
export interface StockTransaction {
  id: string;
  product_id: string;
  product?: Product;
  type: StockTransactionType;
  quantity: number;
  reference_id: string;
  reference_type: string;
  notes: string;
  created_at: string;
  created_by: string;
}
export type StockTransactionType =
  "purchase" | "sale" | "return" | "adjustment" | "damage";
export interface Activity {
  id: string;
  type: string;
  description: string;
  reference_id: string;
  reference_type: string;
  created_at: string;
  created_by: string;
}
export interface DashboardStats {
  today_orders: number;
  pending_orders: number;
  completed_orders: number;
  pending_payments: number;
  today_expenses: number;
  low_stock: number;
  out_of_stock: number;
  today_services: number;
  upcoming_jobs: number;
}
export interface Notification {
  id: string;
  type:
    | "low_stock"
    | "due_payment"
    | "scheduled_service"
    | "upcoming_warranty"
    | "pending_order";
  title: string;
  message: string;
  reference_id: string;
  is_read: boolean;
  created_at: string;
}
export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  business_name: string;
  business_address: string;
  created_at: string;
  updated_at: string;
}
