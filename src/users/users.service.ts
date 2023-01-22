import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    // If instead of user we try to save plain object containing email and password property it will also work but entity hooks will not get triggered since we have not created an entity and same will be applicable to other repo methods like insert, update and delete
    this.repo.save(user);
  }
}
