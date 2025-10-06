import http from "./httpService";

export default function requestPaymentApi(newPayment) {
  return http.post("/payments/request", newPayment).then((data) => data.data);
}

export function responsePaymentApi(authority) {
  return http
    .get(`/payments/result?authority=${authority}`)
    .then((data) => data.data);
}
