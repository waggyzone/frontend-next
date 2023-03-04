import { type } from "os";

export type createUser = {
  firstName: string;
  lastName: string;
  age: number;
  username: string;
  password: string;
};

export type product = {
  _id?: string;
  name: string;
  brandname: string;
  price: number;
};
export type accessories = {
  _id?: string;
  name: string;
  size: string;
  price: number;
  color: string;
};
exporttype cart={
   _id?: string;
   status:string;
   count:number;

}
