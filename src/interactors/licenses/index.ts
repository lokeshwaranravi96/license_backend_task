
import { CommonGetOptions } from "@types";
import { LicensesServices } from "services/licenses";

export const licensesList = (options: CommonGetOptions): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await LicensesServices.findAll(options);
    
      return resolve(result);
    } catch (error: any) {
      return reject(error);
    }
  });
};
