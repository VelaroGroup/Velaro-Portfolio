import { defineField, defineType } from 'sanity';
export const project = defineType({name:'project',title:'Project',type:'document',fields:[
  defineField({name:'title',title:'Project title',type:'string',validation:r=>r.required()}),
  defineField({name:'slug',title:'URL slug',type:'slug',options:{source:'title'},validation:r=>r.required()}),
  defineField({name:'summary',title:'Short summary',type:'text',rows:3,validation:r=>r.required()}),
  defineField({name:'service',title:'Service category',type:'string',options:{list:['Automation','Web development','E-commerce','Custom software & platforms']},validation:r=>r.required()}),
  defineField({name:'kind',title:'Project type',type:'string',description:'Concepts are illustrative. Publish a case study only with approved project information and verified claims.',options:{list:[{title:'Illustrative concept',value:'concept'},{title:'Approved case study',value:'case-study'}],layout:'radio'},initialValue:'concept',validation:r=>r.required()}),
  defineField({name:'visual',title:'Interface preview',type:'string',description:'Used when no cover image is provided. Previews contain illustrative sample information.',options:{list:[{title:'Messaging inbox',value:'inbox'},{title:'Connected workflow',value:'workflow'},{title:'Custom platform',value:'platform'},{title:'Website',value:'website'},{title:'Online store',value:'commerce'},{title:'White-label client portal',value:'white-label'},{title:'Field-service dispatch',value:'dispatch'},{title:'Appointment booking',value:'booking'},{title:'Supplier documents',value:'documents'},{title:'B2B ordering',value:'wholesale'},{title:'Hospitality website',value:'hospitality'}]}}),
  defineField({name:'workflowSteps',title:'Example workflow',type:'array',description:'Optional ordered steps shown on this project’s detail page.',validation:r=>r.min(2).max(6),of:[{type:'object',name:'workflowStep',fields:[defineField({name:'title',title:'Step title',type:'string',validation:r=>r.required()}),defineField({name:'description',title:'Description',type:'text',rows:2,validation:r=>r.required()})]}]}),
  defineField({name:'year',title:'Year',type:'string'}),
  defineField({name:'featured',title:'Feature on the work page',type:'boolean',initialValue:false}),
  defineField({name:'client',title:'Client (only if approved to name)',type:'string'}),
  defineField({name:'cover',title:'Cover image',type:'image',options:{hotspot:true},fields:[defineField({name:'alt',title:'Image description',type:'string',validation:r=>r.required()})]}),
  defineField({name:'challenge',title:'The challenge',type:'text',rows:5,validation:r=>r.required()}),
  defineField({name:'approach',title:'Our approach',type:'text',rows:5,validation:r=>r.required()}),
  defineField({name:'outcome',title:'The outcome (verified claims only)',type:'text',rows:5})
],preview:{select:{title:'title',subtitle:'service',media:'cover'}}});
