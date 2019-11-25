import request from '../utils/request';
import sys  from '@/config/config';

/**
 * @description 权限菜单
 * @param
 * */
export function getNavList(data) {
  return request({
    url: sys.sysName + '/sys/menu/nav?terraceType='+ data,
    method: 'get',
  });
}
