const db = require("../../configs/mySQL");

module.exports = {
  getAllQuestionSection: (phase, status) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM question WHERE QuestionPhase = ? AND QuestionStatus = ? AND ParentID = 0`,
        [phase, status],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  getQuestionChild: (parentId, status) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM question WHERE ParentID = ? AND QuestionStatus = ?`,
        [parentId, status],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  addData: (newBody) => {
    return new Promise((resolve, reject) => {
      const qs = `INSERT INTO question SET ? `;
      db.query(qs, newBody, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  updateQuestion: (newBody, id) => {
    return new Promise((resolve, reject) => {
      const qs = "UPDATE question SET ? WHERE QuestionID = ?";
      db.query(qs, [newBody, id], (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
};
