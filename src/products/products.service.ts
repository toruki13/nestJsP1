import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }
  getProducts() {
    return [...this.products];
  }
  getProduct(productId: string) {
    const product = this.products.find((product) => product.id === productId);

    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return { ...product };
  }
}
