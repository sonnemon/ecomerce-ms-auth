const config = {
  port: process.env.API_PORT,
  mongo_uri: `${process.env.MONGO_URI}`,
  jwt_key: `${process.env.JWT_KEY}`,
  expireIn: '12h',
};
export default config;
