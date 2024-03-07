export class CreateOrderDto {
  name: string;
  phone: string;
  address: string;
  email: string;
  drugs: {
    _id: string;
    title: string;
    image: string;
    price: number;
    description: string;
    createdAt: Date;
    quantity: number;
  }[];
}
