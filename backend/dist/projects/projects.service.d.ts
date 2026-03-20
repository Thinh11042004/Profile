import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
export declare class ProjectsService {
    private projectRepository;
    constructor(projectRepository: Repository<Project>);
    findAll(): Promise<Project[]>;
    findOne(id: number): Promise<Project | null>;
    create(project: Partial<Project>): Promise<Project>;
    update(id: number, project: Partial<Project>): Promise<Project>;
    remove(id: number): Promise<void>;
}
