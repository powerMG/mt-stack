<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5"><Emenu /></el-col>
      <el-col :span="19">
        <life />
      </el-col>
    </el-row>
    <el-row :span="24">
      <artistic />
    </el-row>
  </div>
</template>

<script>
export default {
  components: {
    Emenu: () => import("@/components/index/menu"),
    Life: () => import("@/components/index/life"),
    Artistic: () => import("@/components/index/artistic")
  }
};
</script>

<style lang="scss">
@import "@/assets/css/index/index.scss";
</style>
