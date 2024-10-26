import React, { useRef } from "react";
import { useSendOtp, useValidateOtp } from "../hooks";
import {  useLocation, useNavigate } from "react-router-dom";
import { MdOutlineVerifiedUser } from "react-icons/md";

const EnterOtp: React.FC = () => {
  const { validateOtp } = useValidateOtp();
  const location = useLocation();
  const mobileNumber = location.state.mobileNumber;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const { sendOtp } = useSendOtp();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.value.length > 1) {
      e.target.value = e.target.value[0];
    }

    if (e.target.value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0 && e.currentTarget.value === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otp = inputRefs.current.map((input) => input?.value).join("");

    const otpValue = Number(otp);
    const success = await validateOtp(mobileNumber, otpValue);
    if (success) {
      navigate("/forgot-password/resetpassword", {
        state: { mobileNumber, otpValue },
      });
    }
  };

  const handleSendOtp = async () => {
    let success;
    if (mobileNumber) {
      success = await sendOtp(mobileNumber);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 grow">
      <div className="flex justify-center items-center p-8 lg:p-10">
        <div className="card max-w-[450px] w-full">
          <div className="card-body flex flex-col gap-4 p-10">
            <div className="text-center">
              <div className="flex justify-center">
                <MdOutlineVerifiedUser color="skyblue" size={100} />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">
                Enter your OTP
              </h2>
              <span
                className="cursor-pointer text-2sm flex font-medium text-gray-600 justify-center"
              >
                We have sent verification code to 
              </span>
              <span
                className="cursor-pointer text-2sm flex font-medium text-gray-600 justify-center"
              >
              {mobileNumber} 
              </span>
            </div>
            <div className="flex justify-between boxes">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  className="input box"
                  maxLength={1}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
            <button
              className="btn btn-primary flex justify-center"
              onClick={handleVerify}
            >
              VERIFY
            </button>
            <button
              className="cursor-pointer text-2x flex font-medium text-gray-600 justify-center"
              onClick={handleSendOtp}
            >
              Resend 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnterOtp;
