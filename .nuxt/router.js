import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _675a6b65 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _0c95904c = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _3d2a0bce = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _73fd20ce = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _c631ecc4 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _5b8b91a8 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _5ac7641b = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _675a6b65,
    children: [{
      path: "",
      component: _0c95904c,
      name: "Home"
    }, {
      path: "/login",
      component: _3d2a0bce
    }, {
      path: "/register",
      component: _3d2a0bce
    }, {
      path: "/profile/:username",
      component: _73fd20ce,
      name: "profile"
    }, {
      path: "/settings",
      component: _c631ecc4,
      name: "settings"
    }, {
      path: "/editor",
      component: _5b8b91a8,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _5ac7641b,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decodeURIComponent(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
