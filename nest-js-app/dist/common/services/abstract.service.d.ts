import { Repository, UpdateResult } from "typeorm";
import { PaginateInterface } from "../interfaces/paginate.interface";
export declare abstract class AbstractService {
    protected readonly repository: Repository<any>;
    protected constructor(repository: Repository<any>);
    all(relations?: string[]): Promise<any[]>;
    create(data: any): Promise<any[]>;
    findOneBy(data: any, relations?: string[], joinObj?: any): Promise<any | null>;
    update(id: number, data: object): Promise<UpdateResult>;
    delete(id: number): Promise<any>;
    paginate(page?: number, take?: number, relations?: string[]): Promise<PaginateInterface>;
}
