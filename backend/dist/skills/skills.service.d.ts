import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
export declare class SkillsService {
    private skillRepository;
    constructor(skillRepository: Repository<Skill>);
    findAll(): Promise<Skill[]>;
    findOne(id: number): Promise<Skill | null>;
    create(skill: Partial<Skill>): Promise<Skill>;
    update(id: number, skill: Partial<Skill>): Promise<Skill>;
    remove(id: number): Promise<void>;
}
