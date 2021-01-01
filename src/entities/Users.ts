// import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import {Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryColumn} from "typeorm"

@Entity()
export class User {

  @PrimaryColumn()
  id!: string;

  @Column({unique: true})
  username!: string;
  
  @Column()
  password!: string;

  @Column()
  email!: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}