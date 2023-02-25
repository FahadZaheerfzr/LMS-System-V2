import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const existingSSA = await prisma.sSA.findUnique({
      where: {
        soa_id: req.body.p_number + req.body.sq_id,
      },
    });

    if (existingSSA) {
      const updatedSSA = await prisma.sSA.update({
        where: {
          soa_id: existingSSA.soa_id,
        },
        data: {
          answer: req.body.answer,
        },
      });

      res.status(200).json(updatedSSA);
    } else {
      const newSSA = await prisma.sSA.create({
        data: {
          soa_id: req.body.p_number + req.body.sq_id,
          p_number: req.body.p_number,
          sq_id: req.body.sq_id,
          answer: req.body.answer,
        },
      });

      res.status(200).json(newSSA);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
