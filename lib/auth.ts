import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.LIFETRACKS_ACCESS_TOKEN;
    if (token) {
      let user;
      try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
          throw new Error("User not found");
        }
      } catch (e) {
        res.status(401).json({ error: "Not Authorized" });
      }
      return handler(req, res, user);
    }
    res.status(401).json({ error: "Not Authorized" });
  };
};

export const validateToken = (token) => {
  const user = jwt.verify(token, process.env.JWT_SECRET);
  return user;
};
