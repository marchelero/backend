module.exports = {
 apps : [{
    name: "www",
    script: "./bin/www",
    env_production: {
      NODE_ENV: "production",
    },
    env: {
      NODE_ENV: "development"
    }
  }]
};
