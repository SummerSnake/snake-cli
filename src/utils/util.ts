/* eslint-disable @typescript-eslint/no-unused-vars */
import { notification } from 'antd';
import moment from 'moment';

/**
 * @desc 对象深比较
 * @param x { any }
 * @param y { any }
 * @return { boolean } true 相等，false 不等
 */
export function deepCompare(x, y) {
  if (arguments.length < 1) {
    throw new Error('请传入两个对象');
  }
  let leftChain, rightChain;

  function compare2Objects(x, y) {
    // NaN === NaN returns false and isNaN(undefined) returns true
    if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
      return true;
    }

    // Compare primitives and functions.
    // Check if both arguments link to the same object.
    // Especially useful on the step where we compare prototypes
    if (x === y) {
      return true;
    }

    // Works in case when functions are created in constructor.
    // Comparing dates is a common scenario. Another built-ins?
    // We can even handle functions passed across iframes
    if (
      (typeof x === 'function' && typeof y === 'function') ||
      (x instanceof Date && y instanceof Date) ||
      (x instanceof RegExp && y instanceof RegExp) ||
      (x instanceof String && y instanceof String) ||
      (x instanceof Number && y instanceof Number)
    ) {
      return x.toString() === y.toString();
    }

    // At last checking prototypes as good as we can
    if (!(x instanceof Object && y instanceof Object)) {
      return false;
    }

    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
      return false;
    }

    if (x.constructor !== y.constructor) {
      return false;
    }

    if (x.prototype !== y.prototype) {
      return false;
    }

    // Check for infinitive linking loops
    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
      return false;
    }

    // Quick checking of one object being a subset of another.
    for (let key in y) {
      if (y.hasOwnProperty(key) !== x.hasOwnProperty(key)) {
        return false;
      } else if (typeof y[key] !== typeof x[key]) {
        return false;
      }
    }

    for (let key in x) {
      if (y.hasOwnProperty(key) !== x.hasOwnProperty(key)) {
        return false;
      } else if (typeof y[key] !== typeof x[key]) {
        return false;
      }

      switch (typeof x[key]) {
        case 'object':
        case 'function':
          leftChain.push(x);
          rightChain.push(y);

          if (!compare2Objects(x[key], y[key])) {
            return false;
          }

          leftChain.pop();
          rightChain.pop();
          break;

        default:
          if (x[key] !== y[key]) {
            return false;
          }
          break;
      }
    }
    return true;
  }

  for (let i = 1, len = arguments.length; i < len; i++) {
    leftChain = [];
    rightChain = [];
    if (!compare2Objects(arguments[0], arguments[i])) {
      return false;
    }
  }
  return true;
}

/**
 * @desc 验证非空
 * @param { any } val 要验证的值
 * @return { boolean }
 */
export function verVal(val) {
  return val !== '' && typeof val !== 'undefined' && val !== null;
}

/**
 * @desc 验证是否是数组类型且数组长度大于0
 * @param { array } array 要验证的数组
 * @return { boolean }
 */
export function verArr(array) {
  return Array.isArray(array) && array.length > 0;
}

/**
 * @desc 验证是否是对象类型
 * @param { any } obj 要验证的值
 * @return { boolean }
 */
export function isObj(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * @desc 延迟执行
 * @param { number } timeout 要延迟的时间（毫秒）
 * @return { Promise }
 */
export const delayFunc = timeout =>
  new Promise(resolve => {
    setTimeout(resolve, timeout);
  });

/**
 * @desc 函数防抖 (触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间)
 * @param { function } func 函数
 * @param { number } delay 延迟执行毫秒数
 * @param { boolean } immediate true 表立即执行，false 表非立即执行
 */
export const debounce = (func, delay, immediate) => {
  let timeout = null;

  return function() {
    const context = this;
    const args = arguments;

    if (timeout) clearTimeout(timeout);

    if (immediate) {
      const callNow = !timeout;
      // 一定时间后清空定时器，即一定时间内定时器存在，callNow 为 false
      timeout = setTimeout(() => {
        timeout = null;
      }, delay);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, delay);
    }
  };
};

/**
 * @desc 函数节流 时间戳版 (在持续触发事件的过程中，函数会立即执行，并且每 n 秒执行一次)
 * @param { function } func 函数
 * @param { number } delay 延迟执行毫秒数
 */
export const throttle = (func, delay) => {
  let previous = 0;
  return function() {
    const now = Date.now();
    const context = this;

    if (now - previous > delay) {
      func.apply(context, arguments);
      previous = now;
    }
  };
};

/**
 * @desc 对象赋值方法
 * @param { object } initObj 原始对象
 * @param { string } name 要赋的值--名字
 * @param { string } value 要赋的值
 * @return { object } 操作后的值
 */
export const setObjVal = (initObj, name, value) => {
  return {
    ...initObj,
    [name]: value,
  };
};

/**
 * @desc 参数处理方法
 * @param { object } json 要处理的参数
 */
export const jsonString = (json = {}) => {
  if (isObj(json)) {
    for (const key in json) {
      if (verArr(json[key])) {
        json[key].forEach(item => {
          switch (item) {
            case moment(item, 'YYYY-MM-DD').isValid():
              let arr = [];
              arr.push(moment(item).format('YYYY-MM-DD HH:mm'));
              json[key] = arr;
              break;
            case typeof item === 'object':
              jsonString(item);
              break;
            case verVal(item):
              json[key] = json[key].toString();
              break;
            default:
          }
        });
      } else {
        if (verVal(json[key]) && (key.indexOf('Date') > -1 || key.indexOf('Time') > -1)) {
          json[key] = moment(json[key]).format('YYYY-MM-DD HH:mm');
        }
      }
    }
  }
};

/**
 * @desc notification
 * @param { string } type 图标类型
 * @param { string } message 标题
 * @param { string } description 内容
 */
export const openNotificationWithIcon = (type: string, message: string, description: string) => {
  notification[type]({
    message,
    description,
  });
};
