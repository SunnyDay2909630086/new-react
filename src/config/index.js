const config = {
  development: {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  },
  production: {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL,
  },
};

export default config[process.env.REACT_APP_ENV || 'development'];