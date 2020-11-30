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
