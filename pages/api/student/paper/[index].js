import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { index } = req.query;
  const p_number = index;

  try {
    // Fetch all the courses in which the student is enrolled
    const courses = await prisma.sRC.findMany({
      where: {
        p_number: p_number,
      },
    });

    // Check if any courses were found
    if (!courses || courses.length === 0) {
      return res.status(404).json("Student not found or not enrolled in any course");
    }

    // Collect the course codes of all enrolled courses
    const courseCodes = courses.map((course) => course.course_code);

    // Fetch all the papers for the student's enrolled courses
    const papers = await prisma.paper.findMany({
      where: {
        course_code: {
          in: courseCodes, // Filter papers for the student's enrolled course codes
        },
      },
    });

    // Fetch data from the CoursePaper model
    const coursePapers = await prisma.coursePaper.findMany({
      where: {
        course_code: {
          in: courseCodes,
        },
      },
      include: {
        paper: true, // Include paper data associated with course papers
      },
    });
    console.log(coursePapers, "coursePapers")
    // Combine paper data with course paper data
    const papersWithCoursePapers = coursePapers.map((paper) => {
      return {
        ...paper.paper,
      };
    });
    res.status(200).json(papersWithCoursePapers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
