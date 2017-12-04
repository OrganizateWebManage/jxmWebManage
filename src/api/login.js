import fetch from '@/utils/fetch'

export function loginByUsername(username, password) {
  return fetch({
    url: '/web/user/login',
    method: 'get',
    params:{
      name:username,
      pwd:password,
      type:5
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
    url: '/web/user/loginInfo',
    method: 'get'
  })
}

export function getWebSocketToken(){
  return fetch({
    url: '/web/appMarket/getWebSocketToken',
    method: 'get'
  })
}

export function loginByQr(userId, tokenId) {
  return fetch({
    url: '/web/user/tokenLogin',
    method: 'get',
    params:{
      userId:userId,
      tokenId:tokenId
    }
  })
}

export function getPathByRole(role){
  return fetch({
    url: '/web/backstage/getPathByRole',
    method: 'get',
    params:{
      role:role
    }
  })
}
