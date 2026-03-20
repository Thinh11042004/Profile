import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    description: string;

    @Column({ nullable: true })
    imageUrl: string;

    @Column({ nullable: true })
    repoUrl: string;

    @Column({ nullable: true })
    liveUrl: string;

    @Column('simple-array', { nullable: true })
    tags: string[];
}
