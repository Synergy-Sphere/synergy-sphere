import mongoose from "mongoose";

async function connect() {
  // Register connection events
  // https://mongoosejs.com/docs/connections.html#connection-events
  mongoose.connection.on("connected", () => console.log("DB connected"));
  mongoose.connection.on("error", (error) => console.log("DB error", error))
  
  // Connect to "todo-app" db using a connection string
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
}

export default connect;