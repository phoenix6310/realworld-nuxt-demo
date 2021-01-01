<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

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
          <button class="btn btn-sm btn-outline-secondary"
          :class="{active: article.author.following}"
          >
            <i class="ion-plus-round"></i>
            &nbsp; Follow {{ article.author.username }}
            <span class="counter">(10)</span>
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary"
          :class="{active: article.favorited}"
          >
            <i class="ion-heart"></i>
            &nbsp; Favorite Post <span class="counter">(29)</span>
          </button>
        </div>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
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
          <button class="btn btn-sm btn-outline-secondary"
          :class="{active: article.author.following}"
          >
            <i class="ion-plus-round"></i>
            &nbsp; Follow {{ article.author.username }}
            <span class="counter">(10)</span>
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary"
          :class="{active: article.favorited}"
          >
            <i class="ion-heart"></i>
            &nbsp; Favorite Post <span class="counter">(29)</span>
          </button>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img
                :src="user.image"
                class="comment-author-img"
              />
              <button class="btn btn-sm btn-primary">Post Comment</button>
            </div>
          </form>
          <article-comments :comments="comments"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleDetail, getArticleComments } from "@/api/articles.js";
import MarkdownIt from "markdown-it";
import ArticleComments from './article-comments'
import { mapState } from 'vuex'
export default {
  name: "ArticleIndex",
  data() {
    return {
      comments: []
    };
  },
  async asyncData({ params }) {
    const slug = params.slug
    const {
      data: { article },
    } = await getArticleDetail(slug);

    var md = new MarkdownIt();
    article.body = md.render(article.body);

    return {
      article,
      slug
    };
  },
  methods: {},
  async mounted(){
    const { data } = await getArticleComments(this.slug)
    console.log(data)
    this.comments = data.comments
  },
  components: {
    ArticleComments
  },
  head(){
    return {
      title: `${this.article.title}-详情`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        }
      ]
    }
  },
  computed: {
    ...mapState(['user'])
  }
};
</script>
<style scoped>
</style>