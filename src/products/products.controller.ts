import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  addProduct(
    /*     @Body() completeBody: { prodTitle: string; prodDesc: string; prodPrice: number } */
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number
  ): any {
    const generatedId = this.productsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice
    );
    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number
  ) {
    return this.productsService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice
    );
  }
  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    return this.productsService.deleteProduct(prodId);
  }
}
