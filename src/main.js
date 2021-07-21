var electron=require('electron')
var countdown=require("./countdown")
var app=electron.app
var fs=require("fs")
var childprocess=require("child_process")
// var dailog=electron.dailog
var Browserwindow=electron.BrowserWindow
var mainwindow=[]
var ipc=require('electron').ipcMain
var path=require('path')
ipc.on('browseclicked',()=>{
    var temp=require("electron").dialog.showOpenDialog({ properties: ['openFile','multiSelections'],filters: [
        { name: 'Xml Files', extensions: ['xml'] },
      ] })
      mainwindow[0].webContents.send("filenames",temp.join(","))
    //  var batfilepath= path.join(__dirname, '../bat_files', 'xmltojsx.bat')
    //  batfilepath=batfilepath.toString()
     
    //   temp.map((file)=>{
    //     console.log('"'+batfilepath+'"'+" '"+file+"' ")
    //       if(fs.existsSync(file)){
    //           childprocess('"'+batfilepath+'"'+" '"+file+"' ",(error,stdout,stderr)=>{
    //             // console.log(error)
    //             console.log(stdout)
    //             // console.log(stderr)
    //           })
    //       }
    //   })
    // console.log(temp)
    // console.log(tick,count) 
})

ipc.on("convert",(event,filenames)=>{
    console.log("receved")
    console.log(filenames)
    var batfilepath= path.join(__dirname, '../bat_files', 'xmltojsx.bat')
    batfilepath=batfilepath.toString()
    filenames.split(",").map((file)=>{
            console.log('"'+batfilepath+'"'+" '"+file+"' ")
              if(fs.existsSync(file)){
                  console.log("here")
                //   childprocess('"'+batfilepath+'"'+'"'+file+'"',(error,stdout,stderr)=>{
                //     // console.log(error)
                //     console.log(stdout)
                //     // console.log(stderr)
                //   })
                var workerProcess = childprocess.spawn(batfilepath,[file],{encoding: "UTF-8"});  
                workerProcess.stdout.on('data', function (data) {  
                    console.log('stdout: ' + data);  
                 });  
               workerProcess.stderr.on('data', function (data) {  
                    console.log('stderr: ' + data);  
                 });  
               workerProcess.on('close', function (code) {  
                    console.log('child process exited with code ' + code);  
                 }); 
              }
          })
})

// require('electron-reload')( __dirname,{
//     electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
// })
app.on('ready',_=>{
    console.log("ready")
var temp=[1].map(()=>{
    var w=new Browserwindow({
        width:900,
        height:900,
        webPreferences: {
            nodeIntegration: true 
          }
    })
    w.loadURL(`file://${__dirname}/countdown.html`)
    // w.openDevTools()
    w.on('closed',_=>{
        console.log("closed")
        mainwindow=null 
    })
    
    // w.on('close',(e)=>{
    //     var choice=require('electron').dialog.showMessageBox(w,{
    //         type:"question",
    //         message:"are you sure you want to exit?",
    //         buttons:['yes','No'],
    //         title:"Confirm"
    //     })
    //     if(choice==1){
    //         e.preventDefault()
    //     }
    // })
    mainwindow.push(w)
})
})
