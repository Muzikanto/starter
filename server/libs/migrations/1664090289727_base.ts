import { MigrationInterface, QueryRunner } from 'typeorm';

export class Base1664090289727 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(``);
  }
}
