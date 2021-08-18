const {
  getAlllData,
  getDataById,
  getDataCount,
  getBusinessById,
  getQusetionId,
  getEvaluationScore,
  getAlllDataByPhase,
  getDataCountByPhase,
} = require("./model");
const helper = require("../../helpers/wrapper");

const getTotalScore = async (phase, pekanUsahaId) => {
  try {
    let totalScore = 0;
    let questionID = await getQusetionId(phase);
    if (questionID.length === 0) {
      return -1;
    }
    questionID = questionID.map((e) => {
      return e["QuestionID"];
    });

    const evaluationScore = await getEvaluationScore(questionID, pekanUsahaId);
    if (evaluationScore.length === 0) {
      return -1;
    }
    evaluationScore.map((e) => {
      totalScore += e["EvaluationScore"];
    });

    return totalScore;
  } catch (error) {
    console.log(error);
    return -1;
  }
};

module.exports = {
  getAll: async (req, res) => {
    try {
      let { page, limit, sort, keywords } = req.query;

      limit = limit || "5";
      page = page || "1";
      keywords = keywords ? "%" + keywords + "%" : "%";
      sort = sort
        ? "PekanUsahaMemberName1 " + sort
        : "PekanUsahaMemberName1 ASC";

      page = parseInt(page);
      limit = parseInt(limit);
      const offset = page * limit - limit;

      const totalData = await getDataCount(keywords);
      console.log("Total Data " + totalData);
      const totalPage = Math.ceil(totalData / limit);
      console.log("Total Page " + totalPage);
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };

      const result = await getAlllData(limit, offset, keywords, sort);
      for (const item of result) {
        item.AdministrationScore = await getTotalScore(
          "Administration",
          item.PekanUsahaID
        );
        item.DemoDayScore = await getTotalScore("Demo Day", item.PekanUsahaID);
        item.BootcampScore = await getTotalScore("Bootcamp", item.PekanUsahaID);
        item.PitchingScore = await getTotalScore("Pitching", item.PekanUsahaID);
        item.BusinessInfo = await getBusinessById(item.BusinessID);
      }

      return helper.response(
        res,
        200,
        "Succes get all Bussines",
        result,
        pageInfo
      );
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  getAllByPhase: async (req, res) => {
    try {
      let { page, limit, sort, keywords, phase, tresh } = req.query;

      limit = limit || "5";
      page = page || "1";
      keywords = keywords ? "%" + keywords + "%" : "%";
      sort = sort
        ? "p.PekanUsahaMemberName1 " + sort
        : "p.PekanUsahaMemberName1 ASC";

      page = parseInt(page);
      limit = parseInt(limit);
      const offset = page * limit - limit;

      const totalData = await getDataCountByPhase(keywords, phase, tresh);
      console.log("Total Data " + totalData);
      const totalPage = Math.ceil(totalData / limit);
      console.log("Total Page " + totalPage);
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };

      const result = await getAlllDataByPhase(
        limit,
        offset,
        keywords,
        phase,
        tresh,
        sort
      );

      return helper.response(
        res,
        200,
        "Succes get all Bussines",
        result,
        pageInfo
      );
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },

  getByID: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await getDataById(id);
      result[0].BusinessInfo = await getBusinessById(result[0].BusinessID);

      return helper.response(res, 200, "Succes get by id", result);
    } catch (error) {
      console.log(error);
      return helper.response(res, 400, "Bad Request", error);
    }
  },
};
