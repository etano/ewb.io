<script>
    import { onMount } from "svelte"
    import p5 from 'p5'

    export let id
    export let sketch

    onMount(() => {
        let p5sketch = new p5(sketch, id)
    });
</script>

<div {id}></div>
