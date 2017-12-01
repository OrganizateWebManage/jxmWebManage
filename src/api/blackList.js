import fetch from '@/utils/fetch'

export function getBlackAppList(){
  return fetch({
    url: '/web/backstage/getBlackAppList',
    method: 'get'
  })
}

export function addBlackEntry(name,packageName){
  return fetch({
    url:'/web/backstage/addBlackAppEntry',
    method:'get',
    params:{
      name:name,
      packageName:packageName
    }
  })
}

export function delBlackAppEntry(id){
  return fetch({
    url:'/web/backstage/delBlackAppEntry',
    method:'get',
    params:{
      id:id
    }
  })
}
