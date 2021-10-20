var configs = {};
if (process.env.REACT_APP_ENV === "local") {
  configs = require("./env.local.js");

}

if (process.env.REACT_APP_ENV === "develop") {
  //configs = require("./env.dev.js");
}

if (process.env.REACT_APP_ENV === "production") {
  //configs = require("./env.prod.js");
}

process.configs = {};
Object.keys(configs).map((key) => {
  process.configs[`${key}`] = configs[`${key}`];
  return true;
});
