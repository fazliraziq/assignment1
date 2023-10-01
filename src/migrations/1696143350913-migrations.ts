import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1696143350913 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < 100; i++) {
      try {
        const value = Math.floor(Math.random() * (50 - 1) + 1).toString();
        const stock = {
          price: value,
          side: parseInt(value) % 2 === 0 ? 'buy' : 'sell',
        };
        await queryRunner.query(
          `INSERT INTO Order(price, side) VALUES(${stock.price}, '${stock.side}');`,
        );
      } catch (e) {
        console.log('seeders failed: ', e.message);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM Oder`);
  }
}
