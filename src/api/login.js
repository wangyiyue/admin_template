import request from '../utils/request';
import sys  from '@/config/config';
/**
 * @description 登录接口
 * @param data 参数
 */
export function login(data){
  return request({
    url: sys.sysName + '/sys/login.json',
    method: 'post',
    data
  });
}
