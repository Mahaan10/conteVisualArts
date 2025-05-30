import OrdersTable from "./OrdersTable";

function StudentPayments() {
  return (
    <div className="container">
      <h1 className="text-xl font-bold">سفارش های من</h1>
      <div className="w-full h-[0.5px] my-10 bg-light-shade-yellow dark:bg-dark-purple transition-colors duration-300"></div>
      <OrdersTable />
    </div>
  );
}

export default StudentPayments;
