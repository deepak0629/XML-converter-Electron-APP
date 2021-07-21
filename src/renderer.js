console.log("inside renderer")
var ipc=require('electron').ipcRenderer

// var tick=function(val){
//     document.getElementById("countdisplay").innerHTML=val
// }
document.getElementById('countbtn').addEventListener('click',()=>{
    ipc.send('browseclicked');
    console.log("button clicked")
})
document.getElementById("convert").addEventListener('click',()=>{
    ipc.send('convert',document.getElementById('browseinput').value)
})

ipc.on("filenames",(event,names)=>{
    document.getElementById("browseinput").value=names
})
// document.getElementById('countbtn').click()
// ipc.on("countdecrement",(...args)=>{
//     console.log(args[1])
//     tick(args[1])
// })