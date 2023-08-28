import prisma from "@/lib/prisma";

const handler = async (req, res) => {
  try {
    // Retrieve faculty's paperapproval data
    const exams = await prisma.faculty.findUnique({
      where: {
        faculty_id: req.body.faculty_id,
      },
      select: {
        paperapproval: {
          select: {
            level: true,
            paper: {
              select: {
                paper_id: true,
                paper_name: true,
                paper_type: true,
                date: true,
                duration: true,
                weightage: true,
                freeflow: true,
                status: true,
                total_marks: true,
                course: true,
                PaperComment: {
                  select: {
                    comment: true,
                    user_generated: true,
                  },
                },
              },
            },
          },
        },
        courses: {
          select: {
            course: {
              select: {
                course_code: true,
                course_name: true,
                credit_hours: true,
                paper: {
                  select: {
                    paper_id: true,
                    paper_name: true,
                    paper_type: true,
                    date: true,
                    duration: true,
                    weightage: true,
                    freeflow: true,
                    examofficer: true,
                    status: true,
                    total_marks: true,
                    PaperComment: {
                      select: {
                        comment: true,
                        user_generated: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    // Retrieve papers for the selected courses using the CoursePaper model
    const selectedCoursePapers = await prisma.coursePaper.findMany({
      where: {
        course_code: {
          in: req.body.course_code,
        },
      },
      select: {
        course_code: true,
        paper: {
          select: {
            paper_id: true,
            paper_name: true,
            paper_type: true,
            date: true,
            duration: true,
            weightage: true,
            freeflow: true,
            status: true,
            total_marks: true,
            objective_marks: true,
            subjective_marks: true,
            language: true,
            subjective_questions: true,
            objective_questions: true,
            ie_questions: true,
            PaperComment: {
              select: {
                comment: true,
                user_generated: true,
              },
            },
          },
        },
      },
    });

    // Create an array to store selectedCoursePapers by course code
    const selectedCoursePapersByCourse = {};

    // Group selectedCoursePapers by course code
    selectedCoursePapers.forEach((paper) => {
      if (!selectedCoursePapersByCourse[paper.course_code]) {
        selectedCoursePapersByCourse[paper.course_code] = [];
      }
      selectedCoursePapersByCourse[paper.course_code].push(paper.paper);
    });

    // Merge selectedCoursePapers into exams.courses[].course.paper
    exams.courses.forEach((course) => {
      const courseCode = course.course.course_code;
      if (selectedCoursePapersByCourse[courseCode]) {
        course.course.paper = selectedCoursePapersByCourse[courseCode];
      }
    });

    // Create the response object
    const all_exams = {
      ...exams,
      selectedCoursePapers,
    };

    console.log(all_exams.courses[0].course.paper, "all_exams");
    res.status(200).json(all_exams);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default handler;
