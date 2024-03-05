import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopsService.createShop(createShopDto);
  }

  @Get()
  findAll() {
    return this.shopsService.getAllShops();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopsService.getShopById(id);
  }

  @Patch(':shopId/add-drug')
  addDrug(
    @Param('shopId') shopId: string,
    @Body() { idDrug }: { idDrug: string },
  ) {
    return this.shopsService.addDrugToShop(shopId, idDrug);
  }
  @Patch(':shopId/delete-drug')
  deleteDrug(
    @Param('shopId') shopId: string,
    @Body() { idDrug }: { idDrug: string },
  ) {
    return this.shopsService.deleteDrugFromShop(shopId, idDrug);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopsService.deleteShop(id);
  }
}
