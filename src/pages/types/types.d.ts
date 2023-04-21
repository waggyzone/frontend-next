export type createUser = {
  firstName: string;
  lastName: string;
  age: number;
  username: string;
  password: string;
};

export type UserRoleUpdate = {
  role: string;
};

export type product = {
  _id: string;
  name: string;
  brandname: string;
  price: number;
  image: string;
  public_id: string;
};
export type accessories = {
  _id: string;
  name: string;
  size: string;
  price: number;
  color: string;
  image: string;
  public_id: string;
};

export type store = {
  _id: string;
  name: string;
  breed: string;
  price: number;
  color: string;
  image: string;
  public_id: string;
  dob: Date;
};

export type cart = {
  _id?: string;
  product_id: string;
  accessories_id: string;
  count: number;
  status: string;
};
