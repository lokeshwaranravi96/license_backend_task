

class users {
  async login(options) {
    return new Promise(async (resolve, reject) => {
      try {
        const {username,password}= options;

        ///  check in database for user with username and password
        return resolve(true)
        // Simulate task creation logic
      } catch (error) {
        return reject({
          success: false,
          message: "Error creating task",
          error: error,
        });
      } 
  });
  
}}

export const userServices = new users();
