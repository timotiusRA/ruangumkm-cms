const {
  addData,
  getAllQuestionSection,
  getQuestionChild,
  updateQuestion,
} = require("./model");
const helper = require("../../helpers/wrapper");

module.exports = {
  addQuestion: async (req, res) => {
    try {
      const idUser = req.decodedToken ? req.decodedToken.UserID : 1;
      if (req.body.QuestionStatus === "Publish") {
        req.body.QuestionPublishedAt = new Date(Date.now());
        req.body.QuestionPublishedBy = idUser;
      }
      req.body.QuestionAuthorID = idUser;
      req.body.QuestionCreatedBy = idUser;
      // console.log(req.body);

      const result = await addData(req.body);
      return helper.response(res, 200, "Succes add Question", result);
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  getQuestion: async (req, res) => {
    try {
      const { phase, status } = req.query;

      const result = await getAllQuestionSection(phase, status);
      for (const item of result) {
        item.child = await getQuestionChild(item.QuestionID, status);
      }
      return helper.response(res, 200, "Succes get Question", result);
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  updateQuestion: async (req, res) => {
    try {
      const idUser = req.decodedToken ? req.decodedToken.UserID : 1;
      const { id } = req.params;
      req.body.QuestionModifiedAt = new Date(Date.now());
      req.body.QuestionModifiedBy = idUser;

      if (req.body.QuestionStatus === "Publish") {
        req.body.QuestionPublishedAt = Date(Date.now());
        req.body.QuestionPublishedBy = idUser;
      }

      const result = await updateQuestion(req.body, id);
      return helper.response(res, 200, "Succes update Question", result);
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
