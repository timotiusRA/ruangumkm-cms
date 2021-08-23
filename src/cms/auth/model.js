const db = require("../../configs/mySQL");

module.exports = {
  getDataCondition: (data) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users WHERE ?", data, (error, result) => {
        if (!error) {
          db.query(
            "SELECT RoleName FROM roles WHERE RoleID = ?",
            result[0].RoleID,
            (err, res) => {
              if (!err) {
                result[0].RoleName = res[0].RoleName;
                resolve(result);
              } else {
                reject(new Error(err));
              }
            }
          );
        } else {
          reject(new Error(error));
        }
      });
    });
  },
};
