import { loginByUsername,getUserInfo,logout,loginByQr,getPathByRole } from '@/api/login'

import { getToken,setToken,removeToken } from '@/utils/auth'

import { constantRouterMap,constantDefaultRoutes } from '@/router'

function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
      if (route.children && route.children.length) {
          route.children=route.children.filter(item =>{
              var flag=false;
              for(var i in roles){
                 if(item.path==roles[i]){
                   flag=true;
                   break;
                 }
              }
              return flag
          })
      }
      return true
  })
  return accessedRouters
}

const user={
  state:{
    token:getToken(),
    avatar:'',
    name:'',
    flag:false
  },

  mutations:{
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_FLAG: (state, flag) => {
      state.flag = flag
    }
  },

  actions:{
    GetRouters(){
      var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
		    var userRole=user.role;
        console.log(userRole)
        if(userRole==2){
          return new Promise((resolve) => {
              resolve(constantRouterMap)
          })
        }else{
          return new Promise((resolve) => {
            getPathByRole(userRole).then(response => {
              if(response.data.code=="200"){
                  var message=response.data.message
                  var accessedRouters=new Array()
                  for(var i in constantRouterMap){
                    accessedRouters.push(constantRouterMap[i])
                  }
                  var paths=message.paths
                  accessedRouters = filterAsyncRouter(accessedRouters,paths)
                  resolve(accessedRouters)
              }else{
                  resolve(constantDefaultRoutes)
              }
            }).catch(error => {
              console.log(error)
              reject(error)
            })
          })
        }
			}else{
          return new Promise((resolve) => {
            resolve(constantDefaultRoutes)
          })
      }

    },
    LoginByUsername({commit},userInfo){
      const username= userInfo.username
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          if(response.data.code=="200"){
            setToken(true);
            commit('SET_TOKEN', true)
          }
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    LoginByQr({commit},userInfo){
      console.log(userInfo);
      const userId= userInfo.userId
      return new Promise((resolve, reject) => {
        loginByQr(userId, userInfo.tokenId).then(response => {
          if(response.data.code=="200"){
            setToken(true);
            commit('SET_TOKEN', true)
          }
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    LogOut({commit,state}){
      return new Promise((resolve, reject) => {
        logout().then(response => {
          commit('SET_TOKEN', false)
          commit('SET_FLAG', false)
          sessionStorage.removeItem('user')
          removeToken()
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUserInfo({commit,state}){
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          console.log("获取个人信息")
          console.log(response);
          const data = response.data
          commit('SET_NAME', data.userName)
          commit('SET_AVATAR', data.avatar)
          commit('SET_FLAG', true)
          const user={}
          user.name=data.userName
          user.avatar=data.avatar
          user.role=data.userRole
          sessionStorage.setItem('user',JSON.stringify(user))
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', false)
        commit('SET_FLAG', false)
        removeToken()
        resolve()
      })
    }
  }


}

export default user
