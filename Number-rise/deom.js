/**
 * 数字递增动画
 * elem：dom元素
 * endVal:最终值(Number)
 * startVal：初始值(Number)
 * duration：动画时间(单位毫秒)
 * deci：小数点位数(Number)
 */
export function riseNumber(elem, endVal, startVal = 0, duration = 1000, deci) {
  if (!elem) {
    return;
  }
  const element = elem;
  let endValue = endVal;

  if (!Number.isFinite(endValue)) endValue = Number(endValue);

  let decimal = deci;
  if (parseInt(endValue, 10) === endValue) {
    decimal = 0;
  } else if (isNaN(decimal)) {
    decimal = endValue.toString().split('.')[1].length;
  }
  const dec = 10 ** decimal;// Math.pow(10, decimal);// 返回10的decimal次幂

  let progress;
  let value;
  let startTime = 0;

  function startCount(timestamp) {
    if (!startTime) startTime = timestamp;
    progress = timestamp - startTime;
    value = startVal + ((endValue - startVal) * (progress / duration));
    value = (value > endValue) ? endValue : value;
    value = Math.floor(value * dec) / dec;
    element.innerHTML = value.toFixed(decimal);
    // requestAnimationFrame告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画,代替 setTimeout 实现动画
    if (progress < duration) requestAnimationFrame(startCount);
  }

  requestAnimationFrame(startCount);
}


