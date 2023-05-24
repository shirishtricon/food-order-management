const assert = require("assert");
const sinon = require("sinon");
const categoryController = require("../Controllers/category.controller");
const categoryService = require("../Services").categoryService;

describe("Category Controller", () => {
  describe("getAllCategories", () => {
    it("should return all categories", async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const expectedData = [
        { id: "1", name: "Category 1" },
        { id: "2", name: "Category 2" },
      ];
      sinon.stub(categoryService, "getAllCategories").resolves(expectedData);

      await categoryController.getAllCategories(req, res);

      sinon.assert.calledOnce(categoryService.getAllCategories);
      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, expectedData);

      categoryService.getAllCategories.restore();
    });

    it("should handle internal server error", async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const error = new Error("Database error");
      sinon.stub(categoryService, "getAllCategories").rejects(error);

      await categoryController.getAllCategories(req, res);

      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, { message: "Internal Server Error" });

      categoryService.getAllCategories.restore();
    });
  });

  describe("addCategory", () => {
    it("should add a new category", async () => {
      const req = {
        body: {
          categoryName: "New Category",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const expectedData = { id: "1", name: "New Category" };
      sinon.stub(categoryService, "addCategory").resolves(expectedData);

      await categoryController.addCategory(req, res);

      sinon.assert.calledOnce(categoryService.addCategory);
      sinon.assert.calledWith(categoryService.addCategory, "New Category");
      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, expectedData);

      categoryService.addCategory.restore();
    });

    it("should handle internal server error", async () => {
      const req = {
        body: {
          categoryName: "New Category",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const error = new Error("Database error");
      sinon.stub(categoryService, "addCategory").rejects(error);

      await categoryController.addCategory(req, res);

      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, { message: "Internal Server Error" });

      categoryService.addCategory.restore();
    });
  });

  describe("updateCategory", () => {
    it("should update a category successfully", async () => {
      const req = {
        params: {
          uuid: "categoryUuid",
        },
        body: {
          name: "Updated Category",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const expectedUuid = "categoryUuid";
      const expectedData = { id: "1", name: "Updated Category" };
      sinon.stub(categoryService, "updateCategory").resolves(expectedData);

      await categoryController.updateCategory(req, res);

      sinon.assert.calledOnce(categoryService.updateCategory);
      sinon.assert.calledWith(
        categoryService.updateCategory,
        expectedUuid,
        req.body
      );
      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, {
        message: "Category Updated Successfully!",
      });

      categoryService.updateCategory.restore();
    });

    it("should handle bad request when uuid is missing or body contains uuid", async () => {
      const req = {
        params: {
          uuid: null, // Missing uuid
        },
        body: {
          uuid: "categoryUuid", // Body contains uuid
          name: "Updated Category",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(categoryService, "updateCategory");

      await categoryController.updateCategory(req, res);

      sinon.assert.notCalled(categoryService.updateCategory);
      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, { message: "Bad Request!" });

      categoryService.updateCategory.restore();
    });

    it("should handle internal server error", async () => {
      const req = {
        params: {
          uuid: "categoryUuid",
        },
        body: {
          name: "Updated Category",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const error = new Error("Database error");
      sinon.stub(categoryService, "updateCategory").rejects(error);

      await categoryController.updateCategory(req, res);

      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, { message: "Internal Server Error" });

      categoryService.updateCategory.restore();
    });
  });

  describe("deleteCategory", () => {
    it("should delete a category successfully", async () => {
      const req = {
        params: {
          uuid: "categoryUuid",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      sinon.stub(categoryService, "deleteCategory");

      await categoryController.deleteCategory(req, res);

      sinon.assert.calledOnce(categoryService.deleteCategory);
      sinon.assert.calledWith(categoryService.deleteCategory, "categoryUuid");
      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, {
        message: "Category deleted successfully!",
      });

      categoryService.deleteCategory.restore();
    });

    it("should handle internal server error", async () => {
      const req = {
        params: {
          uuid: "categoryUuid",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const error = new Error("Database error");
      sinon.stub(categoryService, "deleteCategory").rejects(error);

      await categoryController.deleteCategory(req, res);

      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, { message: "Internal Server Error" });

      categoryService.deleteCategory.restore();
    });
  });
});
