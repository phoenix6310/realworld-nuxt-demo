<template>
  <div class="">
    <!-- header -->
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link to="/" class="navbar-brand">conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link to="/" class="nav-link">Home</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/editor"
              ><i class="ion-compose"></i>&nbsp;New Post</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/settings"
              ><i class="ion-gear-a"></i>&nbsp;Settings</nuxt-link
            >
          </li>
          <li class="nav-item">
            <nuxt-link to="/login" class="nav-link">Sign in</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/register" class="nav-link">Sign up</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link
              class="nav-link"
              to="/profile/123"
            >
              <img
                class="user-pic"
                src="https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1607788731817&amp;di=f35fa16259ead1b3c05495e93a126e85&amp;imgtype=0&amp;src=http%3A%2F%2F119.img.pp.sohu.com%2Fimages%2Fblog%2F2007%2F12%2F5%2F17%2F11%2F11745d39345.jpg"
              />
              jackphoenix
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
    <!-- /header -->
    <!-- 子路由 -->
    <nuxt-child></nuxt-child>
    <!-- /子路由 -->
    <!-- footer -->
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
          licensed under MIT.
        </span>
      </div>
    </footer>
    <!-- /footer -->
  </div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.navbar-light .navbar-nav .nav-link.active {
  color: rgba(0, 0, 0, 0.3);
}

.navbar-light .navbar-nav .nav-link.nuxt-link-exact-active {
  color: rgba(0, 0, 0, 0.8);
}
</style>