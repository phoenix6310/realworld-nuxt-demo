<template>
  <div>
    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        {{comment.body}}
      </div>
      <div class="card-footer">
        <a  class="comment-author">
          <img
            :src="comment.author.image"
            class="comment-author-img"
          />
        </a>
        &nbsp;
        <a href="" class="comment-author">{{comment.author.username}}</a>
        <span class="date-posted">{{ comment.createdAt | date}}</span>
        <span class="mod-options">
          <i class="ion-edit"></i>
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "article-comments",
  data() {
    return {};
  },
  props: {
    comments: {
      type: Object,
      required: true,
    },
  },
  methods: {},
};
</script>
<style scoped>
</style>