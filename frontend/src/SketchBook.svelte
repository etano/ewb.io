<script>
import Canvas from './Canvas.svelte'
    let randomChoice = (arr) => {
        return arr[Math.floor(Math.random() * arr.length)]
    }

    let sketches = [
        (p5) => {
            //let colors = ['#7180AC', '#2B4570', '#A8D0DB', '#E49273', '#A37A74']
            //let colors = ['#EE7674', '#F9B5AC', '#D0D6B5', '#75B9BE', '#987284']
            //let colors = ['#EE7674', '#CD688B', '#9E6394', '#6C5E8D', '#445576', '#2F4858']
            //let colors = ['#FD9465', '#E3715B', '#F97471', '#E35B97', '#FD65F4']
            //let colors = ['#FD9465', '#E77782', '#B86A94', '#7E6392', '#4B587B', '#2F4858']
            let colors = ['#F97471', '#D6668C', '#A46298', '#6E5F91', '#435679', '#2F4858']
            p5.setup = () => {
                p5.createCanvas(window.innerWidth, window.innerHeight)
            }
            p5.draw = () => {
                p5.noStroke()
                p5.fill(randomChoice(colors))
                p5.circle(p5.mouseX, p5.mouseY, p5.random(5, 75))
            }
        },
    ]
    let sketch = randomChoice(sketches)
</script>

<Canvas id="canvas" sketch={sketch}/>
