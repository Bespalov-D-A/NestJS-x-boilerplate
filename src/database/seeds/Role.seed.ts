import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import {Role} from "../../entities/roles.entity";
import {defaultRoles} from "../../modules/roles/assests/defaultRoles";

export default class BaseRolesSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository =  dataSource.getRepository(Role);
        await repository.insert(defaultRoles);
    }
}