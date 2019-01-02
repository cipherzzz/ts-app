import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, getManager} from "typeorm";
//import {initializeDbConnection} from "../../config/postgres"


@Entity()
export class Widget extends BaseEntity {

  /**
   * Unique Identifier
   */
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column("text")
  public label!: string;

  @Column("text")
  public color!: string;
}

export async function getRepository() {
  return getManager("default").getRepository(Widget);
}