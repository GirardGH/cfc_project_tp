import bcrypt from "bcrypt";
import { createRouter } from "next-connect";
import { validateEmail } from "../../../utils/validation";
import { createActivationToken } from "../../../utils/tokens";
import { sendEmail } from "../../../utils/sendEmails";
import User from "../../../models/user";
import db from "../../../utils/db";
import { activateEmailTemplate } from "../../../emails/activateEmailTemplate";
const router = createRouter();

router.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email." });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "This email already exsits." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters." });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: cryptedPassword });

    const addedUser = await newUser.save();
    const activation_token = createActivationToken({
      id: addedUser._id.toString(),
    });
    const url = `${process.env.BASE_URL}/activate/${activation_token}`;
    sendEmail(email, url, "", "Activate your account.", activateEmailTemplate);
    await db.disconnectDb();
    res.json({
      message: "Register success! Please activate your email to start.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();

// router.post((req, res) => {
//   Promise.resolve()
//     .then(() => {
//       connectDb();
//       const {
//         firstname,
//         lastname,
//         address,
//         postalCode,
//         city,
//         phone,
//         email,
//         password,
//       } = req.body;
//       if (
//         !firstname ||
//         !lastname ||
//         !address ||
//         !postalCode ||
//         !city ||
//         !phone ||
//         !email ||
//         !password
//       ) {
//         return res.status(400).json({ message: "Please fill in all fields." });
//       }
//       if (!validateEmail(email)) {
//         console.log(email);
//         return res.status(400).json({ message: "Invalid email." });
//       }

//       User.findOne({ email })
//         .then((foundUser) => {
//           console.log(email);
//           if (foundUser) {
//             return res
//               .status(400)
//               .json({ message: "This email already exists." });
//           }
//         })
//         .catch((error) => {
//           res.status(500).json({ message: error.message });
//         });

//       if (password.length < 6) {
//         return res
//           .status(400)
//           .json({ message: "Password must be more than 6 caracters" });
//       }
//----------------ARGON 2----------------------
// const hashingOptions = {
//   type: argon2.argon2id,
//   memoryCost: 2 ** 16,
//   timeCost: 5,
//   parallelism: 1,
// };

// const hashPassword = (req, res, next) => {
//   argon2
//     .hash(req.body.password, hashingOptions)
//     .then(hashedPassword => {
//       req.body.hashedPassword = hashedPassword;
//       delete req.body.password;
//       next();
//     })
//     .catch(error => {
//       console.error(error);
//       res.sendStatus(500);
//     });
// };

// const createUser = (req, res) => {
//   const newUser = new User(req.body);
//   newUser
//     .save()
//     .then(() => {
//       res.sendStatus(201); // Créé avec succès
//     })
//     .catch(error => {
//       console.error(error);
//       res.sendStatus(500);
//     });
// };

//------------------BCRYPT PROMISE------------------------
//   bcrypt
//     .hash(password, 12)
//     .then((cryptedPassword) => {
//       const newUser = new User({
//         firstname,
//         lastname,
//         password: cryptedPassword,
//       });
//       return newUser.save();
//     })
//     .then((addedUser) => {
//       res.send(addedUser);
//     })
//     .catch((error) => {
//       console.error(error);
//       res
//         .status(500)
//         .send(
//           "Une erreur s'est produite lors de la création de l'utilisateur."
//         );
//     });
// })
// .catch((error) => {
//   res.status(500).json({ message: error.message });
// });
// });

// export default router.handler();
