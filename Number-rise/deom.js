/**
 * ���ֵ�������
 * elem��domԪ��
 * endVal:����ֵ(Number)
 * startVal����ʼֵ(Number)
 * duration������ʱ��(��λ����)
 * deci��С����λ��(Number)
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
  const dec = 10 ** decimal;// Math.pow(10, decimal);// ����10��decimal����

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
    // requestAnimationFrame�����������ϣ��ִ�ж������������������һ���ػ�֮ǰ����ָ���ĺ��������¶���,���� setTimeout ʵ�ֶ���
    if (progress < duration) requestAnimationFrame(startCount);
  }

  requestAnimationFrame(startCount);
}


