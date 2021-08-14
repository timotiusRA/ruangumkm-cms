const { getAlllData, getDataCount, getBusinessById } = require("./model");
const helper = require("../../helpers/wrapper");

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
};
