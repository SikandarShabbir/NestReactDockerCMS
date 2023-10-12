import { OrderService } from "./order.service";
import { PaginateInterface } from "../common/interfaces/paginate.interface";
import { Response } from "express";
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    getOrders(page: number, take: number): Promise<PaginateInterface>;
    export(response: Response): Promise<any>;
    chart(): Promise<any>;
}
