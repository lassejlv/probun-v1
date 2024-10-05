import { test, expect } from "bun:test";
import { Probun, logger } from "./src";

let server: any;

test("Server starts", () => {
  server = Probun({
    port: 3000,
    routes: "routes",
    onReady: ({ port }) => console.log(`Server is running on ${port}`),
    middlewares: [logger],
  });
  expect(server).toBeDefined();
});

test("GET request", async () => {
  await fetch("http://localhost:3000").then((res) => {
    expect(res.status).toBe(200);
  });
});

test("POST request", async () => {
  await fetch("http://localhost:3000", {
    method: "POST",
    body: JSON.stringify({ name: "John" }),
  }).then(async (res) => {
    const resJ = await res.json();
    expect(resJ).toEqual({ name: "John" });
  });
});

test("PUT request", async () => {
  await fetch("http://localhost:3000", {
    method: "PUT",
  }).then(async (res) => {
    const resJ = await res.json();
    expect(resJ).toEqual({ message: "PUT request" });
  });
});

test("DELETE request", async () => {
  await fetch("http://localhost:3000", {
    method: "DELETE",
  }).then(async (res) => {
    const resJ = await res.json();
    expect(resJ).toEqual({ message: "DELETE request" });
  });
});
