module.exports = ({ config }) => {
  return {
    ...config,
    experiments: {
      ...config.experiments,
      // Uses the environment variable if present, otherwise defaults to the root '/'
      baseUrl: process.env.APP_BASE_URL || "/",
    },
  };
};