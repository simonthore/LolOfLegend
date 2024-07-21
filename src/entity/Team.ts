import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, InputType } from "type-graphql";

@InputType()
export class TeamInput {
  @Field()
  name: string;

  @Field() 
  members: string;;

  @Field()
  description?: string;
}

@Entity()
@ObjectType()
export class Team {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  // @Field()
  // @Column()
  // members: string;

  // @Field()
  // @Column()
  // description:string;
}