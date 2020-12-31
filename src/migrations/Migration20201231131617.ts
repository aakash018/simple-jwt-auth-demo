import { Migration } from '@mikro-orm/migrations';

export class Migration20201231131617 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "username" varchar(255) not null, "password" varchar(255) not null, "email" varchar(255) not null);');
  }

}
