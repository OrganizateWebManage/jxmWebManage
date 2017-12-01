import fetch from '@/utils/fetch'

export function getBlackAppList(){
  return fetch({
    url: '/web/backstage/selectPhoneEntryList',
    method: 'get'
  })
}

export function addBlackEntry(name,phone){
  return fetch({
    url:'/web/backstage/addPhoneEntry',
    method:'get',
    params:{
      name:name,
      phone:phone
    }
  })
}

export function delBlackAppEntry(id){
  return fetch({
    url:'/web/backstage/delPhoneEntry',
    method:'get',
    params:{
      id:id
    }
  })
}
