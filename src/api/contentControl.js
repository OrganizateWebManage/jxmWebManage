import fetch from '@/utils/fetch'

export function selectContentList(isCheck,id,page,pageSize){
  return fetch({
    url: '/web/backstage/selectContentList',
    method: 'get',
    params:{
      isCheck:isCheck,
      id:id,
      page:page,
      pageSize:pageSize
    }
  })
}

export function passContentEntry(id){
  return fetch({
    url: '/web/backstage/passContentEntry',
    method: 'get',
    params:{
      id:id
    }
  })
}

export function deleteContentEntry(id){
  return fetch({
    url: '/web/backstage/deleteContentEntry',
    method: 'get',
    params:{
      id:id
    }
  })
}

export function showPictureNow(content){
  window.open(content);
}
