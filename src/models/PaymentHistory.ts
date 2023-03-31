class PaymentHistory {
  id: number;
  title: string;
  author: string;
  category: number;
  img: string;
  publisher: string;
  amount: number;
  price: number;
  paymentDate: string;
  orderId: string;
  constructor(
    id: number,
    title: string,
    author: string,
    category: number,
    img: string,
    publisher: string,
    amount: number,
    price: number,
    paymentDate: string,
    orderId: string
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.category = category;
    this.img = img;
    this.publisher = publisher;
    this.amount = amount;
    this.price = price;
    this.paymentDate = paymentDate;
    this.orderId = orderId;
  }
}
export default PaymentHistory;
