<script>
    import { onMount } from "svelte"

    export let id
    export let sketch

    onMount(async () => {
        const module = await import('p5')
        let p5 = module.default
        let p5sketch = new p5(sketch, id)
    });
</script>

<div {id}></div>
