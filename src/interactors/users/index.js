import { userServices } from "../../services/index.js";


export const userLogin = async (options) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await userServices.login(options);
    return  resolve(result);
    } catch (error) {
    return  reject(error);
    }
  });
};
