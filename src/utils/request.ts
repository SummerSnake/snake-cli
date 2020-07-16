import axios from 'axios';

/**
 * @desc  封装 axios 的 get 请求
 * @param { string } url 接口地址
 * @param { params } params 要发送的参数
 * @return { promise }
 */
export function getRequest(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * @desc  封装 axios 的 post 请求
 * @param { string } url 接口地址
 * @param { params } params 要发送的参数
 * @return { promise }
 */
export function postRequest(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
