<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5"><Emenu /></el-col>
      <el-col :span="19">2</el-col>
    </el-row>
    <el-row :span="24">3</el-row>
  </div>
</template>

<script>
export default {
  components: {
    Emenu: () => import("@/components/index/menu")
  }
};
</script>

<style lang="scss">
@import "@/assets/css/index/index.scss";
</style>
