import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { Skill } from './entities/skill.entity';

@Controller('skills')
export class SkillsController {
    constructor(private readonly skillsService: SkillsService) { }

    @Get()
    findAll(): Promise<Skill[]> {
        return this.skillsService.findAll();
    }

    @Post()
    create(@Body() skill: Partial<Skill>): Promise<Skill> {
        return this.skillsService.create(skill);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() skill: Partial<Skill>): Promise<Skill> {
        return this.skillsService.update(+id, skill);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.skillsService.remove(+id);
    }
}
