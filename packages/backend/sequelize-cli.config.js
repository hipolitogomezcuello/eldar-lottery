const { Sequelize } = require('sequelize');

const dbConfig = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
}

const sequelize = new Sequelize(dbConfig);

module.exports = {
  development: {
    dialect: 'postgres',
    database: sequelize.config.database,
    host: sequelize.config.host,
    port: sequelize.config.port,
    username: sequelize.config.username,
    password: sequelize.config.password,
    define: {
      underscored: true,
    },
    migrationStorage: 'sequelize',
    migrationStorageTableName: 'sequelize_meta',
  },
};
