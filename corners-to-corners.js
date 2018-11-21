var fs = require('fs');

const topleft = fs.readFileSync('stabletl.log', 'utf8');
const topright = fs.readFileSync('stabletr.log', 'utf8');
const bottomleft = fs.readFileSync('stablebl.log', 'utf8');
const bottomright = fs.readFileSync('stablebr.log', 'utf8');

// const videoLengthSeconds = 8.02;

const fileToPoints = (file) => {
    const lines = file.split('\n')
    const onlyvals = lines.map(line => line.split(':')[2])
    const cleaned = onlyvals.filter(val => val)
    const asPoints = cleaned.map(vals => vals.split(', '))    
    return asPoints;
}

const tlPoints = fileToPoints(topleft)
const trPoints = fileToPoints(topright)
const blPoints = fileToPoints(bottomleft)
const brPoints = fileToPoints(bottomright)

console.log('const trackArr = [')

for (let i = 0; i < tlPoints.length; i++) {
    const tl = tlPoints[i]
    const tr = trPoints[i]
    const bl = blPoints[i]
    const br = brPoints[i]

    const range = 5
    const tlSlice = tlPoints.slice(Math.max(0, i-range), Math.min(i+range + 1, tlPoints.length+1))
    const trSlice = trPoints.slice(Math.max(0, i-range), Math.min(i+range+1, trPoints.length+1))
    const blSlice = blPoints.slice(Math.max(0, i-range), Math.min(i+range+1, blPoints.length+1))
    const brSlice = brPoints.slice(Math.max(0, i-range), Math.min(i+range+1, brPoints.length+1))

    const getIndex = index => (tuple => tuple[index])
    const sum = (acc, val) => (+acc)+(+val)

    const tl0 = tlSlice.map(getIndex(0)).reduce(sum, 0) / tlSlice.length;
    const tl1 = tlSlice.map(getIndex(1)).reduce(sum, 0) / tlSlice.length;
    const tr0 = trSlice.map(getIndex(0)).reduce(sum, 0) / trSlice.length;
    const tr1 = trSlice.map(getIndex(1)).reduce(sum, 0) / trSlice.length;
    const bl0 = blSlice.map(getIndex(0)).reduce(sum, 0) / blSlice.length;
    const bl1 = blSlice.map(getIndex(1)).reduce(sum, 0) / blSlice.length;
    const br0 = brSlice.map(getIndex(0)).reduce(sum, 0) / brSlice.length;
    const br1 = brSlice.map(getIndex(1)).reduce(sum, 0) / brSlice.length;

    console.log(`[${i/tlPoints.length}, ${tl0}, ${tl1}, ${tr0}, ${tr1}, ${bl0}, ${bl1}, ${br0}, ${br1}]${i< tlPoints.length-1 ? ',' : ''}`)

    // console.log(`[${i/tlPoints.length}, ${tl[0]}, ${tl[1]}, ${tr[0]}, ${tr[1]}, ${bl[0]}, ${bl[1]}, ${br[0]}, ${br[1]}],`)
}
console.log(']')


const posToLine = (point, index, allPoints) => {
    const percent = index/allPoints.length*100
    const left = point[0]*100
    const top = point[1]*100
    const lastFive = allPoints.slice(Math.max(0, index-5), Math.min(index+6, allPoints.length+1))
    const leftAvg = lastFive.map(point => point[0]).reduce((acc, val) => (+acc)+(+val), 0) / 11 * 100;
    const topAvg = lastFive.map(point => point[1]).reduce((acc, val) => (+acc)+(+val), 0) / 11 * 100;
    // console.error(lastFive.map(point => point[0]).reduce((acc, val) => (+acc)+(+val), 0))
    // console.log(`    ${percent}%     {left: ${left}%; top: ${top}%;}`)   
    console.log(`[${percent/100},${leftAvg},${topAvg}],`)   
    
}


// asPoints.forEach(posToLine)

