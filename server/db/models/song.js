"use strict";

const _ = require("lodash");

const db = require("../db");
const DataTypes = db.Sequelize;

module.exports = db.define(
  "song",
  {
    name: {
      type: DataTypes.STRING(1e4),
      allowNull: false,
      set: function (val) {
        this.setDataValue("name", val.trim());
      },
    },
    genre: {
      type: DataTypes.STRING,
    },

    url: {
      type: DataTypes.STRING(1e4),
      allowNull: false,
    },
  },
  {
    defaultScope: {
      attributes: {
        include: ["albumId"],
      },
    },
    scopes: {
      populated: () => ({
        include: [
          {
            model: db.model("artist"),
          },
        ],
      }),
    },
    instanceMethods: {
      toJSON: function () {
        // overriding toJSON to prevent url from leaking to client
        // see https://github.com/sequelize/sequelize/issues/1462
        return _.omit(this.get(), ["url"]);
      },
    },
  }
);
