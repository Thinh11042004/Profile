import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum SkillType {
    LANGUAGE = 'language',
    FRAMEWORK = 'framework',
    OTHER = 'other',
}

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: SkillType,
        default: SkillType.LANGUAGE,
    })
    type: SkillType;

    @Column({ nullable: true })
    icon: string;

    @Column({ default: 0 })
    level: number;
}
