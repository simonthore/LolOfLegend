import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, InputType } from "type-graphql";

@Entity()
@ObjectType() // Décorateur GraphQL pour indiquer que cette classe est un type GraphQL
export class Team {
  @PrimaryGeneratedColumn()
  @Field() // Décorateur GraphQL pour indiquer que c'est un champ GraphQL
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;
}

@InputType() // Modèle d'entrée GraphQL
export class TeamInput implements Partial<Team> {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}
