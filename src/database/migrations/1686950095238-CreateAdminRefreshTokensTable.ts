import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAdminRefreshTokensTable1686950095238
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'admin_refresh_tokens',
        columns: [
          {
            name: 'admin_id',
            type: 'int',
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
      'admin_refresh_tokens',
      new TableForeignKey({
        columnNames: ['admin_id'],
        referencedTableName: 'admins',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('admin_refresh_tokens');
  }
}
