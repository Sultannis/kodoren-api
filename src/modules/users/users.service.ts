import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../common/entities/user.entity';
import { LogInDto } from '../auth/dto/log-in.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(payload: LogInDto): Promise<User> {
    const user = this.usersRepository.create(payload);

    return this.usersRepository.save(user);
  }

  findAll(
    page: number,
    perPage: number,
  ): Promise<[users: User[], total: number]> {
    return this.usersRepository.findAndCount({
      skip: (page - 1) * perPage,
      take: perPage,
    });
  }

  findOneById(userId: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id: userId });
  }

  findByEmail(
    email: string,
    withDeleted: boolean = false,
  ): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email }, withDeleted });
  }

  async update(userId: number, payload: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.update(userId, payload);

    return this.usersRepository.findOneBy({ id: userId });
  }

  async softDelete(userId: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.softDelete(userId);

    return this.usersRepository.findOne({
      where: { id: userId },
      withDeleted: true,
    });
  }
}
