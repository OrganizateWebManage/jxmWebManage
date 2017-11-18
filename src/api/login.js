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
