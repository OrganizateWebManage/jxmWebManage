import fetch from '@/utils/fetch'

export function searchAppByCondition(){
  return fetch({
    url: '/web/appMarket/searchAppByCondition',
    method: 'get',
  })
}

export function deleteApk(apkId){
  return fetch({
    url: '/web/backstage/deleteApk/'+apkId,
    method: 'get',
  })
}

export function setOrder(apkId,order){
  return fetch({
    url: '/web/backstage/setOrder/'+apkId+"/"+order,
    method: 'get',
  })
}
