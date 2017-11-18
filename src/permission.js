import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'


router.beforeEach((to,from,next) => {
    console.log('start');
    var userInfo={
      username:'18866661000',
      password:'123456'
    }
    store.dispatch('LoginByUsername',userInfo).then(response => {
        console.log(response);
    }).catch(() => {
      console.log('调用失败');
    })
})