const db = require("../../configs/mySQL");

module.exports = {
  getAlllData: (limit, offset, keywords, sort) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM pekanusaha WHERE PekanUsahaMemberNIK1 LIKE ? ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [keywords, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  getAlllDataByPhase: (limit, offset, keywords, phase, tresh, sort) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM pekanusaha as p JOIN evaluation as e ON p.PekanUsahaID = e.PekanUsahaID WHERE e.EvaluationPhase = ? AND p.PekanUsahaMemberNIK1 LIKE ? AND e.EvaluationTotalScore > ? ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [phase, keywords, tresh, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM pekanusaha WHERE PekanUsahaID LIKE ?`,
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error));
        }
      );
    });
  },

  getDataCount: (keywords) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) AS total FROM pekanusaha WHERE PekanUsahaMemberNIK1 LIKE ?",
        keywords,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error));
        }
      );
    });
  },

  getDataCountByPhase: (keywords, phase, tresh) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) AS total FROM pekanusaha as p JOIN evaluation as e ON p.PekanUsahaID = e.PekanUsahaID WHERE e.EvaluationPhase = ? AND p.PekanUsahaMemberNIK1 LIKE ? AND e.EvaluationTotalScore > ?",
        [phase, keywords, tresh],
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error));
        }
      );
    });
  },

  getBusinessById: (id) => {
    return new Promise((resolve, reject) => {
      const qs = "SELECT * FROM business WHERE BusinessID = ?";
      db.query(qs, id, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(new Error(err));
        }
      });
    });
  },

  getQusetionId: (phase) => {
    return new Promise((resolve, reject) => {
      const qs =
        "SELECT QuestionID FROM question WHERE QuestionPhase = ? AND NOT(ParentID = 0)";
      db.query(qs, phase, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(new Error(err));
        }
      });
    });
  },

  getEvaluationScore: (collectId, pekanUsahaId) => {
    return new Promise((resolve, reject) => {
      const fisrtID = collectId.shift();
      let qs = `SELECT EvaluationScore FROM evaluation WHERE PekanUsahaID = ${pekanUsahaId} AND (QuestionID = ${fisrtID}`;
      if (collectId.length > 0) {
        for (const e of collectId) {
          qs += ` OR QuestionID = ${e}`;
        }
      }
      qs += ")";
      db.query(qs, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
