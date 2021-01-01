<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'your_fed' }"
                  exact
                  :to="{
                    name: 'Home',
                    query: {
                      tab: 'your_fed',
                      favorited: user.username,
                    },
                  }"
                  v-if="user"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{ active: tab === 'global_fed' }"
                  :to="{
                    name: 'Home',
                    query: {
                      tab: 'global_fed',
                    },
                  }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab === 'tag' }"
                  :to="{
                    name: 'Home',
                    query: {
                      tab: 'tag',
                      tag,
                    },
                  }"
                  >#{{ tag }}</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username,
                  },
                }"
                ><img :src="article.author.image"
              /></nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                  class="author"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{
                  article.createdAt | date("MMM DD, YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-sm pull-xs-right btn-outline-primary"
                :class="{
                  active: article.favorited,
                }"
                :disabled = "article.disable"
                @click="changeFavourite(article)"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{ name: 'article', params: { slug: article.slug } }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: item === pageNum,
                }"
                v-for="item in pages"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'Home',
                    query: {
                      pageNum: item,
                      tag,
                      tab,
                    },
                  }"
                  >{{ item }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'Home',
                  query: {
                    tag: item,
                    tab: 'tag',
                  },
                }"
                class="tag-pill tag-default"
                v-for="item in tagsArr"
                :key="item"
                >{{ item }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, addFavourite, deleteFavourite } from "@/api/articles";
import { getFedArticles } from "@/api/fedArticles";

import { getTags } from "@/api/tags";
import { mapState } from "vuex";

export default {
  name: "HomeIndex",
  data() {
    return {};
  },
  watchQuery: ["pageNum", "tag", "tab"],
  async asyncData({ query, store }) {
    // offset 代表跨过多少条数据 。 比如 offset: 2 代表从第三条数据拿limit条数据
    // 正常来说时pageSize，pageNum 。
    // offset = （pageNum-1）*pageSize
    const limit = 10;
    const pageNum = Number.parseInt(query.pageNum || 1);
    const tab = query.tab || "global_fed";
    // console.log(tab)
    const tag = query.tag;
    // const { data } = await getArticles({
    //   limit,
    //   offset: (pageNum - 1) * limit,
    // });

    // // tags
    // const { data: tagsData } = await getTags();
    let fnName = getArticles;
    // console.log(store.state)
    if (store.state.user && tab === "your_fed") {
      fnName = getFedArticles;
    }
    // console.log()
    // return ;
    // 优化，两个异步任务合并
    const [{ data }, { data: tagsData }] = await Promise.all([
      fnName({
        // favorited: query.favorited,
        tag,
        limit,
        offset: (pageNum - 1) * limit,
      }),
      getTags(),
    ]);
    data.articles.forEach((article)=>{
      article.disable = false
    })
    return {
      articles: data.articles,
      articlesCount: data.articlesCount,
      limit,
      pageNum,
      tagsArr: tagsData.tags,
      tag,
      tab,
    };
  },
  computed: {
    pages() {
      return Math.ceil(this.articlesCount / this.limit);
    },
    ...mapState(["user"]),
  },
  methods: {
    async changeFavourite(article) {
      console.log(article);
      article.disable = true
      if(article.favorited){
        await deleteFavourite(article.slug)
        article.favorited = false
        article.favoritesCount -= 1
      }else{
        await addFavourite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.disable = false
    },
  },
};
</script>
<style scoped>
</style>