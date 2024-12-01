export interface Partner {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  currentLoad: number;
  areas: string[];
  shift: string;
  metrics: Record<string, any>;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customer: string;
  area: string;
  items: string[];
  status: string;
  scheduledFor: string;
  totalAmount: number;
}
