const exp=require("express")
const bcryptjs=require("bcryptjs")
const expressAsyncHandler = require("express-async-handler")
const userApi=exp.Router()
const jwt=require("jsonwebtoken")


userApi.use(exp.json());

console.log("::::::::::::::::::::::::")
// userApi.post('/login',expressAsyncHandler(async (req,res)=>{

//     //get userCollectionObject
//     console.log("went into login")

//    let userCollectionObject = req.app.get("userCollectionObj");
//    //get user credentials obj from client
//    let userCredObj = req.body;
//    //seacrh for user by username
//    console.log("USER OBJECT REACHED HERE ",userCredObj)

//    let userOfDB = await userCollectionObject.findOne({
//      username: userCredObj.username,
//    });
//    //if username not existed
//    console.log("USER OBJECT DB ",userOfDB)
//    if (userOfDB == null) {
//      res.send({ message: "Invalid user" });
//      console.log("Invalid user")
//    }
//    //if username existed
//    else {
//      //compare passwords
//      let status = await bcryptjs.compare(
//        userCredObj.password,
//        userOfDB.password
//      );
//      //if passwords not matched
//      if (status == false) {
//        console.log("Invalid password")
//        res.send({ message: "Invalid password" });
//      }
//      //if passwords are matched
//      else {
//        //create token
//       let token = jwt.sign(
//          { username: userOfDB.username },
//          process.env.SECRET_KEY,
//          { expiresIn: 10 }
//        );
     
//        //send token
//        console.log("success")
//        res.send({
//          message: "success",
//          payload: token,
//          userObj: userOfDB,
//        });
//      }
//    }

// }))

userApi.post('/login', expressAsyncHandler(async (req, res, next) => {

    //console.log("???????????????????")

    let userCollectionObject = req.app.get("userCollectionObj")

    let credentials = req.body;
    
    console.log("user collection obg in api",credentials)

    //verify username
    let user = await userCollectionObject.findOne({ username: credentials.username })

    console.log("Users==",user)

    //if user is not existed
    if (user === null) {
        res.send({ message: "Invalid username" })
    }
    //if user is existed
    else {
        //compare passwords
        let result = await bcryptjs.compare(credentials.password, user.password)
        //if pws not mtched
        if (result === false) {
            res.send({ message: "Invalid password" })
        }
        //if passwords are matched
        else {
            //create a token and send it as res 
            let token = await jwt.sign({ username: credentials.username }, 'abcdef', { expiresIn: 10 })

            //remove password from user
            delete user.password;
            res.send({
                message: "login-success",
                token: token,
                username: credentials.username,
                userObj: user
            })
        }
    }
}))

//create route to create user
userApi.post("/create-user",expressAsyncHandler(async (req,res)=>{
   
 //console.log("in cREATE USER req,path.file",req.file.path)
 let newUserObj=req.body
 //JSON.parse(req.body.userObj)
 console.log("😶😐😐🎈",newUserObj)
   //get userCollectionobject
   let userCollectionObject=req.app.get("userCollectionObj")
   //get userobject from client
  // let userObj=req.body
   //check if username already exists
   let userOfDB=await userCollectionObject.findOne({username:newUserObj.username})
   //if user existed
   console.log("USER OF DB ",userOfDB)
   if(userOfDB!==null)
   {
       res.send({message:"Username already exists"})
   }
   if(userOfDB===null){
        //hash password
        let hashedPassword = await bcryptjs.hash(newUserObj.password, 6);
        //replace plain password with hashed password in newUserObj
        newUserObj.password = hashedPassword;
        //add profile image link to newUserObj
        //newUserObj.profileImg=req.file.path;
       // console.log("new user object ",newUserObj)

        //removw photo property
        //delete newUserObj.photo;
        //insert newUser
        await userCollectionObject.insertOne(newUserObj);
        //send response
        res.send({message:"new user created!"});
   }
}))










