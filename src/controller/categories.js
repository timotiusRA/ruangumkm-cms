const categoriesModel = require("../models/categories");
const slug = require("slug");

module.exports = {
  addCategories: (req, res) => {
    const { body } = req;
    const newBody = {
      ...body,
      CategorySlug: slug(body.CategorySlug),
      CategoryCreatedAt: new Date(Date.now()),
      CategoryModifiedAt: new Date(Date.now()),
    };
    categoriesModel
      .addCategories(newBody)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  getCategories: (req, res) => {
    categoriesModel
      .getCategories()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  updateCategories: (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const newBody = {
      ...body,
      CategorySlug: slug(body.CategorySlug),
      CategoryModifiedAt: new Date(Date.now()),
    };
    categoriesModel
      .updateCategories(newBody, id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  deleteCategories: (req, res) => {
    const { id } = req.params;
    categoriesModel
      .deleteCategories(id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
