import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "../context/useToastContext";
import { Loader } from "./Loading";

function VerifyPayment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const verifyPayment = async () => {
      const status = searchParams.get("Status");
      const authority = searchParams.get("Authority");

      if (status !== "OK") {
        showToast("error", "پرداخت توسط کاربر لغو شد");
        return navigate("/");
      }

      try {
        const { data } = await axios.post("/payments/verify", { authority });
        //console.log(data);
        if (data?.code === 100) {
          showToast("success", "پرداخت با موفقیت انجام شد");
          navigate("/student");
        } else {
          showToast("error", "پرداخت ناموفق بود");
          navigate("/");
        }
      } catch (error) {
        showToast(
          "error",
          error.response?.data?.message || "مشکلی در تأیید پرداخت وجود دارد"
        );
        navigate("/");
      }
    };

    verifyPayment();
  }, [navigate, searchParams, showToast]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  );
}

export default VerifyPayment;
