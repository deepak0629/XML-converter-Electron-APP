var countdown=(tick)=>{
    let count=3
    let timer=setInterval(()=>{
        console.log(count)
        tick(count--)
        if(count==-1){
            clearInterval(timer)
        }
    },1000)
}
module.exports=countdown