import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

export function readDB() {
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

export function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function updateDB(mutator) {
  const data = readDB();
  const result = mutator(data);
  writeDB(data);
  return result;
}

export function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
