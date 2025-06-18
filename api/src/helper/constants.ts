export default {
  general: {
    jwtExpireTime: '24h',
  },
  configKey: {
    jwt: {
      secret: 'JWT_SECRET',
      jwtExpireTime: 'JWT_EXPIRE_TIME'
    },
    mongoUri: 'MONGO_URI',
  },
};
