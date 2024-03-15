const router = require("express").Router();

router.get("/", (req, res)=>{
    const {username, name, password} = req.body;
    if(!!!username || !!!name || !!!password){
        return res.status(400).json(
            jsonResponse(400,{error:"Fields are requires"},)
        );
    }
    //crear usuario en la base de datos 
    res.status(200)
    .json(jsonResponse(200,{message:"User created successfully"}));
    res.send("signout");
});

module.exports = router;