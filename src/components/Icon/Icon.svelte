<script lang="ts">
  export let color: string = "#fff";
  export let name: string;
  export let size: number = 60;

  let Icon;

  $: if (name) {
    import(`../../assets/icons/${name}.svg`).then((component) => {
      Icon = component.default;
    });
  }
</script>

<span class="icon" style={`fill: ${color}`}>
  <svelte:component this={Icon} width={size} height={size} />
</span>
