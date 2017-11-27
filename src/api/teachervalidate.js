import fetch from '@/utils/fetch'

export function selectTeacherList(seachId,
     type,page,pageSize){
  return fetch({
    url: '/web/backstage/selectTeacherList',
    method: 'get',
    params:{
      seachId:seachId,
      type:type,
      page:page,
      pageSize:pageSize
    }
  })
}


export function addTeacherList(type,id){
  return fetch({
    url: '/web/backstage/addTeacherList',
    method: 'get',
    params:{
      type:type,
      id:id
    }
  })
}
