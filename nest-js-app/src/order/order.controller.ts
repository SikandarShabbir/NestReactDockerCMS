import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Query,
    Res,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {OrderService} from "./order.service";
import {PaginateInterface} from "../common/interfaces/paginate.interface";
import {AuthGuard} from "../auth/auth.guard";
import {Response} from "express";
import {Parser} from "json2csv";
import {Order} from "./models/order.entity";
import {OrderItem} from "./models/order-items.entity";
import {HasPermission} from "../permission/Decorator/has-permission.decorator";

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class OrderController {
    constructor(private orderService: OrderService) {
    }

    @Get('orders')
    @HasPermission('orders')
    async getOrders(
        @Query('page') page: number,
        @Query('take') take: number
    ): Promise<PaginateInterface> {
        return await this.orderService.paginate(page, take, ['order_items']);
    }

    @Get('export')
    @HasPermission('orders')
    async export(@Res() response: Response): Promise<any> {
        const parser = new Parser({
            fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
        });

        const orders = await this.orderService.all(['order_items']);
        console.log('Hello!');
        // return orders;
        const json = [];
        orders.forEach((data: Order) => {
            json.push({
                ID: data.id,
                Name: data.name,
                Email: data.email,
                'Product Title': '',
                Price: '',
                Quantity: '',
            });

            data.order_items.forEach((items: OrderItem) => {
                json.push({
                    ID: '',
                    Name: '',
                    Email: '',
                    'Product Title': items.product_title,
                    Price: items.price,
                    Quantity: items.quantity,
                });
            });
        });

        const csv = parser.parse(json);
        response.header('Content-Type', 'text/csv');
        response.attachment('orders.csv');
        return response.send(csv);
    }

    @Get('chart')
    @HasPermission('orders')
    async chart() {
        return this.orderService.chart();
    }

}
