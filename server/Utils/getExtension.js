const path = require("path");

function getFileExtension(filename) {
  var ext = path.extname(filename || "").split(".");
  return ext[ext.length - 1];
}

module.exports = { getFileExtension };
