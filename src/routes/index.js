const express = require("express");
const mainRouter = express.Router();

const WelcomeRouter = require("./welcome");
const userRouter = require("./user");
const tagRouter = require("./tag");
const organizerRouter = require("./organizer");
const eventRouter = require("./event");
const eventtagRouter = require("./eventtag");
const categoriesRouter = require("./categories");
const tiketRouter = require("./tiket");
const cartRouter = require("./cart");
const eventorderRouter = require("./eventorder");
const businessRouter = require("./business");
const pekanusahaRouter = require("./pekanusaha");
const businessmatchingRouter = require("./businessmatching");

const cmsPekanUsahaRouter = require("../cms/pekanusaha/route");
const cmsQuestionRouter = require("../cms/question/route");
const cmsEvaluationRouter = require("../cms/evaluation/route");
const cmsAuthRouter = require("../cms/auth/route");

mainRouter.use("/", WelcomeRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/tag", tagRouter);
mainRouter.use("/organizer", organizerRouter);
mainRouter.use("/event", eventRouter);
mainRouter.use("/eventtag", eventtagRouter);
mainRouter.use("/categories", categoriesRouter);
mainRouter.use("/tiket", tiketRouter);
mainRouter.use("/cart", cartRouter);
mainRouter.use("/eventorder", eventorderRouter);
mainRouter.use("/business", businessRouter);
mainRouter.use("/pekanusaha", pekanusahaRouter);
mainRouter.use("/businessmatching", businessmatchingRouter);

mainRouter.use("/cms/auth", cmsAuthRouter);
mainRouter.use("/cms/pekanusaha", cmsPekanUsahaRouter);
mainRouter.use("/cms/question", cmsQuestionRouter);
mainRouter.use("/cms/eval", cmsEvaluationRouter);

module.exports = mainRouter;
