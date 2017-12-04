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
export const constantPaths=[
  {path:"/table"},
  {path:'/teaValidate'},
  {path: '/content'},
  {path: '/main'},
  {path: '/fulan'},
  {path: '/black'},
  {path: '/schoolTime'},
  {path: '/systemPhone'},
  {path: '/content'}
]


export const constantDefaultRoutes=[
  {
    path: '/',
    component: Home,
    name: '首页',
    iconCls: 'el-icon-message',//图标样式class
    children: [
        { path: '/main', component: HelloWorld, name: '主页', hidden: true }
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
          { path: '/fulan', component: (resolve)=>require(['views/marketmanage/index.vue'],resolve), name: '复兰应用管理' },
          { path: '/black', component: (resolve)=>require(['views/blackList/index.vue'],resolve), name: '应用黑名单管理' },
          { path: '/schoolTime', component: (resolve)=>require(['views/schoolTime/index.vue'],resolve), name: '管控默认上课时间' },
          { path: '/systemPhone', component: (resolve)=>require(['views/systemPhone/index.vue'],resolve), name: '常用电话设置' },
          { path: '/backTime', component: (resolve)=>require(['views/backTime/index.vue'],resolve), name: '默认回调频率' },
          { path: '/teaValidate', component: (resolve)=>require(['views/teachervalidate/index.vue'],resolve), name: '老师认证' },
          { path: '/content', component: (resolve)=>require(['views/contentControl/index.vue'],resolve), name: '内容管理' },
          { path: '/userRole', component: (resolve)=>require(['views/userRole/index.vue'],resolve), name: '角色管理' },
          { path: '/manageUserRole', component: (resolve)=>require(['views/userRole/roleUser.vue'],resolve), name: '用户角色管理' }
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
