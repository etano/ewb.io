<script>
    import P5Canvas from '../P5Canvas.svelte'
    import { colors, randomChoice } from '../utils.js'

    const nDrops = 200

    let drops = []

    class Drop {
        constructor(maxWidth, maxHeight, p5) {
            this.maxWidth = maxWidth
            this.maxHeight = maxHeight
            this.p5 = p5
            this.init()
        }

        init() {
            this.splashZone = 150
            this.centerX = this.p5.mouseX
            this.centerY = this.p5.mouseY
            if (this.centerX === 0 && this.centerY === 0) {
                this.centerX = this.maxWidth / 2
                this.centerY = this.maxHeight - this.splashZone / 2
            }
            this.x = this.p5.random(this.centerX - this.maxWidth/2, this.centerX + this.maxWidth/2)
            this.y = this.p5.random(0, -this.maxHeight)
            this.color = randomChoice(colors)
            this.velocity = this.p5.random(10, 20)
            this.width = 1
            this.length = 25
            this.r = 0
            this.splashRadius = this.p5.random(15, 25)
            this.splashHeight = this.centerY - this.p5.random(-this.splashZone/2, this.splashZone/2)
        }

        draw() {
            this.p5.noStroke()
            this.p5.fill(this.color)
            this.p5.strokeWeight(1)
            this.p5.rect(this.x, this.y, this.width, this.length)
            this.y = this.y + this.velocity
            if (this.y > this.splashHeight - this.length) {
                this.length = this.length - this.velocity
                this.p5.stroke(this.color)
                this.p5.noFill()
                this.p5.ellipse(this.x + this.width / 2, this.splashHeight, this.r * 2, this.r / 2)
                this.r++
                if (this.r > this.splashRadius) {
                    this.init()
                }
            }
            if (this.length < 0) {
                this.length = 0
            }
        }

    }

    let sketch = (p5) => {
        p5.setup = () => {
            p5.createCanvas(window.innerWidth, window.innerHeight)
            for (let i = 0; i < nDrops; i++) {
                drops.push(new Drop(Math.min(window.innerWidth, 360), window.innerHeight, p5))
            }
        }
        p5.draw = () => {
            p5.background('white')
            if (!p5.frameRate()) return
            for (let i = 0; i < drops.length; i++) {
                drops[i].draw()
            }
        }
        p5.windowResized = () => {
            p5.resizeCanvas(window.innerWidth, window.innerHeight)
        }
    }
</script>

<P5Canvas id="canvas" sketch={sketch}/>
