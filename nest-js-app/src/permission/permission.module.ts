import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Permission} from "./model/permission.entity";
import {RoleModule} from "../role/role.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]),
      RoleModule
  ],
  controllers: [PermissionController],
  providers: [PermissionService]
})
export class PermissionModule {}
