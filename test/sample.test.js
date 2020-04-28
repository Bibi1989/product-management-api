const request = require("supertest");
const app = require("../dist/app");

describe("Post Endpoints", () => {
  it("should create a new post", async (done) => {
    const res = await request(app).get("/api/v1/projects");
    expect(res.status).tobe(200);

    done();
  });
  it("should create a new post", async (done) => {
    // const res = true;
    expect(true).tobe(true);

    done();
  });
  it("should create a new post", async (done) => {
    const data = {
      project_name: "Project One",
      project_identifier: "pro-one",
      description: "Project One",
      start_data: "Project One",
      end_date: "Project One",
    };
    const res = await request(app)
      .post("/api/v1/projects")
      .set("application/json")
      .send(data);
    expect(res.status).tobe(200);

    done();
  });
});
