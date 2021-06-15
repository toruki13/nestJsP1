import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const prodId = Math.floor(Math.random() * 10).toString();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }
  getProducts() {
    return [...this.products];
  }
  getProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }
  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number
  ) {
    const [product, index] = this.findProduct(productId);
    const updateProduct = this.unNullObj({
      productId,
      title,
      description,
      price,
    });
    this.products[index] = { ...product, ...updateProduct };
    return this.products[index];
  }

  deleteProduct(productId: string) {
    const [product, index] = this.findProduct(productId);
    this.products.splice(index, 1);
    return productId;
  }
  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];

    if (!product) {
      throw new NotFoundException('Not Found');
    }
    return [product, productIndex];
  }

  private unNullObj(obj: {}) {
    const newObj = {};
    for (const key in obj) {
      if (key) {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  }
}
