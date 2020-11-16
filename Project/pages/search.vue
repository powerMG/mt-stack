<template>
  <div>
    {{ list }}
    {{ $store.state.city.list }}
  </div>
</template>

<script>
import axios from 'axios';
export default {
  layout: 'search',
  data() {
    return {
      list: []
    };
  },
  async asyncData() {
    let {
      status,
      data: { code, message, list }
    } = await axios.get('http://localhost:3000/city/list');
    console.log('msg============', message);
    console.log('code============', code);
    console.log('data============', list);
    if (status === 200) {
      return {
        list
      };
    }
  }
};
</script>

<style></style>
