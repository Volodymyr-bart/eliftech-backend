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

  async getDrugsByShopId(
    shopId: string,
    filters: {
      filter: string;
      keyword: string;
    },
  ): Promise<Drug[]> {
    try {
      const shop = await this.shopsService.getShopById(shopId);
      if (!shop) {
        throw new HttpException('Shop not found', HttpStatus.NOT_FOUND);
      }

      let drugsFromShop = await this.drugModel.find({ shops: shop }).exec();
      if (filters.keyword && filters.keyword !== '') {
        drugsFromShop = drugsFromShop.filter((drug) =>
          drug.title.toLowerCase().includes(filters.keyword.toLowerCase()),
        );
      }
      switch (filters.filter) {
        case 'new':
          drugsFromShop = drugsFromShop.sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
          );
          break;
        case 'old':
          drugsFromShop = drugsFromShop.sort(
            (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
          );
          break;
        case 'expensive':
          drugsFromShop = drugsFromShop.sort((a, b) => b.price - a.price);
          break;
        case 'cheap':
          drugsFromShop = drugsFromShop.sort((a, b) => a.price - b.price);
          break;
        case 'A-Z':
          drugsFromShop = drugsFromShop.sort((a, b) =>
            a.title.localeCompare(b.title),
          );
          break;
        case 'Z-A':
          drugsFromShop = drugsFromShop.sort((a, b) =>
            b.title.localeCompare(a.title),
          );
          break;
        default:
          break;
      }
      return drugsFromShop;
    } catch (error) {
      console.log(error);
    }
  }

  async addDrugToShop(drugId: string, shopId: string): Promise<Drug> {
    try {
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

      return drug;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteDrugFromShop(drugId: string, shopId: string): Promise<Drug> {
    try {
      const drug = await this.drugModel.findById(drugId);
      if (!drug) {
        throw new HttpException('Not found drug', HttpStatus.NOT_FOUND);
      }
      const shop = await this.shopsService.getShopById(shopId);
      if (!shop) {
        throw new HttpException('Not found shop', HttpStatus.NOT_FOUND);
      }
      // To do Delete

      await drug.save();
      return drug;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, updateDrugDto: UpdateDrugDto): Promise<Drug> {
    try {
      const updatedDrug = await this.drugModel.findByIdAndUpdate(
        id,
        updateDrugDto,
        { new: true },
      );
      if (!updatedDrug) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return updatedDrug;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string): Promise<Drug> {
    try {
      const deletedDrug = await this.drugModel.findByIdAndDelete(id);
      if (!deletedDrug) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return deletedDrug;
    } catch (error) {
      console.log(error);
    }
  }
}
