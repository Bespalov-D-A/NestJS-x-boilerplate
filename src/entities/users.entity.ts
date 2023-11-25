import { ApiProperty } from "@nestjs/swagger";
import { Role } from "./roles.entity";
import {Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
  @ApiProperty({example: '1', description: 'unique id'})
  @PrimaryGeneratedColumn()
  id: number;

@ApiProperty({example: 'user@mail.com', description: 'User email'})
  @Index({unique:true})
  @Column({nullable: false})
  email: string;


  @ApiProperty({example: 'Password2!2004', description: 'User password'})
  @Index({unique:true})
  @Column({nullable:false})
  password: string;


  @ApiProperty({example: 'true', description: 'If user is banned'})
  @Column({ default: false})
  banned: boolean;


  @ApiProperty({example: 'By hate', description: 'Cause of the ban'})
  @Column()
  banReason: string;

  @ManyToOne(() => Role, (role) => role.users )
  role: Role
}
