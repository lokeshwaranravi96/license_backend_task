
import { userLogin } from "../../../../../interactors/users/index.js";

export const loginHandler = async (req, reply) => {
  return new Promise(async(resolve,reject)=>{
    try {
      const user = req.user;
      
      const {username,password } = req.body;
  
      // Call the interactor to create a task
      const result = await userLogin({ username,password });
  
      if (result.success) {

        return resolve({
          data:[],
           ...globalThis.status_codes.success, // spread global status code
            message: "User logged in successfully!",
        })
      
      } 
    } catch (error) {
      console.error("Error logging in user:", error);
      return reject(error)
    }
  })
};
