import AdminUsersTable from "./AdminUsersTable";

function AdminUsers() {
  return (
    <div className="container">
      <h1 className="text-xl font-bold">کاربران</h1>
      <div className="w-full h-[0.5px] my-10 bg-light-shade-yellow dark:bg-dark-purple transition-colors duration-300"></div>
      <AdminUsersTable />
    </div>
  );
}

export default AdminUsers;
