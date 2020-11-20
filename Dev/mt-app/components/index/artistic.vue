<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd :class="{ active: kind === 'all' }" kind="all" keyword="景点">
        全部
      </dd>
      <dd :class="{ active: kind === 'part' }" kind="part" keyword="美食">
        约会聚餐
      </dd>
      <dd :class="{ active: kind === 'spa' }" kind="spa" keyword="丽人">
        丽人SPA
      </dd>
      <dd :class="{ active: kind === 'movie' }" kind="movie" keyword="电影">
        电影演出
      </dd>
      <dd :class="{ active: kind === 'travel' }" kind="travel" keyword="旅游">
        品质出游
      </dd>
    </dl>
    <ul class="ibody">
      <li v-for="item in cur" :key="item.title">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.img" class="image" />
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos">
              <span>{{ item.pos }}</span>
            </li>
            <li class="price">
              ￥<em>{{ item.price }}</em
              ><span>/起</span>
            </li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data: () => {
    return {
      kind: "all",
      list: {
        all: [
          {
            img:
              "https://img.meituan.net/phoenix/bc64c0403f38e8682dbb8a4733cd19912293488.jpg@740w_416h_1e_1c",
            title:
              "【荔枝民宿·蘭梦】梦幻艺术空间 泰山脚下 万达广场 近高铁站 火车站 泰山登山口",
            pos: "测试数据",
            price: 500
          },
          {
            img:
              "http://p1.meituan.net/iphoenix/87bcbf87964b70b4dcf8d49dd495ebea1173952.jpg@740w_416h_1e_1c",
            title:
              "泰安万达欧式观景大床房/泰山脚下/楼下万达广场/近高铁站，泰安老街",
            pos: "测试数据1",
            price: 200
          },
          {
            img:
              "https://img.meituan.net/iphoenix/3153dddecc9a14532d28c1d8ee4ee61b125532.jpg@740w_416h_1e_1c",
            title: "龙城之恋舒适大床房",
            pos: "测试数据2",
            price: 60
          }
        ],
        part: [
          {
            img:
              "https://img.meituan.net/phoenix/2cea6ecdb86f6f338ef3c63fe6289f25726407.jpg.webp@1005w_564h_1e_1c_90Q",
            title:
              "慢山民宿· 一座被日式炭火烤肉加持/位置与景致俱佳放眼望去全是景致看不到村舍的民宿/湖南卫视取景地/慕田峪长城·红螺寺",
            pos: "测试数据",
            price: 500
          }
        ],
        spa: [
          {
            img:
              "https://img.meituan.net/iphoenix/e684fb788e32b2da0fa452a4fd99d31161874.jpg.webp@1005w_564h_1e_1c_90Q",
            title: "「栖柳园」醉柳 古色古香四合院",
            pos: "测试数据1",
            price: 200
          }
        ],
        movie: [
          {
            img:
              "//p1.meituan.net/movie/b905c2994092ec14f9f8fe8318e1e612180619.jpg@267w_371h_1e_1c",
            title: "风平浪静",
            pos: "测试数据2",
            price: 60
          }
        ],
        travel: [
          {
            img:
              "https://img.meituan.net/phoenix/2cea6ecdb86f6f338ef3c63fe6289f25726407.jpg.webp@1005w_564h_1e_1c_90Q",
            title:
              "慢山民宿· 一座被日式炭火烤肉加持/位置与景致俱佳放眼望去全是景致看不到村舍的民宿/湖南卫视取景地/慕田峪长城·红螺寺",
            pos: "测试数据",
            price: 500
          }
        ]
      }
    };
  },
  computed: {
    cur: function() {
      return this.list[this.kind];
    }
  },
  methods: {
    over(e) {
      let dom = e.target;
      let tag = dom.tagName.toLowerCase();
      let self = this;
      if (tag === "dd") {
        this.kind = dom.getAttribute("kind");
        let keyword = dom.getAttribute("keyword");
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/index/artistic.scss";
</style>
