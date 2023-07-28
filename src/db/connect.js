import mongoose from "mongoose";

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connected to DB!");
    })
    .catch((err) => {
      throw err;
    });
};

export default connect;
