<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd v-for="(item, idx) in menu" :key="idx" @mouseenter="mouseenter">
        <i :class="item.type" />{{ item.name }}<span class="arrow"></span>
      </dd>
    </dl>
    <div class="detail" v-if="kind" @mouseleave="sout" @mouseenter="sover">
      <template v-for="(item, idx) in curdetial.child">
        <h4 :key="idx">{{ item.title }}</h4>
        <span v-for="v in item.child" :key="v">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: "",
      menu: [
        {
          type: "food",
          name: "美食",
          child: [
            {
              title: "美食",
              child: ["火锅", "烧烤", "自助", "海鲜"]
            }
          ]
        },
        {
          type: "takeout",
          name: "外卖",
          child: [
            {
              title: "外卖",
              child: ["火锅", "烧烤", "自助", "海鲜"]
            }
          ]
        },
        {
          type: "hotel",
          name: "酒店",
          child: [
            {
              title: "酒店",
              child: ["经济型", "舒适型", "豪华型", "民宿"]
            },
            {
              title: "品牌别墅",
              child: ["独栋别墅", "轰趴馆", "其他"]
            }
          ]
        }
      ]
    };
  },
  computed: {
    curdetial() {
      return this.menu.find(item => item.type === this.kind);
    }
  },
  methods: {
    mouseleave() {
      let self = this;
      self._timer = setTimeout(() => {
        self.kind = "";
      }, 150);
    },
    mouseenter(e) {
      this.kind = e.target.querySelector("i").className;
    },
    sover() {
      clearTimeout(this._timer);
    },
    sout() {
      this.kind = "";
    }
  }
};
</script>

<style lang="scss"></style>
