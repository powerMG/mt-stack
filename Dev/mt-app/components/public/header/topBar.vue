<template>
  <el-row class="m-header">
    <el-col :span="5">
      <geo />
    </el-col>
    <el-col :span="5">
      <user />
    </el-col>
    <el-col :span="14">
      <nav-bar />
    </el-col>
  </el-row>
</template>

<script>
export default {
  components: {
    geo: () => import("./geo"),
    user: () => import("./user"),
    navBar: () => import("./nav")
  }
};
</script>

<style lang="scss">
@import "@/assets/css/public/layout.scss";
// @import "@/assets/css/public/header/index.scss";
</style>
