import fs from "fs";
import path from "path";

function getDbPath() {
  const possiblePaths = [
    path.join(process.cwd(), "data", "db.json"),
    path.join(process.cwd(), "smart-panel", "data", "db.json"),
    path.join(__dirname, "..", "data", "db.json"),
    path.join(__dirname, "..", "..", "data", "db.json"),
    path.resolve("data", "db.json")
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  // Fallback to standard path
  return path.join(process.cwd(), "data", "db.json");
}

export function readDB() {
  try {
    const dbPath = getDbPath();
    const raw = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading db.json:", err);
    return {
      settings: {},
      advantages: [],
      servicesList: [],
      products: [],
      notices: [],
      heroSlides: [],
      reviews: [],
      projects: [],
      processSteps: [],
      faqs: [],
      governmentRates: [],
      additionalRates: [],
      technicalData: [],
      installationTools: [],
      sectors: []
    };
  }
}

export function writeDB(data) {
  const dbPath = getDbPath();
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
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
