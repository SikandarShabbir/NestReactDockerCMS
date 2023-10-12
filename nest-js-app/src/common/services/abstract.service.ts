import {Injectable} from '@nestjs/common';
import {Repository, UpdateResult} from "typeorm";
import {PaginateInterface} from "../interfaces/paginate.interface";

@Injectable()
export abstract class AbstractService {
    protected constructor(protected readonly repository: Repository<any>) {
    }

    async all(relations: string[] = []): Promise<any[]> {
        return await this.repository.find({relations});
    }

    async create(data): Promise<any[]> {
        return this.repository.save(data);
    }

    async findOneBy(data: any, relations: string[] = [], joinObj: any = {}): Promise<any | null> {
        return this.repository.findOne({
            where: data,
            relations
        });
    }

    async update(id: number, data: object): Promise<UpdateResult> {
        return this.repository.update(id, data);
    }

    async delete(id: number): Promise<any> {
        return this.repository.delete(id);
    }

    async paginate(page: number = 1, take: number = 10, relations: string[] = []): Promise<PaginateInterface> {
        const [data, total] = await this.repository.findAndCount({
            take,
            skip: (page - 1) * take,
            relations
        });
        return {
            data: data,
            meta: {
                total, page, last_page: Math.ceil(total / take)
            }
        }
    }
}
