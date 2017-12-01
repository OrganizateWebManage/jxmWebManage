import fetch from '@/utils/fetch'

export function getBlackAppList(){
  return fetch({
    url: '/web/backstage/selectSchoolTime',
    method: 'get'
  })
}

export function addBlackEntry(startTime,endTime,week){
  return fetch({
    url:'/web/backstage/addSchoolTime',
    method:'get',
    params:{
      startTime:startTime,
      endTime:endTime,
      week:week
    }
  })
}

export function addBlackOtherEntry(startTime,endTime,dateTime){
  return fetch({
    url:'/web/backstage/addOtherSchoolTime',
    method:'get',
    params:{
      startTime:startTime,
      endTime:endTime,
      dateTime:dateTime
    }
  })
}

export function delBlackAppEntry(id){
  return fetch({
    url:'/web/backstage/delSchoolTime',
    method:'get',
    params:{
      id:id
    }
  })
}
