const removeEmptyProperty = (data) => {
  for (const property in data) {
    if (data[property] === "") {
      delete data[property];
    }
  }
  return data;
};

module.exports = { removeEmptyProperty };
