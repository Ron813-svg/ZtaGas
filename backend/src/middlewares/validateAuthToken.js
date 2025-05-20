import  jsonwebtoken  from "jsonwebtoken"
import  { config } from '../config.js'

export const validateAuthToken = (allowebUserTypes = []) => {
    return (req, res, next)=>{
        try {
            const {authToken} = req.cookies
            
            if (!authToken)  return res.json({message: 'cookies not found, you must login'})
                
                const decoded = jsonwebtoken.verify(authToken, config.JWT.secret)

            req.user = decoded

            if(!allowebUserTypes.includes(decoded.userType)){
                return res.json({message: 'Access denied'})
            }

        } catch (error) {
            console.log('error: '+error)
        }
    }
}