import { createConnection } from "net";
import mysql from "mysql2/promise";
import { ConnectionOptions } from "tls";
import BusinessService from "../business.service";

let mockQuery = jest.fn();
const mockConfig = {
  host: "localhost",
  user: "mock",
  password: "mock",
  database: "mock",
};
jest.mock("mysql2/promise", () => ({
  createConnection: () =>
    Promise.resolve({
      query: mockQuery,
    }),
}));

describe("business service", () => {
  let service: BusinessService;
  beforeEach(async () => {
    mockQuery = jest.fn();
    service = new BusinessService(await mysql.createConnection(mockConfig));
  });

  it("should call query with parameters", async () => {
    mockQuery.mockResolvedValue(["results", "data"]);
    const response = await service.getByDistance("1", "2", "3", "cafe");
    expect(response).toEqual("results");
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining(
        "SELECT *, ST_Distance_Sphere(point(1, 2), point(longitude, latitude)) as distance"
      )
    );
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("FROM  businesses")
    );
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("WHERE type='cafe'")
    );
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("ORDER BY distance ASC")
    );
    expect(mockQuery).toHaveBeenCalledWith(expect.stringContaining("LIMIT 3"));
  });

  it("should not call null params", async () => {
    mockQuery.mockResolvedValue(["results", "data"]);
    await service.getByDistance("1", "2", null, null);
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining(
        "SELECT *, ST_Distance_Sphere(point(1, 2), point(longitude, latitude)) as distance"
      )
    );
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("FROM  businesses")
    );
    expect(mockQuery).not.toHaveBeenCalledWith(
      expect.stringContaining("WHERE type='cafe'")
    );
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringContaining("ORDER BY distance ASC")
    );
    expect(mockQuery).not.toHaveBeenCalledWith(
      expect.stringContaining("LIMIT 3")
    );
  });
});
