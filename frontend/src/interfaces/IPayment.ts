export default interface IPayment {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
}
