import { AbstractService } from "../common/services/abstract.service";
import { Order } from "./models/order.entity";
import { Repository } from "typeorm";
export declare class OrderService extends AbstractService {
    private readonly orderRepository;
    constructor(orderRepository: Repository<Order>);
    chart(): Promise<any>;
}
