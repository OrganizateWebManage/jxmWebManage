import { loginByUsername } from '@/api/login'

const user={
  state:{
    token:false,
    avatar:'',
    name:''
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
    }
  },

  actions:{
    LoginByUsername({commit},userInfo){
      const username= userInfo.username
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          console.log(response)
          commit('SET_TOKEN', true)
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    }
  }
}

export default user
