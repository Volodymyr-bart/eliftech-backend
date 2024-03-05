import { Drug } from 'src/schemas/drug.schema';

export class CreateOrderDto {
  readonly phone: string;
  readonly email: string;
  readonly products: { drug: Drug; quantity: number }[];
}
