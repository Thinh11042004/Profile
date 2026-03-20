import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillsService {
    constructor(
        @InjectRepository(Skill)
        private skillRepository: Repository<Skill>,
    ) { }

    findAll(): Promise<Skill[]> {
        return this.skillRepository.find();
    }

    findOne(id: number): Promise<Skill | null> {
        return this.skillRepository.findOneBy({ id });
    }

    async create(skill: Partial<Skill>): Promise<Skill> {
        const newSkill = this.skillRepository.create(skill);
        return this.skillRepository.save(newSkill);
    }

    async update(id: number, skill: Partial<Skill>): Promise<Skill> {
        await this.skillRepository.update(id, skill);
        const updatedSkill = await this.findOne(id);
        if (!updatedSkill) throw new NotFoundException('Skill not found');
        return updatedSkill;
    }

    async remove(id: number): Promise<void> {
        await this.skillRepository.delete(id);
    }
}
