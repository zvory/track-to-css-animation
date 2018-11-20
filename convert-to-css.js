var fs = require('fs');
 
var contents = fs.readFileSync('output.log', 'utf8');
// console.log(contents);

const lines = contents.split('\n')
const onlyvals = lines.map(line => line.split(':')[2])
const cleaned = onlyvals.filter(val => val)
const asPoints = cleaned.map(vals => vals.split(', '))
// onlyvals.forEach(val => val ? 1==1 : console.log(val))


const videoLengthSeconds = 17.02;
console.log(asPoints.filter)

console.log('@keyframes animation {')

const posToLine = (point, index, allPoints) => console.log(`    ${index/allPoints.length*100}%     {left: ${point[0]*100}%, top: ${point[1]*100}%}`)

asPoints.forEach(posToLine)

console.log('}')