import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "./models/product.entity";
import {Repository} from "typeorm";
import {AbstractService} from "../common/services/abstract.service";

@Injectable()
export class ProductService extends AbstractService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {
        super(productRepository);
    }
}
