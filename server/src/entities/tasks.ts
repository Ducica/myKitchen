import "reflect-metadata";
import { Field, ID, ObjectType } from "type-graphql";
import { PrimaryKey, Property, OptionalProps, Entity } from "@mikro-orm/core";
// import { registerEnumType } from "type-graphql";

// export enum PhotoCategory {
// SELFIE = "SELFIE",
// PORTRAIT ="PORTRAIT",
// ACTION='ACTION',
// LANDSCAPE ='LANDSCAPE',
// GRAPHIC ='GRAPHIC'
// }
// registerEnumType(PhotoCategory, {
//   name: "PhotoCategory",
//   description: "Photo categories",
// });
@Entity()
@ObjectType()
export class Task {

    [OptionalProps]?: "createdAt" | "updatedAt";
    @PrimaryKey()
    @Field(() => ID)
    id!: number;

    @Property()
    @Field()
    title!: string;

    @Property()
    @Field({ nullable: true })
    description?: string;

    @Field()
    @Property({ type: "date" })
    createdAt: Date = new Date();

    @Field()
    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}


