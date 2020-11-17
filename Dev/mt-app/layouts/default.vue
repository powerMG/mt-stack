<template>
  <el-container class="layout-default">
    <el-header height="197px">
      <my-header />
    </el-header>
    <el-main>
      <Nuxt />
    </el-main>
    <el-footer height="100%">Footer</el-footer>
  </el-container>
</template>
<script>
export default {
  components: {
    myHeader: () => import("@/components/public/header/index.vue")
  }
};
</script>
<style></style>
