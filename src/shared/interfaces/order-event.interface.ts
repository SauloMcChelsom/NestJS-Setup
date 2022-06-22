export interface CreateOrderEvent {
  numberOrder: string;
  statusOrderClient: string;
  clientMethodPayment: string;
  taxaDelivery: number;
  totalOrderValue: number;
}

export interface UpdateOrderEvent {
  numberOrder: string;
  statusOrderClient: string;
}
