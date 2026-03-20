export declare enum SkillType {
    LANGUAGE = "language",
    FRAMEWORK = "framework",
    OTHER = "other"
}
export declare class Skill {
    id: number;
    name: string;
    type: SkillType;
    icon: string;
    level: number;
}
