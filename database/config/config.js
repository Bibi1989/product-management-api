require("dotenv").config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL_DEV,
    dialect: "postgres",
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
  },
};
