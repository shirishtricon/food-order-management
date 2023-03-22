const ifArrayEqual = (data, existData) => {
  const areArraysEqual =
    data.length === existData.length &&
    data.every((obj, index) => obj.name === existData[index].name);
  return areArraysEqual;
};

module.exports = { ifArrayEqual };
