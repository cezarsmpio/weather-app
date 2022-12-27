<script lang="ts">
  import Icon from "../Icon/Icon.svelte";

  export let temperature: number;
  export let name: string;
  export let time: Date;
  export let icon: string;
  export let description: string;

  const formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "long",
    timeStyle: "short",
  });

  $: date = formatter.format(time);
</script>

<section class="details">
  <div>
    <h3 class="details__title">
      {Math.floor(temperature)}<span>ºC</span>
    </h3>
  </div>

  <div>
    <h2 class="details__city">{name}</h2>
    <p class="details__date">
      <strong>{date}</strong>
    </p>
  </div>

  <div>
    <div class="details__weather">
      <Icon name={icon} size={100} />
      <p class="details__description">
        <strong>{description}</strong>
      </p>
    </div>
  </div>
</section>

<style>
  .details {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-end;
    align-items: center;
    column-gap: 44px;
    padding: 60px;
    height: 100vh;
  }

  .details__title {
    font-size: 160px;
  }

  .details__title > span {
    font-size: 60px;
  }

  .details__city {
    font-size: 80px;
  }

  .details__date {
    font-size: 22px;
  }

  .details__weather {
    text-align: center;
  }

  @media screen and (max-width: 1024px) {
    .details {
      padding: 40px;
      height: auto;
      min-height: 70vh;
      align-content: center;
      justify-content: center;
    }

    .details__title {
      font-size: 120px;
    }

    .details__city,
    .details__date {
      text-align: center;
    }
  }
</style>
