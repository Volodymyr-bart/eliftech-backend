import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from 'src/schemas/shop.schema';
import { DrugsModule } from 'src/drugs/drugs.module';
import { DrugsService } from 'src/drugs/drugs.service';

@Module({
  imports: [
    DrugsModule,
    MongooseModule.forFeature([{ name: Shop.name, schema: ShopSchema }]),
  ],
  controllers: [ShopsController],
  providers: [ShopsService, DrugsService],
})
export class ShopsModule {}
