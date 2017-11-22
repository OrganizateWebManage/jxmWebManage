import fetch from '@/utils/fetch'

export function loginByUsername(username, password) {
  return fetch({
    url: '/web/user/login',
    method: 'get',
    params:{
      name:username,
      pwd:password
    }
  })
}

export function logout(){
  return fetch({
    url: '/web/user/logout',
    method: 'get'
  })
}

export function getUserInfo(){
  return fetch({
    url: '/web/forum/loginInfo',
    method: 'get'
  })
}
