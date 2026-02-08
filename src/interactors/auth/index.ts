import { RESPONSE_MESSAGES } from "@helpers";
import { UsersServices } from "@services";
import {  compareSync } from "bcrypt";
import { userAttributes } from "models/user";

export const loginUser = (options: Pick<userAttributes, "email" | "password_hash">,request:any): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email } = options;

      const result = await UsersServices.find({
         email
      });
      
      if(!result || !result.password_hash || !options.password_hash || !compareSync(options.password_hash, result.password_hash)){
        
        return reject({ 
            ...globalThis.status_codes?.un_authorised,
            message: RESPONSE_MESSAGES.INVALID_CREDENTIALS });
      }

      const token = request.server.jwt.sign({
          user_id: result?.id,
        },{expiresIn: '1d'});

const refresh_token = request.server.jwt.sign({
          user_id: result?.id,
        },{expiresIn: '7d'});

      return resolve({ ...result, access_token:token,refresh_token:refresh_token });
    } catch (error: any) {
      return reject(error);
    }
  });
};


// const generateHashedPassword = (password: string): string => {
//   const salt = genSaltSync(10);
//   return hashSync(password, salt);
// };