import mongoose from 'mongoose';
import "dotenv/config"
import app from './app';

const PORT = process.env.PORT || 5000;

async function main(){
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mcynqnr.mongodb.net/libraryManagementDB?retryWrites=true&w=majority&appName=Cluster0`)
    console.log("Successfully Connected to Mongodb using Mongoose");

    app.listen(PORT, ()=>{
      console.log(`Library Management App is listening on the port ${PORT}`)
    })
    
  } catch (error) {
    console.log(error)
  }
}
main();