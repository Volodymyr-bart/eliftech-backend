import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Shop } from 'src/schemas/shop.schema';
import { Model } from 'mongoose';
import { CreateShopDto } from './dto/create-shop.dto';
import { Drug } from 'src/schemas/drug.schema';

@Injectable()
export class ShopsService {
  constructor(
    @InjectModel(Shop.name) private shopModel: Model<Shop>,
    @InjectModel(Drug.name) private drugModel: Model<Drug>,
  ) {}

  async createShop({ title }: CreateShopDto): Promise<Shop> {
    const newShop = new this.shopModel({ title });
    return newShop.save();
  }

  async getShopById(shopId: string): Promise<Shop> {
    const shop = await this.shopModel.findById(shopId);
    if (!shop) {
      throw new HttpException('Not found shop', HttpStatus.NOT_FOUND);
    }
    return shop;
  }

  async getAllShops(): Promise<Shop[]> {
    return this.shopModel.find().exec();
  }

  async addDrugToShop(shopId: string, orderId: string): Promise<Shop> {
    const shop = await this.shopModel.findById(shopId);
    if (!shop) {
      throw new HttpException('Not found shop', HttpStatus.NOT_FOUND);
    }
    const drug = await this.drugModel.findById(orderId);
    if (!drug) {
      throw new HttpException('Not found drug', HttpStatus.NOT_FOUND);
    }
    shop.drugs.push(drug);

    await shop.save();
    return shop;
  }

  async addOrderToShop(shopId: string, orderId: string): Promise<Shop> {
    return this.shopModel.findByIdAndUpdate(
      shopId,
      { $push: { orders: orderId } },
      { new: true },
    );
  }
  async deleteShop(shopId: string): Promise<Shop> {
    const deletedShop = await this.shopModel.findByIdAndDelete(shopId);
    if (!deletedShop) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return deletedShop;
  }
}
