export interface OrderItem {
  product_id: string;
  qty: number;
  price: number;
}

export interface CreateOrderRequest {
  customer_name: string;
  items: OrderItem[];
}

export interface Order {
  id: string;
  order_id: string;
  customer_name: string;
  total: number;
  created_at: string;
  items: OrderItem[];
}
