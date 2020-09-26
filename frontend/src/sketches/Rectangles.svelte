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
            let rectangleWidth = p5.random(2, 100)
            let rectangleHeight = p5.random(2, 100)
            p5.rect(x-rectangleWidth/2, y-rectangleHeight/2, rectangleWidth, rectangleHeight)
        }
        p5.windowResized = () => {
            p5.resizeCanvas(window.innerWidth, window.innerHeight);
        }
    }
</script>

<P5Canvas id="canvas" sketch={sketch}/>
