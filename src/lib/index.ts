export function wait (ms: number) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true)
        }, ms)
    })
}

export function getCenter (width: number, containerWidth: number) {
    return containerWidth/2 - width/2
}