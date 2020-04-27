"use strict";

const db = require("../db");
const DataTypes = db.Sequelize;

module.exports = db.define(
  "artist",
  {
    name: {
      type: DataTypes.STRING(1e4),
      allowNull: false,
      set: function (val) {
        this.setDataValue("name", val.trim());
      },
    },
  },
  {
    instanceMethods: {
      getAlbums: function () {
        return db
          .model("album")
          .scope("defaultScope", "populated")
          .findAll({
            include: [
              {
                model: db.model("song"),
                include: [
                  {
                    model: db.model("artist"),
                    where: { id: this.id },
                  },
                ],
              },
            ],
          });
      },
      toJSON: function () {
        return Object.assign({}, this.get());
      },
    },
  }
);
