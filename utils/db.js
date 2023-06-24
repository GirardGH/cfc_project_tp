import mongoose from "mongoose";

const connection = {};

export function connectDb() {
  if (connection.isConnected) {
    console.log("already connected to the database");
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("Use previous connection to the database");
      return;
    }
    mongoose.disconnect();
  }

  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("new connection to the database");
      connection.isConnected = mongoose.connection.readyState;
    })
    .catch((err) => {
      console.error(err);
    });
}

export async function disconnectDb() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("Not disconnected from database");
    }
  }
}



// ASYC AWAIT VS PROMISES

// import mongoose from "mongoose";

// const connection = {};

// export async function connectDb() {
//   if (connection.isConnected) {
//     console.log("already connected to the database");
//     return;
//   }

//   if (mongoose.connections.lenght > 0) {
//     connection.isConnected = mongoose.connections[0].readyState;
//     if (connection.isConnected === 1) {
//       console.log("Use previous connection to the database");
//       return;
//     }
//     await mongoose.disconnect();
//   }

//   const db = await mongoose.connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   });

//   console.log("new connection to the database");
//   connection.isConnected = db.connections[0].readyState;
// }
