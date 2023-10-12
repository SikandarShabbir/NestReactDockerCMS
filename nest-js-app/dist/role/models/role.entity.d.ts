import { Permission } from "../../permission/model/permission.entity";
export declare class Role {
    id: number;
    name: string;
    permissions: Permission[];
}
