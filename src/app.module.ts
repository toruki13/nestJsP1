import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    MongooseModule.forRoot(process.env.MONGODB_URI.toString()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
