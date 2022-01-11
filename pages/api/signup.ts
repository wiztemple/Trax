import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync(10);
  const { name, email, password } = req.body;

  let user;

  try {
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, salt),
      } as any,
    });
  } catch (e) {
    res.status(401);
    res.json({ error: "User already exists" });
    return;
  }

  const token = jwt.sign(
    { email: user.email, id: user.id, time: Date.now() },
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
