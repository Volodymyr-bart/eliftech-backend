import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DrugsService } from './drugs.service';
import { CreateDrugDto } from './dto/create-drug.dto';
import { UpdateDrugDto } from './dto/update-drug.dto';

@Controller('drugs')
export class DrugsController {
  constructor(private readonly drugsService: DrugsService) {}

  @Post()
  create(@Body() createDrugDto: CreateDrugDto) {
    return this.drugsService.create(createDrugDto);
  }

  @Get()
  findAll() {
    return this.drugsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drugsService.findOne(id);
  }

  @Get('drugsFromShop/:shopId')
  getDrugsByShopId(@Param('shopId') shopId: string) {
    return this.drugsService.getDrugsByShopId(shopId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDrugDto: UpdateDrugDto) {
    return this.drugsService.update(id, updateDrugDto);
  }

  @Post('shops/:shopId/drugs/:drugId')
  addToShop(@Param('shopId') shopId: string, @Param('drugId') drugId: string) {
    return this.drugsService.addDrugToShop(drugId, shopId);
  }

  @Delete('shops/:shopId/drugs/:drugId')
  deleteFromShop(
    @Param('shopId') shopId: string,
    @Param('drugId') drugId: string,
  ) {
    return this.drugsService.deleteDrugFromShop(drugId, shopId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.drugsService.remove(id);
  }
}
