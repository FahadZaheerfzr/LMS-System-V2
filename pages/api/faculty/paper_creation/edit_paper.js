import { PrismaClient } from "@prisma/client"


const handler = async (req, res) => {
  const prisma = new PrismaClient()
  try {
    const paper = await prisma.paper.update({
      where: {
        paper_id: req.body.paper_id
      },
      data: {
        paper_name: req.body.paper_name,
        time: req.body.time,
        date: req.body.date,
        duration: req.body.duration,
        weightage: req.body.weightage,
      }
    })
    res.status(200).json(paper)
  } catch (err) {
    throw new Error(err.message)
  }
}

export default handler;