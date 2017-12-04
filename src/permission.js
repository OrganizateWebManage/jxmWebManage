import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'


router.beforeEach((to,from,next) => {
    NProgress.start() // 开启Progress
    if(getToken()){
      if (to.path === '/login') {
          next({ path: '/' })
          NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
      }else {
        if (store.getters.flag) {
          store.dispatch('GetUserInfo').then(res => { // 拉取user_info
              next()
          }).catch(() => {
              store.dispatch('FedLogOut').then(() => {
                Message.error('验证失败,请重新登录')
                next({ path: '/login' })
              })
          })
        }else{
          next()
        }
      }
    }else{
          if (to.path === '/login') {
            next()
          }else{
            next('/login') // 否则全部重定向到登录页
            NProgress.done()
          }
    }
})
