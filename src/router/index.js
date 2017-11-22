import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../views/home/index'

Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })


export const constantRouterMap = [
    { path: '/login', component:(resolve)=>require(['views/login/index.vue'],resolve), hidden: true },
    {
      path: '/',
      component: Home,
      name: '首页',
      iconCls: 'el-icon-message',//图标样式class
      children: [
          { path: '/main', component: HelloWorld, name: '主页', hidden: true },
          { path: '/table', component: (resolve)=>require(['views/marketmanage/index.vue'],resolve), name: '应用市场' },
          { path: '/form', component: HelloWorld, name: 'Form' },
          { path: '/user', component: HelloWorld, name: '列表' },
      ]
    },
    {
      path: '/',
      component: Home,
      name: '导航二',
      iconCls: 'fa fa-id-card-o',
      children: [
          { path: '/page4', component: HelloWorld, name: '页面4' },
          { path: '/page5', component: HelloWorld, name: '页面5' }
      ]
    }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
