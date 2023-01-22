import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  // entity hooks
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  // entity hooks
  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  // entity hooks
  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}
