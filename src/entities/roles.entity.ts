import { ApiProperty } from "@nestjs/swagger";
import {BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./users.entity";

@Entity()
export class Role extends BaseEntity{

  @ApiProperty({example: '1', description: 'unique id'})
  @PrimaryGeneratedColumn()
  id: number;


  @ApiProperty({example: 'Teacher', description: 'Role name'})
  @Index({unique:true})
  @Column({nullable:false})
  value: string;


  @ApiProperty({example: 'This role can connect students', description: 'Role description'})
  @Column({nullable:false})
  description: string;

  @OneToMany(()=> User, (user)=> user.role)
  users: User[]
}
