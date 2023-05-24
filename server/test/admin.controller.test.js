const assert = require("assert");
const sinon = require("sinon");
const bcrypt = require("bcrypt");
const adminController = require("../Controllers/admin.controller");
const adminService = require("../Services").adminService;

describe("Admin Controller", () => {
  describe("addAdmin", () => {
    it("should add a new admin with hashed password", async () => {
      const req = {
        body: {
          email: "admin@example.com",
          password: "password123",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const hashStub = sinon.stub(bcrypt, "hash").resolves("hashedPassword");
      const addAdminStub = sinon
        .stub(adminService, "addAdmin")
        .resolves({ id: "adminId" });

      await adminController.addAdmin(req, res);

      sinon.assert.calledOnce(hashStub);
      sinon.assert.calledWith(hashStub, "password123", 5);
      sinon.assert.calledOnce(addAdminStub);
      sinon.assert.calledWith(addAdminStub, {
        email: "admin@example.com",
        password: "hashedPassword",
      });
      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, { id: "adminId" });

      hashStub.restore();
      addAdminStub.restore();
    });

    it("should handle internal server error", async () => {
      const req = {
        body: {
          email: "admin@example.com",
          password: "password123",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const error = new Error("Database error");
      sinon.stub(bcrypt, "hash").rejects(error);
      sinon.stub(adminService, "addAdmin").rejects(error);

      await adminController.addAdmin(req, res);

      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, { message: "Internal Server Error" });

      bcrypt.hash.restore();
      adminService.addAdmin.restore();
    });
  });

  describe("getAllAdmin", () => {
    it("should return all admin records", async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const getAllAdminStub = sinon
        .stub(adminService, "getAllAdmin")
        .resolves([{ id: "admin1" }, { id: "admin2" }]);

      await adminController.getAllAdmin(req, res);

      sinon.assert.calledOnce(getAllAdminStub);
      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, [{ id: "admin1" }, { id: "admin2" }]);

      getAllAdminStub.restore();
    });

    it("should handle internal server error", async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const error = new Error("Database error");
      sinon.stub(adminService, "getAllAdmin").rejects(error);

      await adminController.getAllAdmin(req, res);

      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, { message: "Internal Server Error" });

      adminService.getAllAdmin.restore();
    });
  });

  describe("getAdminByEmail", () => {
    it("should return admin data by email", async () => {
      const email = "admin@example.com";
      const expectedData = { id: "adminId", email: "admin@example.com" };
      sinon.stub(adminService, "getAdminByEmail").resolves(expectedData);

      const data = await adminController.getAdminByEmail(email);

      assert.deepStrictEqual(data, expectedData);

      adminService.getAdminByEmail.restore();
    });
  });

  describe("updateAdmin", () => {
    it("should update an admin successfully", async () => {
      const req = {
        params: {
          uuid: "adminUuid",
        },
        body: {
          email: "newadmin@example.com",
          password: "newpassword123",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const hashStub = sinon.stub(bcrypt, "hash").resolves("newHashedPassword");
      const updateAdminStub = sinon.stub(adminService, "updateAdmin");
      const expectedUuid = "adminUuid";
      const expectedAdmin = {
        email: "newadmin@example.com",
        password: "newHashedPassword",
      };

      await adminController.updateAdmin(req, res);

      sinon.assert.calledOnce(updateAdminStub);
      sinon.assert.calledWith(updateAdminStub, expectedUuid, expectedAdmin);
      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, {
        message: "admin Updated Successfully!",
      });

      hashStub.restore();
      updateAdminStub.restore();
    });

    it("should handle bad request when uuid is missing or body contains uuid", async () => {
      const req = {
        params: {
          uuid: null, // Missing uuid
        },
        body: {
          uuid: "adminUuid", // Body contains uuid
          email: "newadmin@example.com",
          password: "newpassword123",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const updateAdminStub = sinon.stub(adminService, "updateAdmin");

      await adminController.updateAdmin(req, res);

      sinon.assert.notCalled(updateAdminStub);
      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, { message: "Bad Request!" });

      updateAdminStub.restore();
    });

    it("should handle internal server error", async () => {
      const req = {
        params: {
          uuid: "adminUuid",
        },
        body: {
          email: "newadmin@example.com",
          password: "newpassword123",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const error = new Error("Database error");
      sinon.stub(bcrypt, "hash").rejects(error);
      sinon.stub(adminService, "updateAdmin").rejects(error);

      await adminController.updateAdmin(req, res);

      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, { message: "Internal Server Error" });

      bcrypt.hash.restore();
      adminService.updateAdmin.restore();
    });
  });

  describe("deleteAdmin", () => {
    it("should delete an admin successfully", async () => {
      const req = {
        params: {
          uuid: "adminUuid",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const deleteAdminStub = sinon.stub(adminService, "deleteAdmin");

      await adminController.deleteAdmin(req, res);

      sinon.assert.calledOnce(deleteAdminStub);
      sinon.assert.calledWith(deleteAdminStub, "adminUuid");
      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, {
        message: "admin Deleted Successfully!",
      });

      deleteAdminStub.restore();
    });

    it("should handle internal server error", async () => {
      const req = {
        params: {
          uuid: "adminUuid",
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const error = new Error("Database error");
      sinon.stub(adminService, "deleteAdmin").rejects(error);

      await adminController.deleteAdmin(req, res);

      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledOnce(res.json);
      sinon.assert.calledWith(res.json, { message: "Internal Server Error" });

      adminService.deleteAdmin.restore();
    });
  });
});
