const cartModel = require("../models/cart");

module.exports = {
  addCart: (req, res) => {
    const { body } = req;
    const idUser = req.decodedToken.UserID;
    const id = {
      UserID: idUser,
    };

    cartModel
      .addCart(body, id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  deleteCart: (req, res) => {
    const { id } = req.params;
    cartModel
      .deleteCart(id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  getCart: (req, res) => {
    // const idUser = req.decodedToken.UserID;
    // cartModel
    //   .getCart(idUser)
    //   .then((result) => {
    //     res.json(result);
    //   })
    //   .catch((err) => {
    //     res.json(err);
    //   });
  },
  getCartById: (req, res) => {
    const id = req.decodedToken.UserID;

    cartModel
      .getCartById(id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
