export type createUser = {
  firstName: string;
  lastName: string;
  age: number;
  username: string;
  password: string;
};

export type product = {
  _id: string;
  name: string;
  brandname: string;
  price: number;
};
export type accessories = {
  _id: string;
  name: string;
  size: string;
  price: number;
  color: string;
};

export type cart = {
  _id?: string;
  product_id: string;
  accessories_id: string;
  count: number;
  status: string;
};
