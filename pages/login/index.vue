<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ tipText }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-show="type === 'login'" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-show="type === 'register'" to="/login"
              >Have an account?</nuxt-link
            >
          </p>

          <ul class="error-messages">
            <template v-for="(messages, name) in errors">
              <li v-for="(item, index) in messages" :key="index">
                {{ name + " " + item }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="type !== 'login'">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                required
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ tipText }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user.js";
const Cookie = process.client? require('js-cookie'): undefined
export default {
  name: "Login",
  middleware: 'notAuthenticated',
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  computed: {
    type() {
      console.log(this.$route.path.slice(1));
      return this.$route.path.slice(1);
    },
    tipText() {
      if (this.type === "login") {
        return "Sign in";
      } else if (this.type === "register") {
        return "Sign up";
      }
    },
    submitFn() {
      return this.type === "login" ? login : register;
    },
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = await this.submitFn({
          user: this.user,
        });
        console.log(data);
        this.$store.commit('setUser', data.user)
        Cookie.set('user', data.user)
        this.$router.push("/");
      } catch (err) {
        // console.dir(err);
        this.errors = err.response.data.errors;
      }
    },
  },
};
</script>
<style scoped>
</style>