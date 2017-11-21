import fetch from '@/utils/fetch'

export function importApkFile(formdata){
  return fetch({
    url: '/web/backstage/importApkFile',
    method: 'post',
    data:formdata,
    headers: {'Content-Type': 'multipart/form-data'}
  })
}
