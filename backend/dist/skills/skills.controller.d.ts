import { SkillsService } from './skills.service';
import { Skill } from './entities/skill.entity';
export declare class SkillsController {
    private readonly skillsService;
    constructor(skillsService: SkillsService);
    findAll(): Promise<Skill[]>;
    create(skill: Partial<Skill>): Promise<Skill>;
    update(id: string, skill: Partial<Skill>): Promise<Skill>;
    remove(id: string): Promise<void>;
}