userApi.post("/add-to-checkout/:username",expressAsyncHandler(async (req,res)=>{
 
    let artObj=req.body;
 
    let username=req.params.username;

    let checkoutCollection=req.app.get("checkoutCollection")

    let userProdObj=await checkoutCollection.findOne({username:username});
     
    //console.log(userProdObj)

    if(userProdObj==null)
    {
        let arts=[];
        //console.log(artObj)
        arts.push(artObj);
        //console.log("ARTS==",arts)

        await checkoutCollection.insertOne(artObj);

        let newUserProductObj={username:username,checkouts:arts}

        //console.log("USER ART OBJECT== ",newUserProductObj)

       await checkoutCollection.insertOne(newUserProductObj)

        res.send({message:"Order successfully,proceed to payment"})
    }
   else
   {
        userProdObj.checkouts.push(artObj)


        await checkoutCollection.updateOne({username:username},{$set:{...userProdObj}})
       res.send({message:"Order successfully,proceed to payment"})   
   }
      
}))











userApi.get("/get-all-arts",expressAsyncHandler(async (req,res)=>{

    let allArtsCollection=req.app.get("allArtsCollection")

    let arts= await allArtsCollection.find().toArray()
    res.send({message:"got all data",products:arts})



}))




userApi.post("/add-to-arts/:username",expressAsyncHandler(async (req,res)=>{
 
    let artObj=req.body;
 
    let username=req.params.username;

    let userCartCollection=req.app.get("userCartCollection")
    let allArtsCollection=req.app.get("allArtsCollection")

    let userProdObj=await userCartCollection.findOne({username:username});
     
    //console.log(userProdObj)

    if(userProdObj==null)
    {
        let arts=[];
        //console.log(artObj)
        arts.push(artObj);
        //console.log("ARTS==",arts)

        await allArtsCollection.insertOne(artObj);

        let newUserProductObj={username:username,arts:arts}

        //console.log("USER ART OBJECT== ",newUserProductObj)

       await userCartCollection.insertOne(newUserProductObj)

        res.send({message:"newly arts added to cart"})
    }
   else
   {
        userProdObj.arts.push(artObj)

        await allArtsCollection.insertOne(artObj);

        await userCartCollection.updateOne({username:username},{$set:{...userProdObj}})
       res.send({message:"arts added to cart"})   
   }
      
}))





userApi.get('/get-art-products/:username',expressAsyncHandler(async (req,res)=>{
      
    let username=req.params.username;
    
    let userCartCollection=req.app.get("userCartCollection")

    let userProdObj=await userCartCollection.findOne({username:username});

    if(userProdObj==null)
    {
        res.send({message:"userarts empty"})

    }
    else{
        let Cartproducts=userProdObj.arts;
        res.send({message:"cart products",products:Cartproducts})
    }
    
} ))  





userApi.post("/add-to-cart/:username",expressAsyncHandler(async (req,res)=>{
 
    let cartObj=req.body;

    console.log("CART OBJECT == = ",cartObj)
 
    let username=req.params.username;

    let userCartCollection1=req.app.get("userCartCollection1")

    let userProdObj=await userCartCollection1.findOne({username:username});
     
    console.log("NULL == ",userProdObj)

    if(userProdObj==null)
    {
        let Cart=[];
       // console.log(artObj)
        Cart.push(cartObj);
        //console.log("ARTS==",arts)

        let newUserProductObj={username:username,Cart:Cart}

        //console.log("USER ART OBJECT== ",newUserProductObj)

       await userCartCollection1.insertOne(newUserProductObj)

        res.send({message:"newly arts added to cart"})
    }
   else
   {
        userProdObj.Cart.push(cartObj);

        console.log(userProdObj.Cart);

        await userCartCollection1.updateOne({username:username},{$set:{...userProdObj}})
      
        res.send({message:"arts added to cart"})   
   }
      
}))





userApi.get('/get-cart-products/:username',expressAsyncHandler(async (req,res)=>{
      
    let username=req.params.username;
    
    let userCartCollection1=req.app.get("userCartCollection1")

    let userProdObj=await userCartCollection1.findOne({username:username});

    if(userProdObj==null)
    {
        res.send({message:"usercart empty"})

    }
    else{
        let Cartproducts=userProdObj.Cart;
        res.send({message:"cart products",products:Cartproducts})
    }
    
} ))  











// userApi.post("/add-arts/:username",expressAsyncHandler(async (req,res,next)=>{
 
//     let art= req.body;
    
//     let un = req.params.username;

//     let userCollectionObject=req.app.get("userCollectionObj")
 
//     let userOfDB=await userCollectionObject.findOne({username:newUserObj.username})
  
//     if()

// }))



module.exports=userApi 