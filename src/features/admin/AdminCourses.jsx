import AdminCoursesTable from "./AdminCoursesTable";

function AdminCourses() {
  return (
    <div className="container">
      <h1 className="text-xl font-bold">دوره ها</h1>
      <div className="w-full h-[0.5px] my-10 bg-light-shade-yellow dark:bg-dark-purple transition-colors duration-300"></div>
      <AdminCoursesTable />
    </div>
  );
}

export default AdminCourses;
