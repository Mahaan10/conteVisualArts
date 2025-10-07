import { Link } from "react-router-dom";
import Table from "../../../ui/Table";
import toPersianNumbersWithComma from "../../../utils/toPersianNumbers";
import formattedDate, { formattedTime } from "../../../utils/formattedDate";

function AdminPaymentsRow({ payment, index }) {
  return (
    <Table.Row>
      <td className="py-2">{index + 1}</td>
      <td>{payment?.ref_id || "N/A"}</td>
      <td>{payment?.student?.name}</td>
      <td>
        <a
          href={`tel:+98${payment?.mobile.slice(1)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-almond-cookie dark:hover:bg-dark-cerulean hover:bg-golden-sand dark:bg-purple-plumeria transition-colors duration-300 cursor-pointer btn w-full justify-center mx-auto"
        >
          {payment?.mobile}
        </a>
      </td>
      <td>
        <Link
          to={`/courses/${payment?.course?._id}`}
          className="p-2 rounded-lg bg-almond-cookie dark:hover:bg-dark-cerulean hover:bg-golden-sand dark:bg-purple-plumeria transition-colors duration-300 cursor-pointer btn w-auto justify-center mx-auto"
        >
          {payment?.course?.name}
        </Link>
      </td>
      <td>{toPersianNumbersWithComma(payment?.amount / 10)} تومان</td>
      <td>
        {payment?.status === "pending" || payment?.status === "failed"
          ? "__"
          : `${toPersianNumbersWithComma(
              (payment?.amount - payment?.fee) / 10
            )} تومان`}
      </td>
      <td>{formattedDate(payment?.verifiedAt) || "__"}</td>
      <td>{formattedTime(payment?.verifiedAt) || "__"}</td>
      <td>{payment?.status === "success" ? "موفق ✔️" : "ناموفق ❌"}</td>
    </Table.Row>
  );
}

export default AdminPaymentsRow;
