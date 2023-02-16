import React, { useEffect, useState } from "react";
import Courses from "./Subcomponents/Courses";
import Faculty from "./Subcomponents/Faculty";
import Students from "./Subcomponents/Students";
import Tabs from "./Subcomponents/Tabs";

export default function AdminPanel({
  faculty_data,
  courses_data,
  student_data,
}) {
  const [faculty, setFaculty] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [active, setActive] = useState("Faculty");

  useEffect(() => {
    console.log(courses_data);
    if ((faculty_data !== undefined, faculty_data !== null)) {
      setFaculty(faculty_data);
    }
    if ((courses_data !== undefined, courses_data !== null)) {
      setCourses(courses_data);
    }
    if ((student_data !== undefined, student_data !== null)) {
      setStudents(student_data);
    }
  }, [faculty_data, courses_data, student_data]);
  return (
    <div className="w-full pr-10 mt-5 px-5">
      <Tabs active={active} setActive={setActive} />

      {active === "Faculty" && (
        <div>
          <Faculty faculty={faculty} setFaculty={setFaculty} />
        </div>
      )}
      {active === "Courses" && (
        <div>
          <Courses courses={courses} setCourses={setCourses} />
        </div>
      )}
      {active === "Exams" && <div></div>}
      {active === "Students" && (
        <div>
          <Students students={students} setStudents={setStudents} />
        </div>
      )}
    </div>
  );
}
