/*导出防抖函数*/
export function debounce(func,delay) {
	let timer = null  // 用于保存定时器
	return function (...args) {
		// 如果定时器存在，清除定时器，随后重新设置timer
		if(timer !== null) clearTimeout(timer)
		timer = setTimeout(()=>{
			func.apply(this,args)
		}, delay)  // 超过delay为接收到事件会调用这里的func   必要的额时候可以修改func的this指向  由于timer对外部存在引用，因此不会被销毁
	}
}


/* 时间戳格式化 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
		// 替换年份,也就是第一个匹配组,根据fmt中传入的Y的个数截取年份数位
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
		// “M+”M需要出现一次或多次
    'M+': date.getMonth() + 1, // 月份 需要+
    'd+': date.getDate(), // 天数
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds() // 秒
  };
	// for遍历对象取出键名
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
