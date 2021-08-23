const db = require("../../configs/mySQL");

module.exports = {
  getAllQuestionSection: (phase, status) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM question WHERE QuestionPhase = ? AND QuestionStatus = ?`,
        [phase, status],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  getQuestionChild: (parentId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM question WHERE ParentID = ?`,
        parentId,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  addData: (newBody) => {
    return new Promise((resolve, reject) => {
      const qs = `INSERT INTO evaluation SET ? `;
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

  addPassingGrade: (newBody) => {
    return new Promise((resolve, reject) => {
      const qs = `INSERT INTO passing_grade SET ? `;
      db.query(qs, newBody, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  updatePassingGrade: (newBody, id) => {
    return new Promise((resolve, reject) => {
      const qs = "UPDATE passing_grade SET ? WHERE PassingGradeID = ?";
      db.query(qs, [newBody, id], (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  getAllPassingGrade: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM passing_grade`, (error, result) => {
        !error ? resolve(result) : reject(new Error(error));
      });
    });
  },
};
