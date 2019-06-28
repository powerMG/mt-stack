<template>
  <div>
    <el-container>
      <el-header>
        <my-header/>
      </el-header>
      <el-main>
        <nuxt/>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>
<script>
import myHeader from "@/components/public/header/index.vue";
export default {
  components: {
    myHeader
  }
};
</script>
<style>
</style>
