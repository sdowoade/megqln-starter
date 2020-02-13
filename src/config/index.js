const commonConfig = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,
  corsDomain: process.env.CORS_DOMAIN || '*',
  secret: 'secret',
  authTokenExpiry: 86400,
};

export default commonConfig;
