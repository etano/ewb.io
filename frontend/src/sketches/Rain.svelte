<script>
    import P5Canvas from '../P5Canvas.svelte'
    import { colors, randomChoice } from '../utils.js'

    const dropDensity = 1

    let drops = []

    class Drop {
        constructor(id, maxWidth, maxHeight, p5) {
            this.id = id
            this.maxWidth = maxWidth
            this.maxHeight = maxHeight
            this.p5 = p5
            this.init()
        }

        init() {
            this.p5.rectMode(this.p5.CENTER)
            this.splashZone = 150
            this.centerX = this.maxWidth / 2
            this.centerY = this.maxHeight - this.splashZone / 2
            this.x = this.p5.random(this.centerX - this.maxWidth/2, this.centerX + this.maxWidth/2)
            this.y = this.p5.random(0, -this.maxHeight)
            this.color = randomChoice(colors)
            this.velocity = this.p5.random(10, 20)
            this.width = 2
            this.length = 25
            this.umbrellaRadius = 100
            this.umbrellaUnitVelocity = 0.05
            this.splashRadius = 0
            this.maxSplashRadius = this.p5.random(15, 25)
            this.maxSplashHeight = this.centerY - this.p5.random(-this.splashZone/2, this.splashZone/2)
            this.splashHeight = 0
            this.isSplashing = false
        }

        draw() {
            if (this.isSplashing) {
                this.splash()
            }
            else if (this.y > this.maxSplashHeight - this.length) {
                this.splashHeight = this.maxSplashHeight + this.length
                this.splash()
            }
            else if (!(this.p5.mouseX === 0 && this.p5.mouseY === 0)) {
                let xDiff = this.x - this.p5.mouseX
                let yDiff = (this.y + this.length / 2) - this.p5.mouseY
                if (
                    (Math.abs(xDiff) <= this.umbrellaRadius) &&
                    (Math.abs(yDiff) <= Math.sqrt(this.umbrellaRadius**2 - xDiff**2)) &&
                    (yDiff < 0)
                ) {
                    this.slideDownUmbrella(xDiff, yDiff)
                } else {
                    this.fall()
                }
            }
            else {
                this.fall()
            }

            if (this.length < 0) {
                this.length = 0
            }

            if (this.y > this.maxSplashHeight) {
                this.init()
            }
        }

        fall() {
            this.p5.push()
            this.p5.noStroke()
            this.p5.fill(this.color)
            this.p5.rect(this.x, this.y, this.width, this.length)
            this.p5.pop()
            this.y = this.y + this.velocity
        }

        splash() {
            this.isSplashing = true
            this.length = this.length - this.velocity
            this.p5.push()
            this.p5.stroke(this.color)
            this.p5.noFill()
            this.p5.ellipse(this.x + this.width / 2, this.splashHeight, this.splashRadius * 2, this.splashRadius / 2)
            this.p5.pop()
            this.splashRadius++
            if (this.splashRadius > this.maxSplashRadius) {
                this.init()
            }
        }

        slideDownUmbrella(xDiff, yDiff) {
            let sign = Math.sign(xDiff)
            let oldUnitX = Math.abs(xDiff) / this.umbrellaRadius
            let newUnitX = Math.min(oldUnitX + this.umbrellaUnitVelocity, 1)
            let oldUnitY = Math.sqrt(1 - oldUnitX**2)
            if (isNaN(oldUnitY)) { oldUnitY = 0 }
            let newUnitY = Math.sqrt(1 - newUnitX**2)
            if (isNaN(newUnitY)) { newUnitY = 0 }
            this.x = this.p5.mouseX + sign * newUnitX * this.umbrellaRadius
            this.y = this.p5.mouseY - newUnitY * this.umbrellaRadius
            let thetaDelta = Math.asin(-sign * newUnitY)
            this.p5.push()
            this.p5.noStroke()
            this.p5.fill(this.color)
            this.p5.translate(this.x, this.y)
            this.p5.rotate(thetaDelta)
            this.p5.translate(-this.x, -this.y)
            this.p5.rect(this.x, this.y, this.width, this.length)
            this.p5.pop()
        }

    }

    let sketch = (p5) => {
        p5.setup = () => {
            p5.createCanvas(window.innerWidth, window.innerHeight)
            for (let i = 0; i < dropDensity*window.innerWidth; i++) {
                drops.push(new Drop(i, window.innerWidth, window.innerHeight, p5))
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
