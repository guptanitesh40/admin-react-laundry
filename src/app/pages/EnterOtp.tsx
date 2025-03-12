import React, { useRef, useState } from "react";
import { useSendOtp, useValidateOtp } from "../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineVerifiedUser } from "react-icons/md";

const EnterOtp: React.FC = () => {
  const { validateOtp, loading: validating } = useValidateOtp();
  const location = useLocation();
  const mobileNumber = location.state.mobileNumber;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const { sendOtp, loading: sending } = useSendOtp();

  const [otpError, setOtpError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (value && !/^\d$/.test(value)) {
      setOtpError("Only numeric values are allowed");
      e.target.value = "";
      return;
    } else {
      setOtpError("");
    }

    if (value.length > 1) {
      e.target.value = value[0];
    }

    if (value !== "" && index < inputRefs.current.length - 1) {
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

    if (!otp || otp.trim() === "") {
      setOtpError("Please enter OTP");
      return;
    }
    if (otp.length !== 6) {
      setOtpError("OTP must be 6 digits");
      return;
    }
    setOtpError("");

    const otpValue = Number(otp);
    const success = await validateOtp(mobileNumber, otpValue);
    if (success) {
      navigate("/forgot-password/resetpassword", {
        state: { mobileNumber, otpValue },
      });
    }
  };

  const handleSendOtp = async () => {
    if (mobileNumber) {
      await sendOtp(mobileNumber);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-5 w-full">
      <div className="card w-full max-w-sm bg-white shadow-lg rounded-lg p-6 lgscreen:p-2">
        <div className="flex flex-col gap-5">
          <div className="text-center">
            <MdOutlineVerifiedUser className="text-sky-500 mx-auto" size={80} />
            <h2 className="text-lg font-semibold text-gray-900 mt-3">
              Enter your OTP
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              We have sent a verification code to
            </p>
            <p className="text-sm font-medium text-gray-800">{mobileNumber}</p>
          </div>

          <div className="w-fit mx-auto">
            <div className="flex justify-center gap-2">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  className="mini:w-10 mini:h-12 lgscreen:w-8 lgscreen:h-10 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={1}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
            {otpError && (
              <p className="text-center text-red-500 text-sm mt-2">
                {otpError}
              </p>
            )}
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition mt-4"
              onClick={handleVerify}
              disabled={validating}
            >
              {validating ? "Verifying..." : "VERIFY"}
            </button>
          </div>

          <button
            className="text-sm text-blue-500 font-medium hover:underline"
            onClick={handleSendOtp}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterOtp;
