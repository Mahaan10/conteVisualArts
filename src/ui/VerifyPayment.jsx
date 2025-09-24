import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "./Loading";

function VerifyPayment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const status = searchParams.get("Status");
      const authority = searchParams.get("Authority");

      if (status !== "OK") {
        toast.error("پرداخت توسط کاربر لغو شد");
        return navigate("/");
      }

      try {
        const { data } = await axios.post("/payments/verify", { authority });
        //console.log(data);
        if (data?.code === 100) {
          toast.success("پرداخت با موفقیت انجام شد");
          navigate("/student");
        } else {
          toast.error("پرداخت ناموفق بود");
          navigate("/");
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "مشکلی در تأیید پرداخت وجود دارد"
        );
        navigate("/");
      }
    };

    verifyPayment();
  }, [navigate, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  );
}

export default VerifyPayment;
