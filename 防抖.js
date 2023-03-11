function debounce(func,delay){
      let timer;
      return function(){
            let context =this;
            let args = arguments;
            clearTimeout(timer)
            timer =setTimeout(function(){
                func.apply(context,arguments)
            },delay)
        
      }
}
//定义理解:比如自动开关门,遇到人会打开,保持个5秒钟,5秒内再次遇到会重新计时,五秒内没人才会关闭

// 防抖函数的基本逻辑是  ①触发事件func     ② 先清除定时器   ②重新设置定时器
//防抖函数注意难点   ①运用了闭包 timer的设置设置在了外层function,包装了timer的唯一性,每次清除延时是上一个timer的延时
//                   ②this指向问题  这里设置context,因为setTimeout执行回调的时候运行环境是在window
//                   ③设置传参arguments