// import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import {Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

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