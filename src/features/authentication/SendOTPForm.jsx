import { FloatingLabel } from "flowbite-react";

function SendOTPForm({ onSubmit, isPending, register }) {
  return (
    <div>
      <form action="" className="space-y-5" onSubmit={onSubmit}>
        <TextField
          register={register}
          name="phoneNumber"
          label="شماره موبایل :"
        />
        <div className="">
          {isPending ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              ارسال کد تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SendOTPForm;
