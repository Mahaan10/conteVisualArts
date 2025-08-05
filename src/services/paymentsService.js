import http from "./httpService";

export default function requestPaymentApi(newPayment) {
  return http
    .post("/payments/request", newPayment)
    .then((data) => data.data);
}

/*     export default function requestPaymentApi(newPayment) {
  return http
    .post("/payments/request", newPayment)
    .then((res) => {
      console.log("RAW payment response:", res);
      return res.data;
    });
} */