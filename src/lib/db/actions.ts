"use server";
import { supabase } from "./client";
import { Database } from "./database.types";
import { revalidatePath } from "next/cache";
type Tables = Database["public"]["Tables"];
export async function getDashboardStats() {
  const today = new Date().toISOString().split("T")[0];
  const { data: todayOrders } = await supabase
    .from("orders")
    .select("id", { count: "exact" })
    .gte("created_at", `${today}T00:00:00`)
    .lt("created_at", `${today}T23:59:59`);
  const { data: pendingOrders } = await supabase
    .from("orders")
    .select("id", { count: "exact" })
    .eq("status", "pending")
    .is("deleted_at", null);
  const { data: completedOrders } = await supabase
    .from("orders")
    .select("id", { count: "exact" })
    .eq("status", "delivered")
    .is("deleted_at", null);
  const { data: pendingPayments } = await supabase
    .from("customers")
    .select("outstanding_balance")
    .gt("outstanding_balance", 0);
  const { data: todayExpenses } = await supabase
    .from("expenses")
    .select("amount")
    .eq("date", today);
  const { data: lowStock } = await supabase
    .from("products")
    .select("id", { count: "exact" })
    .lte("current_stock", 5)
    .gt("current_stock", 0)
    .is("deleted_at", null);
  const { data: outOfStock } = await supabase
    .from("products")
    .select("id", { count: "exact" })
    .eq("current_stock", 0)
    .is("deleted_at", null);
  const { data: todayServices } = await supabase
    .from("service_jobs")
    .select("id", { count: "exact" })
    .gte("created_at", `${today}T00:00:00`)
    .lt("created_at", `${today}T23:59:59`);
  const { data: upcomingJobs } = await supabase
    .from("service_jobs")
    .select("id", { count: "exact" })
    .eq("status", "pending")
    .gte("expected_date", today);
  return {
    today_orders: todayOrders?.length || 0,
    pending_orders: pendingOrders?.length || 0,
    completed_orders: completedOrders?.length || 0,
    pending_payments:
      pendingPayments?.reduce(
        (sum, c) => sum + (c.outstanding_balance || 0),
        0,
      ) || 0,
    today_expenses:
      todayExpenses?.reduce((sum, e) => sum + (e.amount || 0), 0) || 0,
    low_stock: lowStock?.length || 0,
    out_of_stock: outOfStock?.length || 0,
    today_services: todayServices?.length || 0,
    upcoming_jobs: upcomingJobs?.length || 0,
  };
}
export async function getRecentActivities(limit = 10) {
  const { data } = await supabase
    .from("activities")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  return data || [];
}
export async function getCustomers(search?: string) {
  let query = supabase
    .from("customers")
    .select("*")
    .is("deleted_at", null)
    .order("name");
  if (search) {
    query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%`);
  }
  const { data } = await query;
  return data || [];
}
export async function getCustomerById(id: string) {
  const { data } = await supabase
    .from("customers")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}
export async function createCustomer(customer: Tables["customers"]["Insert"]) {
  const { data, error } = await supabase
    .from("customers")
    .insert(customer)
    .select()
    .single();
  if (error) throw error;
  await supabase.from("activities").insert({
    type: "customer_created",
    description: `Customer ${customer.name} created`,
    reference_id: data.id,
    reference_type: "customer",
  });
  revalidatePath("/customers");
  return data;
}
export async function updateCustomer(
  id: string,
  customer: Tables["customers"]["Update"],
) {
  const { data, error } = await supabase
    .from("customers")
    .update(customer)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  revalidatePath("/customers");
  return data;
}
export async function deleteCustomer(id: string) {
  const { error } = await supabase
    .from("customers")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/customers");
}
export async function getProducts(search?: string,
lowStock?: boolean) {
  let query = supabase
    .from("products")
    .select("*")
    .is("deleted_at", null)
    .order("name");
  if (search) {
    query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%`);
  }
  if (lowStock) {
    query = query.lte("current_stock", 5);
  }
  const { data } = await query;
  return data || [];
}
export async function getProductById(id: string) {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}
export async function createProduct(product: Tables["products"]["Insert"]) {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();
  if (error) throw error;
  await supabase.from("activities").insert({
    type: "product_created",
    description: `Product ${product.name} created`,
    reference_id: data.id,
    reference_type: "product",
  });
  revalidatePath("/products");
  return data;
}
export async function updateProduct(
  id: string,
  product: Tables["products"]["Update"],
) {
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  revalidatePath("/products");
  return data;
}
export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from("products")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/products");
}
export async function getOrders(status?: string) {
  let query = supabase
    .from("orders")
    .select(
      `*, customer:customers(*), items:order_items(*, product:products(*))`,
    )
    .is("deleted_at", null)
    .order("created_at", { ascending: false });
  if (status) {
    query = query.eq("status", status);
  }
  const { data } = await query;
  return data || [];
}
export async function getOrderById(id: string) {
  const { data } = await supabase
    .from("orders")
    .select(
      `*, customer:customers(*), items:order_items(*, product:products(*)), status_history:order_status_history(*)`,
    )
    .eq("id", id)
    .single();
  return data;
}
export async function createOrder(
  order: Tables["orders"]["Insert"],
  items: Tables["order_items"]["Insert"][],
) {
  const { data: orderData,
error: orderError } = await supabase
    .from("orders")
    .insert(order)
    .select()
    .single();
  if (orderError) throw orderError;
  const itemsWithOrder = items.map((item) => ({
    ...item,
    order_id: orderData.id,
  }));
  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(itemsWithOrder);
  if (itemsError) throw itemsError;
  await supabase.from("order_status_history").insert({
    order_id: orderData.id,
    status: order.status || "pending",
    notes: "Order created",
  });
  for (const item of items) {
    await supabase
      .from("products")
      .update({
        current_stock: supabase.rpc("decrement_stock", {
          product_id: item.product_id,
          amount: item.quantity,
        }),
      })
      .eq("id", item.product_id);
  }
  await supabase.from("activities").insert({
    type: "order_created",
    description: `Order ${order.order_number} created`,
    reference_id: orderData.id,
    reference_type: "order",
  });
  revalidatePath("/orders");
  return orderData;
}
export async function updateOrderStatus(
  id: string,
  status: string,
  notes?: string,
) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  await supabase.from("order_status_history").insert({
    order_id: id,
    status,
    notes: notes || `Status changed to ${status}`,
  });
  revalidatePath("/orders");
  return data;
}
export async function getPayments() {
  const { data } = await supabase
    .from("payments")
    .select(`*, customer:customers(*), order:orders(*)`)
    .order("created_at", { ascending: false });
  return data || [];
}
export async function createPayment(payment: Tables["payments"]["Insert"]) {
  const { data, error } = await supabase
    .from("payments")
    .insert(payment)
    .select()
    .single();
  if (error) throw error;
  if (payment.customer_id) {
    const { data: customer } = await supabase
      .from("customers")
      .select("outstanding_balance")
      .eq("id", payment.customer_id)
      .single();
    if (customer) {
      await supabase
        .from("customers")
        .update({
          outstanding_balance:
            (customer.outstanding_balance || 0) - (payment.amount || 0),
        })
        .eq("id", payment.customer_id);
    }
  }
  await supabase.from("activities").insert({
    type: "payment_received",
    description: `Payment of ${payment.amount} received`,
    reference_id: data.id,
    reference_type: "payment",
  });
  revalidatePath("/payments");
  return data;
}
export async function getExpenses(
  category?: string,
  startDate?: string,
  endDate?: string,
) {
  let query = supabase
    .from("expenses")
    .select("*")
    .order("date", { ascending: false });
  if (category) query = query.eq("category", category);
  if (startDate) query = query.gte("date", startDate);
  if (endDate) query = query.lte("date", endDate);
  const { data } = await query;
  return data || [];
}
export async function createExpense(expense: Tables["expenses"]["Insert"]) {
  const { data, error } = await supabase
    .from("expenses")
    .insert(expense)
    .select()
    .single();
  if (error) throw error;
  revalidatePath("/expenses");
  return data;
}
export async function getServiceJobs(status?: string) {
  let query = supabase
    .from("service_jobs")
    .select(
      `*, customer:customers(*), product:products(*), timeline:service_timeline(*)`,
    )
    .order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);
  const { data } = await query;
  return data || [];
}
export async function createServiceJob(job: Tables["service_jobs"]["Insert"]) {
  const { data, error } = await supabase
    .from("service_jobs")
    .insert(job)
    .select()
    .single();
  if (error) throw error;
  await supabase.from("service_timeline").insert({
    service_id: data.id,
    status: job.status || "pending",
    notes: "Service job created",
  });
  revalidatePath("/services");
  return data;
}
export async function updateServiceStatus(
  id: string,
  status: string,
  notes?: string,
) {
  const { data, error } = await supabase
    .from("service_jobs")
    .update({ status })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  await supabase.from("service_timeline").insert({
    service_id: id,
    status,
    notes: notes || `Status changed to ${status}`,
  });
  revalidatePath("/services");
  return data;
}
export async function getParcels(status?: string) {
  let query = supabase
    .from("parcels")
    .select("*")
    .order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);
  const { data } = await query;
  return data || [];
}
export async function createParcel(parcel: Tables["parcels"]["Insert"]) {
  const { data, error } = await supabase
    .from("parcels")
    .insert(parcel)
    .select()
    .single();
  if (error) throw error;
  revalidatePath("/parcels");
  return data;
}
export async function updateParcelStatus(id: string,
status: string) {
  const { data, error } = await supabase
    .from("parcels")
    .update({ status })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  revalidatePath("/parcels");
  return data;
}
export async function globalSearch(query: string) {
  const [customers, products, orders, services] = await Promise.all([
    supabase
      .from("customers")
      .select("*")
      .is("deleted_at", null)
      .or(`name.ilike.%${query}%,phone.ilike.%${query}%`)
      .limit(5),
    supabase
      .from("products")
      .select("*")
      .is("deleted_at", null)
      .or(`name.ilike.%${query}%,sku.ilike.%${query}%`)
      .limit(5),
    supabase
      .from("orders")
      .select("*, customer:customers(name)")
      .is("deleted_at", null)
      .or(`order_number.ilike.%${query}%`)
      .limit(5),
    supabase
      .from("service_jobs")
      .select("*, customer:customers(name)")
      .or(`job_number.ilike.%${query}%`)
      .limit(5),
  ]);
  return {
    customers: customers.data || [],
    products: products.data || [],
    orders: orders.data || [],
    services: services.data || [],
  };
}
