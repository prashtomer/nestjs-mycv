import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Report } from '../reports/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  admin: boolean;

  // will not make any change in the users table
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

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
