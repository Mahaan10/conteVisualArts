import AdminReviewsTable from "./AdminReviewsTable";

function AdminReviews() {
  return (
    <div className="container">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">نظرات کاربران</h1>
      </div>
      <div className="w-full h-[0.5px] my-10 bg-light-shade-yellow dark:bg-dark-purple transition-colors duration-300"></div>
      <AdminReviewsTable />
    </div>
  );
}

export default AdminReviews;
