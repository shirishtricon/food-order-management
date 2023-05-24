const { expect } = require("chai");
const sinon = require("sinon");
const returnItemQuantity = require("../Utils/returnItemQuantity");
const { orderService } = require("../Services");
const orderController = require("../Controllers/order.controller");

describe("returnItemQuantity", () => {
  it("should return modified data with item quantities", () => {
    const data = [
      {
        uuid: "1",
        user_uuid: "user1",
        items: '["Item 1", "Item 2", "Item 1"]',
        subtotal: 100,
        date: "2023-05-22",
      },
      {
        uuid: "2",
        user_uuid: "user2",
        items: '["Item 3", "Item 3", "Item 4", "Item 4"]',
        subtotal: 200,
        date: "2023-05-23",
      },
    ];

    const expectedResult = [
      {
        uuid: "1",
        user_uuid: "user1",
        items: [
          { name: "Item 1", quantity: 2 },
          { name: "Item 2", quantity: 1 },
        ],
        subtotal: 100,
        date: "2023-05-22",
      },
      {
        uuid: "2",
        user_uuid: "user2",
        items: [
          { name: "Item 3", quantity: 2 },
          { name: "Item 4", quantity: 2 },
        ],
        subtotal: 200,
        date: "2023-05-23",
      },
    ];

    const result = returnItemQuantity(data);

    expect(result).to.deep.equal(expectedResult);
  });

  it("should handle internal server error", async () => {
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const error = new Error("Database error");
    sinon.stub(orderService, "getAllOrders").rejects(error);

    await orderController.getAllOrders(req, res);

    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, { message: "Internal Server Error" });

    orderService.getAllOrders.restore();
  });
});

describe("getSingleUserOrders", () => {
  it("should return orders for a single user with item quantities", async () => {
    const req = {
      params: { uuid: "user1" },
      query: { fromDate: "2023-01-01", toDate: "2023-12-31" },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const data = [
      {
        uuid: "1",
        user_uuid: "user1",
        items: '["Item 1", "Item 2", "Item 1"]',
        subtotal: 100,
        date: "2023-05-22",
      },
      {
        uuid: "2",
        user_uuid: "user1",
        items: '["Item 3", "Item 3", "Item 4", "Item 4"]',
        subtotal: 200,
        date: "2023-05-23",
      },
    ];
    const expectedResult = [
      {
        uuid: "1",
        user_uuid: "user1",
        items: [
          { name: "Item 1", quantity: 2 },
          { name: "Item 2", quantity: 1 },
        ],
        subtotal: 100,
        date: "2023-05-22",
      },
      {
        uuid: "2",
        user_uuid: "user1",
        items: [
          { name: "Item 3", quantity: 2 },
          { name: "Item 4", quantity: 2 },
        ],
        subtotal: 200,
        date: "2023-05-23",
      },
    ];
    sinon.stub(orderService, "getSingleOrder").resolves(data);

    const result = returnItemQuantity(data);

    expect(result).to.deep.equal(expectedResult);
    sinon.assert.calledOnce(orderService.getSingleOrder);
    sinon.assert.calledWith(
      orderService.getSingleOrder,
      req.params.uuid,
      req.query.fromDate,
      req.query.toDate
    );
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, expectedResult);

    orderService.getSingleOrder.restore();
  });

  it("should handle no transactions found for the user", async () => {
    const req = {
      params: { uuid: "user1" },
      query: { fromDate: "2023-01-01", toDate: "2023-12-31" },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const data = [];
    sinon.stub(orderService, "getSingleOrder").resolves(data);

    await orderController.getSingleUserOrders(req, res);

    sinon.assert.calledOnce(orderService.getSingleOrder);
    sinon.assert.calledWith(
      orderService.getSingleOrder,
      req.params.uuid,
      req.query.fromDate,
      req.query.toDate
    );
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, {
      message: "No transactions found for the user",
    });

    orderService.getSingleOrder.restore();
  });

  it("should handle internal server error", async () => {
    const req = {
      params: { uuid: "user1" },
      query: { fromDate: "2023-01-01", toDate: "2023-12-31" },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const error = new Error("Database error");
    sinon.stub(orderService, "getSingleOrder").rejects(error);

    await orderController.getSingleUserOrders(req, res);

    sinon.assert.calledOnce(orderService.getSingleOrder);
    sinon.assert.calledWith(
      orderService.getSingleOrder,
      req.params.uuid,
      req.query.fromDate,
      req.query.toDate
    );
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, { message: "Internal Server Error" });

    orderService.getSingleOrder.restore();
  });
});
