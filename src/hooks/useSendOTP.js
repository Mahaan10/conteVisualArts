import { useMutation } from "@tanstack/react-query";
import { sendOtp } from "../services/usersService";

export default function useSendOTP() {
  const { isPending, mutateAsync: sendOtpHandler } = useMutation({
    mutationFn: sendOtp,
  });

  return { isPending, sendOtpHandler };
}
