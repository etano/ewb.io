<script>
    import Canvas from './Canvas.svelte'
    let sketches = [
        (p5) => {
            p5.setup = () => {
                p5.createCanvas(window.innerWidth, window.innerHeight)
            }
            p5.draw = () => {
                p5.circle(p5.mouseX, p5.mouseY, p5.random(10, 80))
                p5.fill(p5.random(255), p5.random(127), p5.random(51), 127)
            }
        }
    ]
    let sketch = sketches[Math.floor(Math.random() * sketches.length)]
</script>

<Canvas id="canvas" sketch={sketch}/>
