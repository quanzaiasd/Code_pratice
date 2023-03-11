function throttle(func,delay){
    let timer 
    return function(){
        let context = this;
        let args = arguments
       if(timer = ture){
        return
       }
        timer = setTimeout(function(){
        func.apply(context,args);
        timer =null
       },delay)
    }

}
//规定时间只触发一次