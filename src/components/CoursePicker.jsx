import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useQuery } from "react-query";

// Components
import CourseTable from "./CourseTable";
import CourseFilter from "./CourseFilter";

// Helpers
import { getCourses } from "../utils";

const StyledCoursePicker = styled.div`
  display: flex;
  justify-content: space-between;
  .table-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export default function CoursePicker() {
  const [params, setParams] = useState([]);

  const {
    isLoading: isCoursesLoading,
    data: courses,
    refetch,
  } = useQuery("courses", () => getCourses(...params));

  const onParamsChange = (college, faculty, speciality) => {
    const collegeId = college && college.id;
    const facultyId = faculty && faculty.id;
    const specialityId = speciality && speciality.id;

    setParams(() => [collegeId, facultyId, specialityId]);
  };

  useEffect(() => {
    refetch();
  }, [JSON.stringify(params)]);

  if (isCoursesLoading) return null;

  return (
    <StyledCoursePicker>
      <CourseFilter onParamsChange={onParamsChange} />
      <div className="table-container">
        <CourseTable isLoading={isCoursesLoading} courses={courses} />
      </div>
    </StyledCoursePicker>
  );
}
