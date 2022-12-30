import "reflect-metadata";
import { Field, InputType, Mutation, Query, Resolver, Arg } from "type-graphql";
import {Task} from '../entities/tasks'

@InputType()
class TaskInput {
    @Field()
    title!: string;
    @Field()
    description?: string;

}
let _id=0
const tasks:Task[] = [];
@Resolver()
export class TasksResolver {

  @Query(() => [Task])
  async tasks  (){

    return tasks
  }
  @Mutation(()=>Task)
  async postTask(@Arg('input') input:TaskInput ){
    const newPhoto = {
        id:_id++,
        ...input,
        createdAt:new Date(),
        updatedAt:new Date()
    }
    tasks.push(newPhoto)
    return newPhoto
  }


  }

