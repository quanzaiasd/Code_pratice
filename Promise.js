//这里手写了new Promise和Promise then
class Commitment{
    static PENDING ='待定';static FULLFILLED ='成功' ; static REJECTED='拒绝';
    constructor(func){
        this.status =Commitment.PENDING;
        this.result= null;
        this.resolveCallbacks=[];
        this.rejectCallbacks=[]; 
        try{
        func(this.resolve.bind(this),this.reject.bind(this));
        //将resolve和reject中的this绑定在constructor中的this中,不然找不到constructor中的this变量
        } catch(error){
            this.reject(error)
        }
   
    }
    resolve(result){
      setTimeout(()=>{
        if(this.status === Commitment.PENDING){
            this.status = Commitment.FULLFILLED;
            this.result = result;
            this.resolveCallbacks.forEach(callback =>{
                callback(result);
            })
        }
      })
    }
    reject(result){
       setTimeout(()=>{
        if(this.status === Commitment.PENDING){
            this.status = Commitment.REJECTED;
            this.result = result;
            this.rejectCallbacks.forEach(callback =>{
                callback(result)
            });
        }
       });
    }
    then(onFULFILLED,onREJECTED){
        return new Commitment((resolve,reject)=>{//这里时promise的链式调用设置

        //原生Promise规定then里面的两个参数如果不是函数的话要被忽略,所以这里用三元二次表达式选择返回原函数参数或空函数
        onFULFILLED =typeof onFULFILLED === 'function' ? onFULFILLED: ()=>{};
        onREJECTED = typeof onREJECTED === 'function' ? onREJECTED: ()=>{};
        if(  this.status = Commitment.PENDING){
            this.resolveCallbacks.push(onFULFILLED);
            this.rejectCallbacks.push(onREJECTED);

            //关于回调函数位置讲下首先我们的逻辑是,当我们遇到resolve时其实是异步任务还未执行的所以这里去按顺序去查找then了
            //但是由于resolve还处于异步,then的状态还是pendding,then必须要等待到resolve/reject执行完毕之后拿到后再执行,
            //所以在pendding状态时设置数组存储待处理的状态,执行resolve/reject的时候会可以拿到这两个数组,并进行遍历待执行函数
         }
        if(this.status === Commitment.FULLFILLED){
           setTimeout(()=>{
            onFULFILLED(this.result);
           }
           )
        }
        if(this.status === Commitment.REJECTED){
           setTimeout(()=>{
            onREJECTED(this.result);
        })
        }
    })
    }
}


console.log('第一步')
let commitment = new Commitment((resolve,reject)=>{
    console.log('第二步')
    setTimeout(()=>{
        resolve('这次一定');
        reject('下次一定');
        console.log('第四步')
    });
})

commitment.then(
    result =>{console.log(result)},
    result=>{console.log(result.message)}
)
//
//