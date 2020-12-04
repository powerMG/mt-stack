<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png"
          alt="美团"
        />
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input
            placeholder="搜索商家或地点"
            v-model="search"
            @focus="focus"
            @blur="blur"
            @input="input"
          ></el-input>
          <button class="el-button el-button--primary">
            <i class="el-icon-search" />
          </button>
          <dl class="hotPlace" v-if="isHotplace">
            <dt>热门搜索</dt>
            <dd v-for="item in $store.state.home.hotPlace" :key="item">
              {{ item }}
            </dd>
            <!-- <dd>KTV</dd>
            <dd>日料</dd>
            <dd>烧烤</dd> -->
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd v-for="item in searchList" :key="item.name">{{ item.name }}</dd>
          </dl>
        </div>
        <p class="suggset">
          <a href="#">故宫博物院</a>
          <a href="#">天安门</a>
          <a href="#">欢乐水魔方</a>
          <a href="#">鸟巢</a>
          <a href="#">水立方</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
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
import axios from "axios";
import _ from "lodash";
export default {
  data() {
    return {
      search: "",
      isFocus: false,
      searchList: []
    };
  },
  computed: {
    isHotplace() {
      return this.isFocus && !this.search;
    },
    isSearchList() {
      return this.isFocus && this.search;
    }
  },
  methods: {
    focus() {
      let self = this;
      setTimeout(() => {
        self.isFocus = true;
      }, 200);
    },
    blur() {
      let self = this;
      setTimeout(() => {
        self.isFocus = false;
      }, 200);
    },
    input: _.debounce(async function() {
      let self = this;
      self.searchList = [];
      let {
        status,
        data: { data }
      } = await axios({
        url: "/poi/top",
        params: {
          input: self.search,
          city: "三亚" // this.$store.state.geo.position.cname
        }
      });
      console.log(data);
      if (status === 200) {
        self.searchList = (data && data.slice(0, 10)) || [];
      }
    }, 200)
  }
};
</script>

<style></style>
