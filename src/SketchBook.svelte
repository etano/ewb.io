<script>
    import Circles from './sketches/Circles.svelte'
    import Rectangles from './sketches/Rectangles.svelte'
    //import LorenzAttractor from './sketches/LorenzAttractor.svelte'
    import Rain from './sketches/Rain.svelte'
    import { randomChoice } from './utils.js'

    let sketches = {
        'circles': Circles,
        'rectangles': Rectangles,
        //'lorenz_attractor': LorenzAttractor,
        'rain': Rain
    }

    let params = (new URL(document.location)).searchParams
    let sketchName = params.get('sketch')
    if ((sketchName === null) || !(sketchName in sketches)) {
        sketchName = randomChoice(Object.keys(sketches))
    }
    console.log('running %s...', sketchName)
    let sketch = sketches[sketchName]
</script>

<svelte:component this={sketch}/>
