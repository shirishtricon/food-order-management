module.exports = (data) => {
  let newData = data.map((order) => {
    return {
      uuid: order.uuid,
      user_uuid: order.user_uuid,
      items: order.items,
      subtotal: order.subtotal,
      date: order.date,
    };
  });

  newData.forEach((user) => {
    user.items = JSON.parse(user.items);
  });
  const result = newData.map((order) => {
    const items = order.items.reduce((acc, item) => {
      const existingItem = acc.find((x) => x.name === item);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        acc.push({ name: item, quantity: 1 });
      }
      return acc;
    }, []);
    return { ...order, items };
  });
  console.log(result);
  return result;
};
