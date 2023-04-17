const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const authorisation= ([permittedRole])=>{

    return async(req,res,next)=>{
        const {userRole}=req.cookies
        // const user_role =req.role
        console.log(userRole);
        if(permittedRole.includes(userRole)){
            next()
        }else{
            return res.send("Unathorization")
        }

    }
}
module.exports={
    authorisation
}