import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from '../../entities/users.entity';
import {CreateUserDto} from './dto/create-user.dto';
import {GiveRoleDto} from './dto/give-role.dto';
import {BanUserDto} from './dto/ban-user.dto';
import {RolesService} from '../roles/roles.service';
import {DefaultConfigOptionsService} from '../default-config-options/default-config-options.service';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
    private roleService: RolesService,
    private readonly defaultConfig: DefaultConfigOptionsService
    ) { }

    async createUser(dto: CreateUserDto) {
        const user = this.userRepository.create(dto);
        user.role = await this.roleService.getRoleByValue(this.defaultConfig.getDefaultRole())
        return await this.userRepository.save(user)
    }


    async getAllUsers() {
        return await this.userRepository.find()
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({where: {email}})
    }

    async giveRole(dto: GiveRoleDto) {
        const user = await this.userRepository.findOne({where: {id: dto.userId}})
        const role = await this.roleService.getRoleByValue(dto.value)
        if(role && user) {
            //add - added value from existed propertie
            user.role = role
            await this.userRepository.save(user)
            return dto
        }
        throw new HttpException('User or role was not found', HttpStatus.NOT_FOUND)
    }

    async banUser(dto: BanUserDto) {
        const user = await this.userRepository.findOne({where: {id:dto.userId}} )
        if(!user)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        user.banned = true
        user.banReason = dto.banReason
        //обновляем значения в БД
        return await this.userRepository.save(user)
    }
}
