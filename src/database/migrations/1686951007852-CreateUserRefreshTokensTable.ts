import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRefreshTokensTable1685388113430
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_refresh_tokens',
        columns: [
          {
            name: 'user_id',
            type: 'bigint',
            isPrimary: true,
          },
          {
            name: 'token',
            type: 'varchar',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'user_refresh_tokens',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_refresh_tokens');
  }
}
