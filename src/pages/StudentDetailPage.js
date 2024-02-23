import React from "react";
import { useParams } from "react-router-dom";
//import students from "../data/students";
import StudentList from "../components/StudentList";
import NotFoundPage from "../components/NotFoundPage";
import { useState, useEffect } from "react";
import CONSTANTS from "../data/config";
import AddStudentForm from "../components/AddStudentForm";

const StudentDetailPage = () => {
  // any JS code goes here
  const { id } = useParams();
  // const student = students.find((data) => data.studentId === Number(id));

  const [studentInfo, setStudentInfo] = useState({
    firstName: "",
    lastName: "",
    school: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${CONSTANTS.BASE_API_URL}students/${id}`
      );
      const body = await result.json();
      setStudentInfo(body);
    };
    fetchData();
  }, [id]);

  if (!studentInfo) return <NotFoundPage />;
  return (
    <React.Fragment>
      <div style={{ width: "20%", float: "right" }}>
        <h3>Others:</h3>
        <StudentList exceptId={studentInfo.studentId} />
      </div>

      <h4 className="text-danger">Student ID={studentInfo.studentId}</h4>
      <p>
        <b>Name: </b>
        {studentInfo.firstName} {studentInfo.lastName}
      </p>
      <p>
        <b>School: </b>
        {studentInfo.school}
      </p>
      <div style={{ width: "50%", float: "left" }}>
        <AddStudentForm />
      </div>
    </React.Fragment>
  );
};

export default StudentDetailPage;
