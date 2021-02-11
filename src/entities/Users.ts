import {Column, Entity, CreateDateColumn, UpdateDateColumn, PrimaryColumn, BaseEntity, OneToMany} from "typeorm"
import { Post } from "./Post";


@Entity()
export class User extends BaseEntity {

  @PrimaryColumn()
  id!: string;

  @Column({unique: true})
  username!: string;
  
  @Column()
  password!: string;

  @Column()
  email!: string;

  @OneToMany(() => Post, post => post.creator)
  post: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}