import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1546448892680 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "widget" ("id" SERIAL NOT NULL, "label" text NOT NULL, "color" text NOT NULL, CONSTRAINT "PK_feb5fda4f8d30bbe0022f4ca804" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "widget"`);
    }

}
