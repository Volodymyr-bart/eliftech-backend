import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from 'src/schemas/orders.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const newOrder = new this.orderModel(createOrderDto);
      return await newOrder.save();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  }

  async findAll(body: { email: string; phone: string }): Promise<Order[]> {
    try {
      const { email, phone } = body;
      const query = {
        $or: [{ email }, { phone }],
      };
      const orders = await this.orderModel.find(query).exec();

      return orders;
    } catch (error) {
      console.log(error);
    }
  }
}
