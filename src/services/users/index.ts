import { user, userAttributes } from "models/user";

class UsersServices {
  static find(options: Partial<Pick<userAttributes, "id" | "email">>): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
     

       let result= await user.findOne({
          where: {
           ...options
          },
          raw: true,
        });

  return  resolve(result)
      } catch (error: any) {
        console.error("Error in UsersService.find:", error);
       return reject(error.message);
      }
    });
  }


  
}

export { UsersServices };
