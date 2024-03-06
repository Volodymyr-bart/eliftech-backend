import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Shop } from 'src/schemas/shop.schema';
import { Model } from 'mongoose';
import { CreateShopDto } from './dto/create-shop.dto';

@Injectable()
export class ShopsService {
  constructor(@InjectModel(Shop.name) private shopModel: Model<Shop>) {}

  async createShop(createShopDto: CreateShopDto): Promise<Shop> {
    const newShop = new this.shopModel(createShopDto);
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

  async deleteShop(shopId: string): Promise<Shop> {
    const deletedShop = await this.shopModel.findByIdAndDelete(shopId);
    if (!deletedShop) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return deletedShop;
  }
}
