import { ProductService } from "./product.service";
import { Product } from "./models/product.entity";
import { CreateProductDto } from "./models/createProduct.dto";
import { UpdateProductDto } from "./models/updateProduct.dto";
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    get(id: number): Promise<Product>;
    create(productDTO: CreateProductDto): Promise<Product[]>;
    update(productDTO: UpdateProductDto, id: number): Promise<any>;
    delete(id: number): Promise<any>;
    paginate(page: number, take: number): Promise<any>;
}
