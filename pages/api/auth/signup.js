import { createRouter } from "next-connect";
import { validateEmail } from "../../../utils/validation"
import { connectDb } from "../../../utils/db";
import db from "../../../utils/db";

const router = createRouter();

router.post((req, res) => {
  Promise.resolve()
    .then(() => {
      connectDb();
      const {
        firstname,
        lastname,
        address,
        postalCode,
        city,
        phone,
        email,
        password,
      } = req.body;
      if (
        !firstname ||
        !lastname ||
        !address ||
        !postalCode ||
        !city ||
        !phone ||
        !email ||
        !password
      ) {
        return res.status(400).json({ message: "Please fill in all fields." });
      }
      if (!validateEmail(email)) {
        console.log(email);
        return res.status(400).json({ message: "Invalid email." });
      }


      res.send("Welcome fdp");
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

export default router.handler();
