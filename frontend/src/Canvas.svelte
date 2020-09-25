<script>
    export let id
    import p5 from 'p5'
    export let sketch
    import { onMount } from "svelte"
    onMount(() => {
        let p5sketch = new p5(sketch, id)
    });
</script>

<div {id}></div>
