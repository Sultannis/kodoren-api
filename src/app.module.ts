import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { datasource } from './database/data-source';

import { User } from './modules/users/user.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      ...datasource,
      entities: [User],
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
