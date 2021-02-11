
import {Column, Entity, CreateDateColumn, UpdateDateColumn,  ManyToOne, PrimaryGeneratedColumn, BaseEntity} from "typeorm"
import { User } from "./Users";
// import { Post } from "./Post";

@Entity()
export class Post extends BaseEntity {

  @PrimaryGeneratedColumn()
  id!: BigInt;

  @Column({ type: "text" })
  title!: string;
  
  @Column({ type: "text" })
  body!: string;

  @Column({ type: "text" })
  creatorId: string 

  @ManyToOne(() => User, user => user.post)
  creator: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}