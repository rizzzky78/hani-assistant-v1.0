import { Collection } from "mongodb";
import { Product } from "@interface/product";
import { Customer } from "@interface/customer";
import { CustomerPaymentProof } from "@interface/payment";
import { CustomerOrderData, ApprovalOrderData } from "@interface/order-data";
import { Images } from "@interface/images";

type UserState = {
  _id: string
  timeStamp: string;
  phoneNumber: string;
};

export type CollectionsData = {
  product: Collection<Product>; // Data produk
  customer: Collection<Customer>; // Data user
  customerOrderData: Collection<CustomerOrderData>; // Data pemesanan
  approvalOrderData: Collection<ApprovalOrderData>; // Data pemesanan selesai
  customerPaymentProof: Collection<CustomerPaymentProof>; // Data pembayaran
  imageData: Collection<Images>;
  userState: Collection<UserState>;
};
