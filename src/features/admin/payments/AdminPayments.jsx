import { createTheme, Select, ThemeProvider } from "flowbite-react";
import AdminPaymentsTable from "./AdminPaymentsTable";
import { useState } from "react";

const customTheme = createTheme({
  select: {
    field: {
      select: {
        colors: {
          gray: "bg-whitesmoke dark:bg-slate-900 dark:focus:ring-0 dark:border-zinc-800 dark:hover:border-zinc-600 dark:focus:border-zinc-400 border-gray-300 hover:border-gray-400 focus:border-gray-600 focus:ring-0 transition-colors duration-300 ease-in-out bg-[position:left_12px_center]",
        },
      },
    },
  },
});

function AdminPayments() {
  const [paymentsStatus, setPaymentsStatus] = useState("success");

  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">پرداخت ها</h1>
        <ThemeProvider theme={customTheme}>
          <Select
            name="payments"
            color="gray"
            className="w-45 sm:w-60"
            value={paymentsStatus}
            onChange={(e) => setPaymentsStatus(e.target.value)}
          >
            <option value="all">همه پرداختی ها</option>
            <option value="success">پرداخت های موفق</option>
            <option value="failed">پرداخت های ناموفق</option>
          </Select>
        </ThemeProvider>
      </div>
      <div className="w-full h-[0.5px] my-10 bg-light-shade-yellow dark:bg-dark-purple transition-colors duration-300">
        <AdminPaymentsTable paymentsStatusFilter={paymentsStatus} />
      </div>
    </div>
  );
}

export default AdminPayments;
