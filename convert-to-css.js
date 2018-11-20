var fs = require('fs');

var contents = fs.readFileSync('sicp_log.log', 'utf8');
// console.log(contents);

const lines = contents.split('\n')
const onlyvals = lines.map(line => line.split(':')[2])
const cleaned = onlyvals.filter(val => val)
const asPoints = cleaned.map(vals => vals.split(', '))
// onlyvals.forEach(val => val ? 1==1 : console.log(val))


const videoLengthSeconds = 17.02;
// console.log(asPoints.filter)

console.log('@keyframes animation {')

const posToLine = (point, index, allPoints) => {
    const percent = index/allPoints.length*100
    const left = point[0]*100
    const top = point[1]*100
    const lastFive = allPoints.slice(Math.max(0, index-2), index+1)
    const leftAvg = lastFive.map(point => point[0]).reduce((acc, val) => (+acc)+(+val), 0) / 3 * 100;
    const topAvg = lastFive.map(point => point[1]).reduce((acc, val) => (+acc)+(+val), 0) / 3 * 100;
    // console.error(lastFive.map(point => point[0]).reduce((acc, val) => (+acc)+(+val), 0))
    // console.log(`    ${percent}%     {left: ${left}%; top: ${top}%;}`)   
    console.log(`[${percent/100},${leftAvg},${topAvg}],`)   
    
}

asPoints.forEach(posToLine)

console.log('}')
