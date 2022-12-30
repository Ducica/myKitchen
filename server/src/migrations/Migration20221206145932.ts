import { Migration } from '@mikro-orm/migrations';

export class Migration20221206145932 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "task" ("id" serial primary key, "title" varchar(255) not null, "description" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "task" cascade;');
  }

}
