import { defineField, defineType } from 'sanity';
export const project = defineType({name:'project',title:'Project',type:'document',fields:[
  defineField({name:'title',title:'Project title',type:'string',validation:r=>r.required()}),
  defineField({name:'slug',title:'URL slug',type:'slug',options:{source:'title'},validation:r=>r.required()}),
  defineField({name:'summary',title:'Short summary',type:'text',rows:3,validation:r=>r.required()}),
  defineField({name:'service',title:'Service category',type:'string',options:{list:['Automation','Web development','E-commerce','Custom software & platforms']},validation:r=>r.required()}),
  defineField({name:'year',title:'Year',type:'string'}),
  defineField({name:'featured',title:'Feature on the work page',type:'boolean',initialValue:false}),
  defineField({name:'client',title:'Client (only if approved to name)',type:'string'}),
  defineField({name:'cover',title:'Cover image',type:'image',options:{hotspot:true},fields:[defineField({name:'alt',title:'Image description',type:'string',validation:r=>r.required()})]}),
  defineField({name:'challenge',title:'The challenge',type:'text',rows:5,validation:r=>r.required()}),
  defineField({name:'approach',title:'Our approach',type:'text',rows:5,validation:r=>r.required()}),
  defineField({name:'outcome',title:'The outcome (verified claims only)',type:'text',rows:5})
],preview:{select:{title:'title',subtitle:'service',media:'cover'}}});
