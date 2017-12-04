import fetch from '@/utils/fetch'

export function getUserRoleOfPathDTO(){
  return fetch({
    url: '/web/backstage/getUserRoleOfPathDTO',
    method: 'get',
  })
}

export function saveUserRoleOfPath(pathStr,role){
  return fetch({
    url: '/web/backstage/saveUserRoleOfPath',
    method: 'get',
    params:{
      pathStr:pathStr,
      role:role
    }
  })
}

export function searchUserList(relax){
  return fetch({
    url: '/web/community/searchUserList',
    method: 'get',
    params:{
      relax:relax
    }
  })
}

export function saveUserRole(userId,role){
  return fetch({
    url: '/web/backstage/saveUserRole',
    method: 'get',
    params:{
      userId:userId,
      role:role
    }
  })
}

export function getAllUserRoles(){
  return fetch({
    url: '/web/backstage/getAllUserRoles',
    method: 'get'
  })
}
