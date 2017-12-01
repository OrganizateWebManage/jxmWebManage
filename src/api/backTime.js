import fetch from '@/utils/fetch'

export function getBlackAppList(){
  return fetch({
    url: '/web/backstage/selectSetAppBackEntryList',
    method: 'get'
  })
}

export function addBlackEntry(time){
  return fetch({
    url:'/web/backstage/addSetAppBackEntry',
    method:'get',
    params:{
      time:time
    }
  })
}

export function addBlackOtherEntry(time){
  return fetch({
    url:'/web/backstage/addSetBackEntry',
    method:'get',
    params:{
      time:time
    }
  })
}
