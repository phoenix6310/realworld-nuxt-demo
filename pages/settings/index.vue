<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="submitData">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="userInfo.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="userInfo.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="userInfo.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="userInfo.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="userInfo.password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr>
          <button class="btn btn-outline-danger" @click="logout">
          Or click here to logout.
        </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { updateUser } from '@/api/user.js'
const Cookie = process.client? require('js-cookie'): undefined
export default {
  name: "SettingsIndex",
  middleware: 'authenticated',
  data() {
    return {
      userInfo: {
        image: '',
        username: '',
        bio: '',
        email: '',
        password: ''
      }
    };
  },
  mounted(){
    for(let name in this.userInfo){
      if(this.user[name]){
        this.userInfo[name] = this.user[name]
      }
    }
  },
  methods: {
    async submitData(){
      // console.log(this.userInfo)
      const {data} = await updateUser(this.userInfo)
      console.log(data.user)
      this.$store.commit('setUser', data.user)
      Cookie.set('user', data.user)
    },
    async logout () {
      console.log(88)
      this.$store.commit('setUser', null)
      Cookie.set('user', '')
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState(['user'])
  }
};
</script>
<style scoped>
</style>