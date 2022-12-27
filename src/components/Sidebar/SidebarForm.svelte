<script lang="ts">
  import type { City } from "../../types";

  export let query: string;
  export let isVisible: boolean;
  export let cities: City[];
  export let isGettingCurrentLocation: boolean;
  export let onSelectCity: (city: City) => void;
  export let onCurrentLocationClick: () => void;
</script>

<form class="sidebar__form form" on:submit|preventDefault>
  <div>
    <input
      type="search"
      name="query"
      class="form__input"
      placeholder="Search your city..."
      disabled={isGettingCurrentLocation}
      bind:value={query}
    />
  </div>

  <div>
    <button
      type="button"
      class="form__button"
      disabled={isGettingCurrentLocation}
      on:click={onCurrentLocationClick}
      >{isGettingCurrentLocation ? "Loading..." : "Current Location"}</button
    >
  </div>

  {#if isVisible}
    <div class="cities">
      {#each cities as city}
        <button
          class="cities__option"
          type="button"
          on:click={() => onSelectCity(city)}
        >
          {[city.name, city.admin1, city.country].filter(Boolean).join(", ")}
        </button>
      {/each}
    </div>
  {/if}
</form>

<style>
  .form {
    position: relative;

    display: grid;
    grid-template-columns: 1fr auto;
    column-gap: 22px;
  }

  .form__button {
    display: block;
    padding: 14px 12px;

    text-align: left;
    color: rgba(0, 0, 0, 0.8);
    font-size: 12px;

    cursor: pointer;
    border: 0;
    background: var(--light);
    border-radius: 4px;
    transition: background 0.2s;
  }

  .form__button:hover {
    background: var(--soft-light);
  }

  .form__button:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  .form__input {
    width: 100%;
    padding: 10px 0;

    font-size: 18px;

    background: none;
    border: 0;
    border-bottom: 3px solid var(--light);
    outline: 0;
  }

  .form__input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .form__input:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }

  .cities {
    position: absolute;
    top: 48px;
    left: 0;
    right: 0;
    max-height: 300px;
    overflow: overlay;
  }

  .cities__option {
    display: block;
    width: 100%;
    padding: 14px 12px;

    text-align: left;
    color: rgba(0, 0, 0, 0.8);
    font-size: 16px;

    cursor: pointer;
    border: 0;
    background: var(--light);
  }

  .cities__option:hover {
    background: #efefef;
  }

  @media screen and (max-width: 1024px) {
    .cities {
      max-height: 200px;
    }
  }
</style>
