const fs = require("fs");

const getFileData = () => {
  const filePath = __dirname + "/notes.json";
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath);
      return JSON.parse(data);
    }

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const saveFileData = (data) => {
  const filePath = __dirname + "/notes.json";

  try {
    fs.writeFileSync(filePath, JSON.stringify(data), {
      encoding: "utf8",
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = { getFileData, saveFileData };
