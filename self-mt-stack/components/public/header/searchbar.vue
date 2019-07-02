<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团" />
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input v-model="search" @focus="focus" @blur="blur" placeholder="搜索商家或地点" />
          <button class="el-button el-button--primary">
            <i class="el-icon-search" />
          </button>
          <dl class="hotPlace" v-if="IsHotPlace">
            <dt>热门推荐</dt>
            <dd v-for="(item,idx) in hotPlace" :key="idx">{{item}}</dd>
          </dl>
          <dl class="searchList" v-if="IsSearchList">
            <dd v-for="(item,idx) in searchList" :key="idx">{{item}}</dd>
          </dl>
        </div>
        <p class="suggset">
          <a href="#">故宫博物院</a>
          <a href="#">水立方嬉水乐园</a>
          <a href="#">北京欢乐谷</a>
          <a href="#">欢乐水魔方水上乐园</a>
          <a href="#">蟹岛城市海景水上乐园</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movide">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <i class="refund" />
            <p class="txt">随时退</p>
          </li>
          <li>
            <i class="single" />
            <p class="txt">不满意免单</p>
          </li>
          <li>
            <i class="overdue" />
            <p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFocus: false,
      search: "",
      hotPlace: [
        "水立方嬉水乐园",
        "故宫博物馆",
        "欢乐水魔方水上乐园",
        "北京欢乐谷"
      ],
      searchList: ["火锅", "烧烤", "北京烤鸭"]
    };
  },
  computed: {
    IsHotPlace: function() {
      return this.isFocus && this.search === "";
    },
    IsSearchList: function() {
      return this.isFocus && this.search !== "";
    }
  },
  methods: {
    focus: function() {
      let self = this;
      self.isFocus = true;
    },
    blur: function() {
      let self = this;
      setTimeout(() => {
        self.isFocus = false;
      }, 200);
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/public/layout.scss";
@import "@/assets/css/public/header/index.scss";
</style>
