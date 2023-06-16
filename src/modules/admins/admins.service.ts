import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/common/entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminsRepository: Repository<Admin>,
  ) {}

  async login()

  findOneByEmail(email: string): Promise<Admin> {
    return this.adminsRepository.findOneBy({ email });
  }
}
