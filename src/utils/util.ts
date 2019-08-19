/**
 * 对象深比较
 */
export function deepCompare(x, y) {
  console.info(x, y);

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
 * 验证非空
 * @param val 要验证的值
 */
export function verVal(val) {
  return val !== '' && typeof val !== 'undefined' && val !== null;
}

/**
 * 验证是否是数组类型且数组长度大于0
 * @param array 要验证的=数组
 */
export function verArr(array) {
  return Array.isArray(array) && array.length > 0;
}

/**
 * 验证是否是对象类型
 * @param obj 要验证的值
 */
export function isObj(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * 延迟执行
 * @param timeout 要延迟的时间（毫秒）
 */
export const delayFunc = timeout =>
  new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
