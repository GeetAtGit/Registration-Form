import React from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

export default function SummaryPage() {
  const navigate = useNavigate();
  const { state: data } = useLocation();
  if (!data) return <Navigate to="/" replace />;

  const {
    firstName,
    lastName,
    username,
    email,
    phoneCode,
    phoneNumber,
    country,
    city,
    pan,
    aadhar,
  } = data;

  const fields = [
    { label: "First Name",   value: firstName },
    { label: "Last Name",    value: lastName },
    { label: "Username",     value: username },
    { label: "E-mail",       value: email },
    { label: "Phone Number", value: `${phoneCode} ${phoneNumber}` },
    { label: "Country",      value: country },
    { label: "City",         value: city },
    { label: "PAN No.",      value: pan },
    { label: "Aadhar No.",   value: aadhar },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-50 px-4 py-8">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-center text-indigo-700">
          Thank You!
        </h2>
        <div className=" w-12 h-1 bg-indigo-300 mx-auto my-4 rounded"></div>
        <p className="text-center text-gray-400 mb-4">
          Your submission has been received. Below is what you provided:
        </p>

        <dl className="space-y-2">
          {fields.map(({ label, value }) => (
            <div
              key={label}
              className="w-full max-w-sm mx-auto flex p-2 bg-gray-50 hover:bg-gray-100 transition rounded-md"
            >
              <dt className="w-32 flex-shrink-0 text-sm font-medium text-gray-700">
                {label}
              </dt>
              <dd className="flex-1 text-sm text-gray-600">          <span className="mr-4">:</span>

                {value || "—"}
              </dd>
            </div>
          ))}
        </dl>

        <button
          onClick={() => navigate("/")}
          className="
            block mx-auto mt-6 px-5 py-2 bg-indigo-600 text-white
            text-sm font-semibold rounded-md shadow-sm
            hover:bg-indigo-700 hover:-translate-y-0.5 transition
          "
        >
          Submit Another Response
        </button>
      </div>
    </div>
  );
}
