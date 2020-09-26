export function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

export var colors = ['#F97471', '#D6668C', '#A46298', '#6E5F91', '#435679', '#2F4858']

export function hexToRgb(hex) {
    var bigint = parseInt(hex, 16)
    var r = (bigint >> 16) & 255
    var g = (bigint >> 8) & 255
    var b = bigint & 255
    return [r, g, b]
}
