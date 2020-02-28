<template>
  <div>
    <div v-for="item in items">
      <nuxt-link :to="'daily/' + item.id">
        <h2>
          {{ item.title }}
        </h2>
      </nuxt-link>
    </div>
    <h2>
      {{ items2.name }}
    </h2>
  </div>
</template>

<script>
import axios from "axios";

export default {
  async asyncData() {
    const { data: obj1 } = await axios.get(
      process.env.BASE_URL + '/daily',
      {
        headers: { "X-API-KEY": process.env.API_KEY }
      }
    )
    const { data:obj2 } = await axios.get(
      process.env.BASE_URL + '/profile',
      {
        headers: { "X-API-KEY": process.env.API_KEY }
      }
    )
    return {
      items: obj1.contents,
      items2: obj2
    };
  }
};
</script>
