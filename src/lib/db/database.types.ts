export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];
export interface Database {
  public: {
    Tables: {
      activities: {
        Row: {
          created_at: string;
          created_by: string | null;
          description: string;
          id: string;
          reference_id: string | null;
          reference_type: string | null;
          type: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          description: string;
          id?: string;
          reference_id?: string | null;
          reference_type?: string | null;
          type: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          description?: string;
          id?: string;
          reference_id?: string | null;
          reference_type?: string | null;
          type?: string;
        };
      };
      customers: {
        Row: {
          address: string | null;
          created_at: string;
          created_by: string | null;
          deleted_at: string | null;
          id: string;
          last_visit: string | null;
          name: string;
          notes: string | null;
          outstanding_balance: number | null;
          phone: string;
          total_orders: number | null;
          updated_at: string;
        };
        Insert: {
          address?: string | null;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          id?: string;
          last_visit?: string | null;
          name: string;
          notes?: string | null;
          outstanding_balance?: number | null;
          phone: string;
          total_orders?: number | null;
          updated_at?: string;
        };
        Update: {
          address?: string | null;
          created_at?: string;
          created_by?: string | null;
          deleted_at?: string | null;
          id?: string;
          last_visit?: string | null;
          name?: string;
          notes?: string | null;
          outstanding_balance?: number | null;
          phone?: string;
          total_orders?: number | null;
          updated_at?: string;
        };
      };
      expenses: {
        Row: {
          amount: number | null;
          category: string;
          created_at: string;
          created_by: string | null;
          date: string;
          description: string | null;
          id: string;
          notes: string | null;
        };
        Insert: {
          amount?: number | null;
          category: string;
          created_at?: string;
          created_by?: string | null;
          date?: string;
          description?: string | null;
          id?: string;
          notes?: string | null;
        };
        Update: {
          amount?: number | null;
          category?: string;
          created_at?: string;
          created_by?: string | null;
          date?: string;
          description?: string | null;
          id?: string;
          notes?: string | null;
        };
      };
      notifications: {
        Row: {
          created_at: string;
          id: string;
          is_read: boolean | null;
          message: string;
          reference_id: string | null;
          title: string;
          type: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_read?: boolean | null;
          message: string;
          reference_id?: string | null;
          title: string;
          type: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_read?: boolean | null;
          message?: string;
          reference_id?: string | null;
          title?: string;
          type?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          price: number | null;
          product_id: string;
          quantity: number | null;
          total: number | null;
        };
        Insert: {
          id?: string;
          order_id: string;
          price?: number | null;
          product_id: string;
          quantity?: number | null;
          total?: number | null;
        };
        Update: {
          id?: string;
          order_id?: string;
          price?: number | null;
          product_id?: string;
          quantity?: number | null;
          total?: number | null;
        };
      };
      order_status_history: {
        Row: {
          created_at: string;
          created_by: string | null;
          id: string;
          notes: string | null;
          order_id: string;
          status: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          notes?: string | null;
          order_id: string;
          status: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          notes?: string | null;
          order_id?: string;
          status?: string;
        };
      };
      orders: {
        Row: {
          advance_payment: number | null;
          attachments: string[] | null;
          created_at: string;
          created_by: string | null;
          customer_id: string;
          deleted_at: string | null;
          delivery_date: string | null;
          discount: number | null;
          id: string;
          notes: string | null;
          order_number: string;
          remaining_amount: number | null;
          status: string;
          tax: number | null;
          total_amount: number | null;
          updated_at: string;
        };
        Insert: {
          advance_payment?: number | null;
          attachments?: string[] | null;
          created_at?: string;
          created_by?: string | null;
          customer_id: string;
          deleted_at?: string | null;
          delivery_date?: string | null;
          discount?: number | null;
          id?: string;
          notes?: string | null;
          order_number: string;
          remaining_amount?: number | null;
          status?: string;
          tax?: number | null;
          total_amount?: number | null;
          updated_at?: string;
        };
        Update: {
          advance_payment?: number | null;
          attachments?: string[] | null;
          created_at?: string;
          created_by?: string | null;
          customer_id?: string;
          deleted_at?: string | null;
          delivery_date?: string | null;
          discount?: number | null;
          id?: string;
          notes?: string | null;
          order_number?: string;
          remaining_amount?: number | null;
          status?: string;
          tax?: number | null;
          total_amount?: number | null;
          updated_at?: string;
        };
      };
      parcels: {
        Row: {
          attachments: string[] | null;
          bus_name: string;
          charges: number | null;
          created_at: string;
          created_by: string | null;
          destination: string;
          driver_name: string | null;
          driver_phone: string | null;
          id: string;
          notes: string | null;
          parcel_number: string;
          receiver_name: string;
          receiver_phone: string | null;
          status: string;
          updated_at: string;
        };
        Insert: {
          attachments?: string[] | null;
          bus_name: string;
          charges?: number | null;
          created_at?: string;
          created_by?: string | null;
          destination: string;
          driver_name?: string | null;
          driver_phone?: string | null;
          id?: string;
          notes?: string | null;
          parcel_number: string;
          receiver_name: string;
          receiver_phone?: string | null;
          status?: string;
          updated_at?: string;
        };
        Update: {
          attachments?: string[] | null;
          bus_name?: string;
          charges?: number | null;
          created_at?: string;
          created_by?: string | null;
          destination?: string;
          driver_name?: string | null;
          driver_phone?: string | null;
          id?: string;
          notes?: string | null;
          parcel_number?: string;
          receiver_name?: string;
          receiver_phone?: string | null;
          status?: string;
          updated_at?: string;
        };
      };
      payments: {
        Row: {
          amount: number | null;
          created_at: string;
          created_by: string | null;
          customer_id: string;
          id: string;
          method: string | null;
          notes: string | null;
          order_id: string | null;
          reference: string | null;
        };
        Insert: {
          amount?: number | null;
          created_at?: string;
          created_by?: string | null;
          customer_id: string;
          id?: string;
          method?: string | null;
          notes?: string | null;
          order_id?: string | null;
          reference?: string | null;
        };
        Update: {
          amount?: number | null;
          created_at?: string;
          created_by?: string | null;
          customer_id?: string;
          id?: string;
          method?: string | null;
          notes?: string | null;
          order_id?: string | null;
          reference?: string | null;
        };
      };
      products: {
        Row: {
          category: string | null;
          created_at: string;
          created_by: string | null;
          current_stock: number | null;
          deleted_at: string | null;
          id: string;
          location: string | null;
          minimum_stock: number | null;
          name: string;
          purchase_price: number | null;
          remarks: string | null;
          selling_price: number | null;
          sku: string | null;
          updated_at: string;
        };
        Insert: {
          category?: string | null;
          created_at?: string;
          created_by?: string | null;
          current_stock?: number | null;
          deleted_at?: string | null;
          id?: string;
          location?: string | null;
          minimum_stock?: number | null;
          name: string;
          purchase_price?: number | null;
          remarks?: string | null;
          selling_price?: number | null;
          sku?: string | null;
          updated_at?: string;
        };
        Update: {
          category?: string | null;
          created_at?: string;
          created_by?: string | null;
          current_stock?: number | null;
          deleted_at?: string | null;
          id?: string;
          location?: string | null;
          minimum_stock?: number | null;
          name?: string;
          purchase_price?: number | null;
          remarks?: string | null;
          selling_price?: number | null;
          sku?: string | null;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          business_address: string | null;
          business_name: string | null;
          created_at: string;
          email: string | null;
          full_name: string;
          id: string;
          phone: string | null;
          updated_at: string;
        };
        Insert: {
          business_address?: string | null;
          business_name?: string | null;
          created_at?: string;
          email?: string | null;
          full_name: string;
          id?: string;
          phone?: string | null;
          updated_at?: string;
        };
        Update: {
          business_address?: string | null;
          business_name?: string | null;
          created_at?: string;
          email?: string | null;
          full_name?: string;
          id?: string;
          phone?: string | null;
          updated_at?: string;
        };
      };
      purchase_items: {
        Row: {
          cost: number | null;
          id: string;
          product_id: string;
          purchase_id: string;
          quantity: number | null;
          total: number | null;
        };
        Insert: {
          cost?: number | null;
          id?: string;
          product_id: string;
          purchase_id: string;
          quantity?: number | null;
          total?: number | null;
        };
        Update: {
          cost?: number | null;
          id?: string;
          product_id?: string;
          purchase_id?: string;
          quantity?: number | null;
          total?: number | null;
        };
      };
      purchases: {
        Row: {
          attachments: string[] | null;
          created_at: string;
          created_by: string | null;
          id: string;
          invoice_number: string | null;
          notes: string | null;
          supplier: string;
          total_cost: number | null;
          transport_cost: number | null;
        };
        Insert: {
          attachments?: string[] | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          invoice_number?: string | null;
          notes?: string | null;
          supplier: string;
          total_cost?: number | null;
          transport_cost?: number | null;
        };
        Update: {
          attachments?: string[] | null;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          invoice_number?: string | null;
          notes?: string | null;
          supplier?: string;
          total_cost?: number | null;
          transport_cost?: number | null;
        };
      };
      return_items: {
        Row: {
          amount: number | null;
          id: string;
          product_id: string;
          quantity: number | null;
          return_id: string;
        };
        Insert: {
          amount?: number | null;
          id?: string;
          product_id: string;
          quantity?: number | null;
          return_id: string;
        };
        Update: {
          amount?: number | null;
          id?: string;
          product_id?: string;
          quantity?: number | null;
          return_id?: string;
        };
      };
      returns: {
        Row: {
          created_at: string;
          created_by: string | null;
          id: string;
          notes: string | null;
          reason: string | null;
          reference_id: string;
          total_amount: number | null;
          type: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          notes?: string | null;
          reason?: string | null;
          reference_id: string;
          total_amount?: number | null;
          type: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          notes?: string | null;
          reason?: string | null;
          reference_id?: string;
          total_amount?: number | null;
          type?: string;
        };
      };
      sale_items: {
        Row: {
          id: string;
          price: number | null;
          product_id: string;
          quantity: number | null;
          sale_id: string;
          total: number | null;
        };
        Insert: {
          id?: string;
          price?: number | null;
          product_id: string;
          quantity?: number | null;
          sale_id: string;
          total?: number | null;
        };
        Update: {
          id?: string;
          price?: number | null;
          product_id?: string;
          quantity?: number | null;
          sale_id?: string;
          total?: number | null;
        };
      };
      sales: {
        Row: {
          created_at: string;
          created_by: string | null;
          customer_id: string;
          discount: number | null;
          due_amount: number | null;
          id: string;
          notes: string | null;
          payment_amount: number | null;
          total_amount: number | null;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          customer_id: string;
          discount?: number | null;
          due_amount?: number | null;
          id?: string;
          notes?: string | null;
          payment_amount?: number | null;
          total_amount?: number | null;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          customer_id?: string;
          discount?: number | null;
          due_amount?: number | null;
          id?: string;
          notes?: string | null;
          payment_amount?: number | null;
          total_amount?: number | null;
        };
      };
      service_jobs: {
        Row: {
          accessories: string | null;
          attachments: string[] | null;
          created_at: string;
          created_by: string | null;
          customer_id: string;
          engineer: string | null;
          expected_date: string | null;
          id: string;
          job_number: string;
          problem: string | null;
          product_id: string | null;
          remarks: string | null;
          serial_number: string | null;
          status: string;
          updated_at: string;
        };
        Insert: {
          accessories?: string | null;
          attachments?: string[] | null;
          created_at?: string;
          created_by?: string | null;
          customer_id: string;
          engineer?: string | null;
          expected_date?: string | null;
          id?: string;
          job_number: string;
          problem?: string | null;
          product_id?: string | null;
          remarks?: string | null;
          serial_number?: string | null;
          status?: string;
          updated_at?: string;
        };
        Update: {
          accessories?: string | null;
          attachments?: string[] | null;
          created_at?: string;
          created_by?: string | null;
          customer_id?: string;
          engineer?: string | null;
          expected_date?: string | null;
          id?: string;
          job_number?: string;
          problem?: string | null;
          product_id?: string | null;
          remarks?: string | null;
          serial_number?: string | null;
          status?: string;
          updated_at?: string;
        };
      };
      service_timeline: {
        Row: {
          created_at: string;
          created_by: string | null;
          id: string;
          notes: string | null;
          service_id: string;
          status: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          notes?: string | null;
          service_id: string;
          status: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          notes?: string | null;
          service_id?: string;
          status?: string;
        };
      };
      stock_transactions: {
        Row: {
          created_at: string;
          created_by: string | null;
          id: string;
          notes: string | null;
          product_id: string;
          quantity: number;
          reference_id: string;
          reference_type: string;
          type: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          notes?: string | null;
          product_id: string;
          quantity: number;
          reference_id: string;
          reference_type: string;
          type: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          notes?: string | null;
          product_id?: string;
          quantity?: number;
          reference_id?: string;
          reference_type?: string;
          type?: string;
        };
      };
      warranties: {
        Row: {
          amc: boolean | null;
          created_at: string;
          end_date: string;
          free_service_count: number | null;
          id: string;
          reminder_date: string | null;
          service_id: string;
          service_count: number | null;
          start_date: string;
          updated_at: string;
        };
        Insert: {
          amc?: boolean | null;
          created_at?: string;
          end_date: string;
          free_service_count?: number | null;
          id?: string;
          reminder_date?: string | null;
          service_id: string;
          service_count?: number | null;
          start_date: string;
          updated_at?: string;
        };
        Update: {
          amc?: boolean | null;
          created_at?: string;
          end_date?: string;
          free_service_count?: number | null;
          id?: string;
          reminder_date?: string | null;
          service_id?: string;
          service_count?: number | null;
          start_date?: string;
          updated_at?: string;
        };
      };
    };
  };
}
