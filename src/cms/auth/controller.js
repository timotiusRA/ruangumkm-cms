const { getDataCondition } = require("./model");
const helper = require("../../helpers/wrapper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  login: async (req, res) => {
    try {
      const { UserEmail, UserPassword } = req.body;
      // console.log('BODY', req.body)
      const checkEmailUser = await getDataCondition({
        UserEmail,
      });
      if (checkEmailUser.length === 0) {
        return helper.response(res, 404, "User Not Found");
      }

      const checkPassword = bcrypt.compareSync(
        UserPassword,
        checkEmailUser[0].UserPassword
      );
      if (!checkPassword) {
        return helper.response(res, 400, "Wrong password");
      }

      const payload = {
        UserID: checkEmailUser[0].UserID,
        UserName: checkEmailUser[0].UserName,
        UserEmail: checkEmailUser[0].UserEmail,
        RoleName: checkEmailUser[0].RoleName,
      };
      const token = jwt.sign({ ...payload }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });

      return helper.response(res, 200, "Succes Login !", { ...payload, token });
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
