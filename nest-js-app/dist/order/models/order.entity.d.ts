import { OrderItem } from "./order-items.entity";
export declare class Order {
    id: number;
    order_items: OrderItem[];
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
    get name(): string;
    get total(): number;
}
