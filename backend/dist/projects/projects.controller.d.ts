import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(): Promise<Project[]>;
    create(project: Partial<Project>): Promise<Project>;
    update(id: string, project: Partial<Project>): Promise<Project>;
    remove(id: string): Promise<void>;
}
