<script>
    import P5Canvas from '../P5Canvas.svelte'
    import { colors, randomChoice } from '../utils.js'

    let sketch = (p5) => {
        p5.setup = () => {
            p5.createCanvas(window.innerWidth, window.innerHeight)
        }
        p5.draw = () => {
            let x = p5.mouseX
            let y = p5.mouseY
            if (x === 0 && y === 0 ) {
                y = -3000
            }
            p5.noStroke()
            p5.fill(randomChoice(colors))
            p5.circle(x, y, p5.random(5, 75))
        }
        p5.windowResized = () => {
            p5.resizeCanvas(window.innerWidth, window.innerHeight);
        }
    }
</script>

<P5Canvas id="canvas" sketch={sketch}/>
