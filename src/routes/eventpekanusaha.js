const eventpekanusahaRouter = require("express").Router();
const eventpekanusahaController = require("../controller/eventpekanusaha");

eventpekanusahaRouter.post("/", eventpekanusahaController.postEventUsaha);
eventpekanusahaRouter.get("/", eventpekanusahaController.getEventUsaha);
eventpekanusahaRouter.put("/", eventpekanusahaController.putEventUsaha);
eventpekanusahaRouter.put("/", eventpekanusahaController.deleteEventUsaha);

module.exports = eventpekanusahaRouter;
