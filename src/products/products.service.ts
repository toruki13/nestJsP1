import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    const newProduct = new this.productModel({ title, description, price });
    const result = await newProduct.save();
    return result.id as string;
  }
  async getProducts() {
    const products = await this.productModel.find(); /* .exec() */
    return products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    })) /*  as Product[] */;
  }

  async getProduct(productId: string) {
    const { id, description, title, price } = await this.findProduct(productId);
    return { id, description, title, price };
  }

  async updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number
  ) {
    let updatedProduct = await this.findProduct(productId);
    const noNulls = this.unNullObj({ productId, title, description, price });
    updatedProduct = Object.assign(updatedProduct, noNulls);
    updatedProduct.save();
    return updatedProduct;
  }

  /*  deleteProduct(productId: string) {
    const [product, index] = this.findProduct(productId);
    this.products.splice(index, 1);
    return productId;
  } */
  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not Find the Product', error);
    }

    if (!product) {
      throw new NotFoundException('Could not Find the Product');
    }
    return product;
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
