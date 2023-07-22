import mongoose, { mongo } from "mongoose";
const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    console.log("Already connected to the database.");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("Use previous connection to the database.");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("New connection to the database.");
  connection.isConnected = db.connections[0].readyState;
}

async function disconnectDb() {
  if (connection.isConnected) {
    if (process.env.NODE_END === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not diconnecting from the database.");
    }
  }
}
const db = { connectDb, disconnectDb };
export default db;


//-------------------------------------------

// import mongoose from "mongoose";

// const connection = {};

// export function connectDb() {
//   if (connection.isConnected) {
//     console.log("already connected to the database");
//     return;
//   }

//   if (mongoose.connections.length > 0) {
//     connection.isConnected = mongoose.connections[0].readyState;
//     if (connection.isConnected === 1) {
//       console.log("Use previous connection to the database");
//       return;
//     }
//     mongoose.disconnect();
//   }

//   mongoose
//     .connect(process.env.MONGODB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       console.log("new connection to the database");
//       connection.isConnected = mongoose.connection.readyState;
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }

//---------------------------------------------------

// export function disconnectDb() {
//     if (connection.isConnected) {
//       if (process.env.NODE_ENV === "production") {
//         return mongoose.disconnect()
//           .then(() => {
//             connection.isConnected = false;
//             console.log("Disconnected from database");
//           })
//           .catch((err) => {
//             console.error(err);
//           });
//       } else {
//         console.log("Not disconnected from database");
//         return Promise.resolve();
//       }
//     } else {
//       console.log("There is no active connection to disconnect");
//       return Promise.resolve();
//     }
//   }


// export async function disconnectDb() {
//   if (connection.isConnected) {
//     if (process.env.NODE_ENV === "production") {
//       await mongoose.disconnect();
//       connection.isConnected = false;
//     } else {
//       console.log("Not disconnected from database");
//     }
//   }
// }



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
