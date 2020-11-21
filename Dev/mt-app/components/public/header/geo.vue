<template>
  <div class="m-geo">
    <i class="el-icon-location">{{ $store.state.geo.position.cname }}</i>
    <nuxt-link class="changeCity" to="/changeCity">切换城市</nuxt-link>
    [廊坊 香河 天津]
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style></style>
