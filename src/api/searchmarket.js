import fetch from '@/utils/fetch'

export function searchAppByCondition(){
  return fetch({
    url: '/web/appMarket/searchAppByCondition',
    method: 'get',
  })
}
