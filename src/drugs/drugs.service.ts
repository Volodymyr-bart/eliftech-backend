import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDrugDto } from './dto/create-drug.dto';
import { UpdateDrugDto } from './dto/update-drug.dto';
import { Drug } from 'src/schemas/drug.schema';

@Injectable()
export class DrugsService {
  constructor(@InjectModel(Drug.name) private drugModel: Model<Drug>) {}

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
