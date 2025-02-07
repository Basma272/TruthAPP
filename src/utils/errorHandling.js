
export const asyncHandling=(fn)=>{
    return(req,res,next)=>{
            return fn(req,res,next).catch(error=>{
               return next( new Error(error,{cause:500}))
            })
        
    } 
   
}

export const GlopalErrorHanling=(error,req,res,next)=>{
        if( process.env.MOOD="dev" ){
                return res.status(error.cause||400).json({
            messag:error.message,stack:error.stack})

        }
        return res.status(error.cause||400).json({
            messag:error.message})




 
 
    }
 
  




