const exp=require('express')
const expressAsyncHandler = require('express-async-handler')
const mclient=require("mongodb").MongoClient

const app=exp()

const path=require("path")

app.use(exp.static(path.join(__dirname,'./build')))
app.use(exp.json())


require("dotenv").config()

const DBurl=process.env.DATABASE_CONNECTIVITY

mclient.connect(DBurl)
.then((client)=>{
    let dbObj=client.db("ArtGallery")
    let userCollectionObj=dbObj.collection("userCollection")
    let userCartCollection=dbObj.collection("userArtsCollection")
    let userCartCollection1=dbObj.collection("userCartCollection")
    let allArtsCollection=dbObj.collection("allArtsCollection")
    let checkoutCollection=dbObj.collection("checkoutCollection")

    app.set("userCollectionObj",userCollectionObj)

    app.set("userCartCollection",userCartCollection)
    
    app.set("userCartCollection1",userCartCollection1)

    app.set("allArtsCollection",allArtsCollection)

    app.set("checkoutCollection",checkoutCollection)
   



    console.log("DB CONNECTION success🙃......")

})
.catch(err=>console.log("error in Db Connection",err))




const userApi=require("./APIs/userApi")


app.use("/user-api",userApi)

//app.use("/getusers",expressAsyncHandler())


 app.use((req,res,next)=>{
     res.send({message:"Invalid path @@@@@@@",reason:`this path is    ${req.url}    invalid path`})
  })
 
 
 app.use((error,req,res,next)=>{
    res.send({message:"Error occurred",
 reason:`44${error.message}`})
    
 })

app.listen(process.env.PORT,()=>console.log(`server listening on post ${process.env.PORT}..`))

