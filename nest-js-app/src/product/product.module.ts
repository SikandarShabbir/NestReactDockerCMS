import {Module} from '@nestjs/common';
import {ProductController} from './product.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "./models/product.entity";
import {ProductService} from './product.service';
import { UploadController } from './upload/upload.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product])
    ],
    controllers: [ProductController, UploadController],
    providers: [ProductService],
    exports: []
})
export class ProductModule {
}
