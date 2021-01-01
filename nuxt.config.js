module.exports = {
    router: {
        linkActiveClass: 'active',
        extendRoutes(routes, resolve) {
            // 清空routes 。 不能用routes = []， 值传递，破坏了引用
            routes.splice(0)
            routes.push(...[
                {
                    path: '/',
                    component: resolve(__dirname, 'pages/layout'),
                    children: [
                        {
                            path: '',
                            name:"Home",
                            component: resolve(__dirname, 'pages/home')
                        },
                        {
                            path: '/login',
                            component: resolve(__dirname, 'pages/login')
                        },
                        {
                            path: '/register',
                            component: resolve(__dirname, 'pages/login')
                        },
                        {
                            path: "/profile/:username",
                            name: "profile",
                            component: resolve(__dirname, "pages/profile"),
                        },
                        {
                            path: "/settings",
                            name: "settings",
                            component: resolve(__dirname, "pages/settings"),
                        },
                        {
                            path: "/editor",
                            name: "editor",
                            component: resolve(__dirname, "pages/editor"),
                        },
                        {
                            path: "/article/:slug",
                            name: "article",
                            component: resolve(__dirname, "pages/article"),
                        },
                    ]
                }
            ])
        }
    },
    server: {
        host: '0.0.0.0',
        port: 3000
    },
    plugins: [
        '~/plugins/request.js',
        '~/plugins/dayjs.js'
    ]
}