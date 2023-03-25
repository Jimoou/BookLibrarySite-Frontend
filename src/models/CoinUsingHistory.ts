class CoinUsingHistory {
  id: number;
  title: string;
  amount: number;
  balance: number;
  checkoutDate: string;
  constructor(
    id: number,
    title: string,
    amount: number,
    balance: number,
    checkoutDate: string
  ) {
    this.id = id;
    this.title = title;
    this.amount = amount;
    this.balance = balance;
    this.checkoutDate = checkoutDate;
  }
}
export default CoinUsingHistory;
