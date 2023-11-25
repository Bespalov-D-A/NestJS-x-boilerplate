import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from '../../entities/roles.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {}

  async createRole(dto: CreateRoleDto, key?: string) {
    const findedRole = await this.getRoleByValue(dto.value);
    if (findedRole) {
      const msg = 'This role is alreay exists';
      if (key && key === 'init') {
        console.log(msg);
        return
      } else {
        throw new HttpException(msg, HttpStatus.BAD_REQUEST);
      }
    }
    return this.roleRepository.create(dto);
  }

  async getRoleByValue(value: string) {
    return await this.roleRepository.findOne({ where: { value } });
  }
}
