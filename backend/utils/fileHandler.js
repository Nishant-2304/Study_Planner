import fs from "fs";

const FILE_PATH = "./data.json";

export const readData = () => {
  const raw = fs.readFileSync(FILE_PATH, "utf-8");
  return JSON.parse(raw);
};

export const writeData = (data) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
};
