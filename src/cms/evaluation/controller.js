const {
  addData,
  addPassingGrade,
  updatePassingGrade,
  getAllPassingGrade,
} = require("./model");
const helper = require("../../helpers/wrapper");

module.exports = {
  addEvaluation: async (req, res) => {
    try {
      const idUser = req.decodedToken ? req.decodedToken.UserID : 1;
      req.body.JudgeID = idUser;
      req.body.EvaluationCreatedBy = idUser;
      req.body.EvaluationCreatedAt = new Date(Date.now());
      // console.log(req.body);

      const result = await addData(req.body);
      return helper.response(res, 200, "Succes add Evaluation", result);
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  addPassingGrade: async (req, res) => {
    try {
      const result = await addPassingGrade(req.body);
      return helper.response(res, 200, "Succes add Passing grade", result);
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  updatePassingGrade: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await updatePassingGrade(req.body, id);
      return helper.response(res, 200, "Succes update Passing grade", result);
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  getPassingGrade: async (req, res) => {
    try {
      const result = await getAllPassingGrade();
      return helper.response(res, 200, "Succes get all Passing grade", result);
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
