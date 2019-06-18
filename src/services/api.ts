import axios from 'axios';

// 封装 axios 的 get 请求
export function getRequest(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}
