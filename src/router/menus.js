import pageView from '../views/pageView.vue';
const menus = [
    {
        id: '1',
        name: 'home',
        path: '/',
        icon: 'icon ep-icon i-authorize',
        meta: {
            title: '首页',
        },
        component: () => import(/* webpackChunkName: "home" */ /* webpackMode: "lazy" */ "../views/home/index.vue"),
        children:[]
    },
    {
        id: '2',
        name: 'about',
        path: '/about',
        icon: 'icon ep-icon i-role',
        meta: {
            title: '关于我们',
        },
        redirect:{
            path:'/about-page'
        },
        component:pageView,
        children: [
            {
                id: '2-1',
                name: 'about-page',
                path: '/about-page',
                icon: '',
                meta: {
                    title: '关于我们',
                },
                component: () => import(/* webpackChunkName: "about" */ /* webpackMode: "lazy" */ "../views/about/index.vue"),
            }
        ]
    }
]
export default menus;