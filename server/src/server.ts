import app from './app';
import env from './util/validateEnv';
import mongoose from 'mongoose';

const port = env.PORT;
const mongoConnectionString = env.MONGO_CONNECTION_STRING;

mongoose
  .connect(mongoConnectionString)
  .then(() => {
    console.log('Mongoose connected');
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch(console.error);
