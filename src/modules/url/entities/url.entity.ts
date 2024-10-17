import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  longUrl: string;

  @Column()
  shortUrl: string;

  @Column()
  urlCode: string;

  @Column({ default: 0 })
  visits: number;
}
