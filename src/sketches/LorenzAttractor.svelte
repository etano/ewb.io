<script>
    import P5Canvas from '../P5Canvas.svelte'
    import { colors, randomChoice } from '../utils.js'

    const SIGMA = 10
    const RHO = 28
    const BETA = 8/3
    const DT = 1/60
    const MAX_LEN = 1337

    let p
    let path = []

    let sketch = (p5) => {
        p5.setup = () => {
            p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL)
            p = p5.createVector(1, 1, 1)
        }
        p5.draw = () => {
            p5.background('white')
            if (!p5.frameRate()) return

            //p5.rotateY(p5.frameCount * 0.01)
            p5.translate(0, 0, -250)
            p5.scale(p5.width/80)

            let delta = p5.createVector(
                SIGMA * (p.y - p.x),
                p.x * (RHO - p.z) - p.y,
                p.x * p.y - BETA * p.z
            )
            delta.mult(DT)

            p.add(delta)
            path.push(p.copy())
            if (path.length > MAX_LEN) {
              path.splice(0, 1)
            }

            p5.stroke('white')
            p5.noFill()
            let prev = path[0]
            for (let i = 1; i < path.length; ++i) {
                let next = path[i]
                if (i < path.length / 6) {
                    p5.strokeWeight(1)
                    p5.stroke(colors[0])
                }
                else if (i < 2 * path.length / 6) {
                    p5.strokeWeight(1)
                    p5.stroke(colors[1])
                }
                else if (i < 3 * path.length / 6) {
                    p5.strokeWeight(1)
                    p5.stroke(colors[2])
                }
                else if (i < 4 * path.length / 6) {
                    p5.strokeWeight(2)
                    p5.stroke(colors[3])
                }
                else if (i < 5 * path.length / 6) {
                    p5.strokeWeight(2)
                    p5.stroke(colors[4])
                }
                else {
                    p5.strokeWeight(2)
                    p5.stroke(colors[5])
                }
                p5.line(prev.x, prev.y, prev.z, next.x, next.y, next.z)
                prev = next
            }
        }
        p5.windowResized = () => {
            p5.resizeCanvas(window.innerWidth, window.innerHeight)
        }
    }
</script>

<P5Canvas id="canvas" sketch={sketch}/>
