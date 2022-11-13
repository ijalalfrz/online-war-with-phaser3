
export default function getDistance(x1,y1,x2,y2) {
    let a = x1-x2
    let b = y1-y2 
    let c = Math.hypot(a,b)
    return c
}