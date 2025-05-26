import CoursesTable from "./CoursesTable";

function StudentCourses() {
  return (
    <div className="container">
      <h1 className="text-xl font-bold">دوره های من</h1>
      <div className="w-full h-[0.5px] my-10 bg-light-shade-yellow dark:bg-dark-purple transition-colors duration-300"></div>
      <CoursesTable />
    </div>
  );
}

export default StudentCourses;
