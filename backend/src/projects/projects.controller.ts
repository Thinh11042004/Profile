import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Get()
    findAll(): Promise<Project[]> {
        return this.projectsService.findAll();
    }

    @Post()
    create(@Body() project: Partial<Project>): Promise<Project> {
        return this.projectsService.create(project);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() project: Partial<Project>): Promise<Project> {
        return this.projectsService.update(+id, project);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.projectsService.remove(+id);
    }
}
