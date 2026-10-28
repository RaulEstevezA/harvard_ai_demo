import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root=resolve(import.meta.dirname,'..');
const source=resolve(root,'local-data/harvard_ai/4-learning/shopping/shopping.csv');
const destination=resolve(root,'demos/shopping/shopping-data.js');
const months={Jan:0,Feb:1,Mar:2,Apr:3,May:4,June:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
const sampleSize=2400;

function randomFactory(seed){let state=seed>>>0;return()=>{state=(1664525*state+1013904223)>>>0;return state/2**32;};}
function shuffle(items,random){const copy=[...items];for(let index=copy.length-1;index>0;index--){const next=Math.floor(random()*(index+1));[copy[index],copy[next]]=[copy[next],copy[index]];}return copy;}
function convert(row){return [Number(row[0]),Number(row[1]),Number(row[2]),Number(row[3]),Number(row[4]),Number(row[5]),Number(row[6]),Number(row[7]),Number(row[8]),Number(row[9]),months[row[10]],Number(row[11]),Number(row[12]),Number(row[13]),Number(row[14]),row[15]==='Returning_Visitor'?1:0,row[16]==='TRUE'?1:0,row[17]==='TRUE'?1:0];}

const lines=(await readFile(source,'utf8')).trim().split(/\r?\n/);
const rows=lines.slice(1).map(line=>convert(line.split(',')));
const positives=rows.filter(row=>row[17]===1),negatives=rows.filter(row=>row[17]===0),random=randomFactory(50_2024);
const positiveCount=Math.round(sampleSize*positives.length/rows.length);
const selectedPositive=shuffle(positives,random).slice(0,positiveCount),selectedNegative=shuffle(negatives,random).slice(0,sampleSize-positiveCount);
const positiveCut=Math.round(selectedPositive.length*.6),negativeCut=Math.round(selectedNegative.length*.6);
const train=shuffle([...selectedPositive.slice(0,positiveCut),...selectedNegative.slice(0,negativeCut)],random);
const test=shuffle([...selectedPositive.slice(positiveCut),...selectedNegative.slice(negativeCut)],random);

const positiveTests=test.filter(row=>row[17]===1),negativeTests=test.filter(row=>row[17]===0);
const presets=[
  [...positiveTests].sort((a,b)=>b[8]-a[8])[0],
  [...positiveTests].sort((a,b)=>Math.abs(a[8]-20)-Math.abs(b[8]-20))[0],
  [...negativeTests].sort((a,b)=>b[6]-a[6])[0],
  [...negativeTests].sort((a,b)=>b[4]-a[4])[0]
].map(row=>row.slice(0,17));

const payload={train,test,presets,meta:{sourceRows:rows.length,sampleRows:sampleSize,trainRows:train.length,testRows:test.length,positiveRate:Number((positiveCount/sampleSize).toFixed(4)),seed:502024}};
await writeFile(destination,`window.SHOPPING_DATA=${JSON.stringify(payload)};\n`);
console.log(`Selected ${sampleSize} of ${rows.length} sessions (${positiveCount} purchases).`);
console.log(`Train: ${train.length}; test: ${test.length}; output: ${destination}`);
