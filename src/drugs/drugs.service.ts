import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDrugDto } from './dto/create-drug.dto';
import { UpdateDrugDto } from './dto/update-drug.dto';
import { Drug } from 'src/schemas/drug.schema';
import { ShopsService } from 'src/shops/shops.service';

@Injectable()
export class DrugsService {
  constructor(
    @InjectModel(Drug.name) private drugModel: Model<Drug>,
    private readonly shopsService: ShopsService,
  ) {}

  async create(createDrugDto: CreateDrugDto): Promise<Drug> {
    const newDrug = new this.drugModel(createDrugDto);
    return newDrug.save();
  }

  async findAll(): Promise<Drug[]> {
    return this.drugModel.find().exec();
  }

  async findOne(id: string): Promise<Drug> {
    const drug = await this.drugModel.findById(id);
    if (!drug) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return drug;
  }

  async getDrugsByShopId(shopId: string): Promise<Drug[]> {
    const shop = await this.shopsService.getShopById(shopId);
    if (!shop) {
      throw new HttpException('Shop not found', HttpStatus.NOT_FOUND);
    }
    const drugsFromShop = await this.drugModel.find({ shops: shop }).exec();
    if (!drugsFromShop.length) {
      throw new HttpException(
        'Drugs not found for the specified shop',
        HttpStatus.NOT_FOUND,
      );
    }
    return drugsFromShop;
  }

  async addDrugToShop(drugId: string, shopId: string): Promise<Drug[]> {
    const drug = await this.drugModel.findById(drugId);
    if (!drug) {
      throw new HttpException('Not found drug', HttpStatus.NOT_FOUND);
    }
    const shop = await this.shopsService.getShopById(shopId);
    if (!shop) {
      throw new HttpException('Not found shop', HttpStatus.NOT_FOUND);
    }
    drug.shops.push(shop);
    await drug.save();

    return this.drugModel.find().exec();
  }
  async deleteDrugFromShop(drugId: string, shopId: string): Promise<Drug[]> {
    const drug = await this.drugModel.findById(drugId);
    if (!drug) {
      throw new HttpException('Not found drug', HttpStatus.NOT_FOUND);
    }
    const shop = await this.shopsService.getShopById(shopId);
    if (!shop) {
      throw new HttpException('Not found shop', HttpStatus.NOT_FOUND);
    }
    // drug.shops.push(shop);
    await drug.save();
    return this.drugModel.find().exec();
  }

  async update(id: string, updateDrugDto: UpdateDrugDto): Promise<Drug> {
    const updatedDrug = await this.drugModel.findByIdAndUpdate(
      id,
      updateDrugDto,
      { new: true },
    );
    if (!updatedDrug) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return updatedDrug;
  }

  async remove(id: string): Promise<Drug> {
    const deletedDrug = await this.drugModel.findByIdAndDelete(id);
    if (!deletedDrug) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return deletedDrug;
  }
}
