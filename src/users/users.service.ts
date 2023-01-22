import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    // If instead of user we try to save plain object containing email and password property it will also work but entity hooks will not get triggered since we have not created an entity.
    // insert, update and delete methods of repo work with plain javascript objects and hence won't trigger entity hooks
    // Use save (instead of insert/update) or remove (instead of delete) method if you want to trigger entity hooks
    this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  // could have used update method instead of save to save one trip to the database to find the user. Did this way to trigger the user entity hooks
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('user not found');
    }

    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  // could have used delete method instead of remove to save one trip to the database to find the user. Did this way to trigger the user entity remove hooks
  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('user not found');
    }

    return this.repo.remove(user);
  }
}
