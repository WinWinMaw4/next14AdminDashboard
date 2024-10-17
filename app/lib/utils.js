import mongoose from "mongoose";

// const connection = {};

// export default const connectToDB = async () => {
//   try {
//     if (connection.isConnected) return;
//     const db = await mongoose.connect(process.env.MONGO);
//     connection.isConnected = db.connections[0].readyState;
//     console.log("db connected success",connection.isConnected)
//   } catch (error) {
//     console.log("db error",error)
//     throw new Error(error);
//   }
// };

const connectToDB = async () => {
  if(mongoose.connections[0].readyState){
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGO);
    console.log("mongo db connected")
    return true;
  }catch (err){
    console.log(err)
  }
}

export default connectToDB;