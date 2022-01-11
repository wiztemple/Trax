import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(401).send("Invalid email or password");
    return;
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.status(401).send("Invalid email or password");
    return;
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, time: Date.now() },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("LIFETRACKS_ACCESS_TOKEN", token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60 * 1000,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );
  res.status(200).json(user);
};
