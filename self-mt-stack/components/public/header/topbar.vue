<template>
  <div class="m-header">
    <el-row>
      <el-col :span="5">
        <geo/>
      </el-col>
      <el-col :span="6">
        <user/>
      </el-col>
      <el-col :span="13">
        <nav-bar/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Geo from "./geo";
import User from "./user";
import NavBar from "./nav"
export default {
  components: {
    Geo,
    User,
    NavBar
  }
};
</script>

<style lang="scss">
</style>
