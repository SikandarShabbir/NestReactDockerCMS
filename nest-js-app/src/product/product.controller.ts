import {
    Body,
    ClassSerializerInterceptor,
    Controller, Delete,
    Get, Param,
    Post, Put, Query, Req,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ProductService} from "./product.service";
import {Product} from "./models/product.entity";
import {AuthGuard} from "../auth/auth.guard";
import {CreateProductDto} from "./models/createProduct.dto";
import {UpdateProductDto} from "./models/updateProduct.dto";
import {HasPermission} from "../permission/Decorator/has-permission.decorator";

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('products')
export class ProductController {
    constructor(private productService: ProductService,
    ) {
    }

    // @Get()
    // @HasPermission('products')
    // async all(): Promise<Product[]> {
    //     return await this.productService.all();
    // }

    @Get(':id')
    @HasPermission('products')
    async get(@Param('id') id: number): Promise<Product> {
        return await this.productService.findOneBy({id});
    }

    @Post()
    @HasPermission('products')
    async create(@Body() productDTO: CreateProductDto): Promise<Product[]> {
        return await this.productService.create(productDTO);
    }

    @Put(':id')
    @HasPermission('products')
    async update(@Body() productDTO: UpdateProductDto, @Param('id') id: number) {
        await this.productService.update(id, productDTO);
        return await this.productService.findOneBy({id});
    }

    @Delete(':id')
    @HasPermission('products')
    async delete(@Param('id') id: number) {
        return await this.productService.delete(id);
    }

    @Get()
    @HasPermission('products')
    async paginate(@Query('page') page: number, @Query('take') take: number): Promise<any> {
        return await this.productService.paginate(page, take);
    }
}
