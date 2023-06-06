const checkForNonEmptyLastName = (data) => {
  let newData = data.map((item) => {
    return {
      uuid: item.uuid,
      emp_id: item.emp_id,
      name: item.last_name
        ? item.first_name + " " + item.last_name
        : item.first_name,
    };
  });
  console.log(newData);
  return newData;
};

module.exports = { checkForNonEmptyLastName };
