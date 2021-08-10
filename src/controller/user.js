const userModel = require("../models/user");

module.exports = {
  register: (req, res) => {
    const { body } = req;
    const newBody = {
      ...body,
      UserCreatedAt: new Date(Date.now()),
      UserModifiedAt: new Date(Date.now()),
    };
    userModel
      .register(newBody)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(err.status).json(err);
      });
  },

  login: (req, res) => {
    const { body } = req;
    userModel
      .login(body)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  updateUser: (req, res) => {
    const id = req.decodedToken.UserID;
    const { body } = req;

    const newBody = {
      ...body,
      UserModifiedAt: new Date(Date.now()),
      UserModifiedBy: id,
    };

    userModel
      .updateUser(id, newBody)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
