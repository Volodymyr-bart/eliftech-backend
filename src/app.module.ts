import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { DrugsModule } from './drugs/drugs.module';
import { ShopsModule } from './shops/shops.module';

@Module({
  imports: [OrdersModule, DrugsModule, ShopsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
