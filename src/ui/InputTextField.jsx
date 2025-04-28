import React from "react";

function InputTextField({ type = "text", title, phoneNumber, setPhoneNumber }) {
  //! Maybe the solution would be transparenting the border of input and appear fieldset and legend!?

  return (
    <div className="relative mb-5">
      <input
        type={type}
        id=""
        value={phoneNumber}
        onChange={() => setPhoneNumber(event.target.value)}
        className="peer w-full py-2 px-1 border border-neutral-200 rounded-md focus:outline-none focus:ring-0"
      />
      <label
        htmlFor=""
        className="absolute  top-2 right-2 text-gray-500 transition-all duration-200 peer-focus:text-sm peer-focus:-top-2 peer-focus:bg-white peer-focus:px-1"
      >
        {title}
      </label>
    </div>
  );
}

export default InputTextField;
