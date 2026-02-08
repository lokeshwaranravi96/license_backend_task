import { CommonGetOptions } from "@types";
import { license } from "models/license";

class LicensesServices {
  static findAll(options: CommonGetOptions): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
     
        const {offset,limit}=options

     const [totalCount, rows] = await Promise.all([
  license.count({
    where: {
      status_id: 1,
    },
  }),
  license.findAll({
       offset,
    limit,
    order: [["created_at", "DESC"]],
  }),
]);

  return  resolve({  rows,  totalCount})
      } catch (error: any) {
        console.error("Error in LicensesService.find:", error);
       return reject(error.message);
      }
    });
  }


  
}

export { LicensesServices };
