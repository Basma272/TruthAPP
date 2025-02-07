export const sucssesResponse=({message,status,data,res}={})=>{
    return res.status(status||200).json({successMessage:message,data})
}
