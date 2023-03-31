class CoinChargingHistory {
  id: number;
  amount: number;
  price: number;
  paymentDate: string;
  constructor(id: number, amount: number, price: number, paymentDate: string) {
    this.id = id;
    this.amount = amount;
    this.price = price;
    this.paymentDate = paymentDate;
  }
}
export default CoinChargingHistory;
