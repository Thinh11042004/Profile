import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
    ) { }

    findAll(): Promise<Project[]> {
        return this.projectRepository.find();
    }

    findOne(id: number): Promise<Project | null> {
        return this.projectRepository.findOneBy({ id });
    }

    async create(project: Partial<Project>): Promise<Project> {
        const newProject = this.projectRepository.create(project);
        return this.projectRepository.save(newProject);
    }

    async update(id: number, project: Partial<Project>): Promise<Project> {
        await this.projectRepository.update(id, project);
        const updatedProject = await this.findOne(id);
        if (!updatedProject) throw new NotFoundException('Project not found');
        return updatedProject;
    }

    async remove(id: number): Promise<void> {
        await this.projectRepository.delete(id);
    }
}
