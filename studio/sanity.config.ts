import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { project } from './schemas/project';
export default defineConfig({name:'default',title:'Velaro Content',projectId:process.env.SANITY_STUDIO_PROJECT_ID || 'REPLACE_ME',dataset:process.env.SANITY_STUDIO_DATASET || 'production',plugins:[structureTool(),visionTool()],schema:{types:[project]}});
