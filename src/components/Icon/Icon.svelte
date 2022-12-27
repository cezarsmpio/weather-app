<script lang="ts">
  export let color: string = "#fff";
  export let name: string;
  export let size: number = 60;
</script>

<span
  class="icon"
  style={`fill: ${color}`}
  data-testid={`icon-${name}-${size}`}
>
  {#await import(`../../assets/icons/${name}.svg`) then component}
    <svelte:component this={component.default} width={size} height={size} />
  {/await}
</span>
