const categoriesRouter = require("express").Router();
const categoriesController = require("../controller/categories");

categoriesRouter.post("/", categoriesController.addCategories);
categoriesRouter.get("/", categoriesController.getCategories);
categoriesRouter.put("/:id", categoriesController.updateCategories);
categoriesRouter.delete("/:id", categoriesController.deleteCategories);

module.exports = categoriesRouter;
