import React from "react";

const Input = ({ className, label, ...props }) => {
  return (
    <div>
      <input {...props} className={` peer w-full h-10 rounded-xl border border-[#eaebe8] bg-[white] outline-none transition-all  text-[black] focus:border-primary p-4 ${className}`} />
      <label style={{ letterSpacing: "0.5px" }} className=" mb-2 text-xs font-medium text-[black] capitalize  transition-all peer-focus:!text-[green] -translate-y-[70px] block">
        {label}
      </label>
    </div>
  );
};

export default Input;
