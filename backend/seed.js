const axios = require('axios');

const API_BASE = 'http://localhost:3000';

const seedData = async () => {
    const skills = [
        { name: 'ReactJS', type: 'framework', level: 90 },
        { name: 'NestJS', type: 'framework', level: 85 },
        { name: 'TypeScript', type: 'language', level: 95 },
        { name: 'MySQL', type: 'language', level: 80 },
        { name: 'JavaScript', type: 'language', level: 90 },
    ];

    const projects = [
        {
            title: 'E-Commerce Platform',
            description: 'A full-stack e-commerce solution with real-time updates and secure payment integration.',
            tags: ['React', 'NestJS', 'MySQL'],
            repoUrl: 'https://github.com/user/ecommerce',
        },
        {
            title: 'AI Chat Bot',
            description: 'Intelligent personal assistant powered by advanced language models for seamless interaction.',
            tags: ['OpenAI', 'NodeJS', 'TypeScript'],
            repoUrl: 'https://github.com/user/ai-bot',
        }
    ];

    try {
        for (const skill of skills) {
            await axios.post(`${API_BASE}/skills`, skill);
            console.log(`Seeded skill: ${skill.name}`);
        }
        for (const project of projects) {
            await axios.post(`${API_BASE}/projects`, project);
            console.log(`Seeded project: ${project.title}`);
        }
        console.log('Seeding completed successfully!');
    } catch (err) {
        console.error('Seeding failed:', err.message);
    }
};

seedData();
