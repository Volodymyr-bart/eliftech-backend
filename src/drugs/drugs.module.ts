import { Module } from '@nestjs/common';
import { DrugsService } from './drugs.service';
import { DrugsController } from './drugs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Drug, DrugSchema } from 'src/schemas/drug.schema';
import { ShopsModule } from 'src/shops/shops.module';

@Module({
  imports: [
    ShopsModule,
    MongooseModule.forFeature([{ name: Drug.name, schema: DrugSchema }]),
  ],
  controllers: [DrugsController],
  providers: [DrugsService],
  exports: [MongooseModule, DrugsService],
})
export class DrugsModule {}
