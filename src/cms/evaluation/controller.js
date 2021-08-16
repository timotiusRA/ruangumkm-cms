const {
  addData,
  getAllQuestionSection,
  getQuestionChild,
  updateQuestion,
} = require("./model");
const helper = require("../../helpers/wrapper");

module.exports = {
  addEvaluation: async (req, res) => {
    try {
      const idUser = req.decodedToken.UserID;
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
};
