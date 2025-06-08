import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const countryCityMap = {
  India: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"],
  USA: ["New York", "San Francisco", "Chicago", "Los Angeles", "Houston"],
  Canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
  Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  UK: ["London", "Manchester", "Birmingham", "Leeds", "Glasgow"],
};

const countryDialCode = {
  India: "+91",
  USA: "+1",
  Canada: "+1",
  Australia: "+61",
  UK: "+44",
};

export default function FormPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneCode: "+91",
    phoneNumber: "",
    country: "India",
    city: "",
    pan: "",
    aadhar: "",
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [cities, setCities] = useState(countryCityMap["India"]);

  const validate = (name, val) => {
    if (!val.trim()) return "Required.";
    switch (name) {
      case "username":
        return val.length >= 8 ? "" : "Must be at least 8 characters.";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
          ? ""
          : "Invalid email.";
      case "password":
        return /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/.test(val)
          ? ""
          : " must be ≥8 chars, 1 Uppercase letter, 1 number, 1 special character.";
      case "phoneNumber":
        return /^\d{10}$/.test(val) ? "" : " must be 10 digits.";
      case "pan":
        return /^[A-Z]{5}\d{4}[A-Z]$/.test(val)
          ? ""
          : "Format: ABCDE1234F.";
      case "aadhar":
        return /^\d{12}$/.test(val) ? "" : " must be 12 digits.";
      default:
        return "";
    }
  };

  useEffect(() => {
    const ok = Object.keys(form).every((k) => validate(k, form[k]) === "");
    setCanSubmit(ok);
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "country") {
      const code = countryDialCode[value] || "";
      setForm((f) => ({ ...f, country: value, city: "", phoneCode: code }));
      setCities(countryCityMap[value] || []);
      setErrors((e) => ({
        ...e,
        country: validate("country", value),
        city: "Required.",
      }));
      return;
    }
    setForm((f) => ({ ...f, [name]: value }));
    if (touched[name]) {
      setErrors((e) => ({ ...e, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((e) => ({ ...e, [name]: validate(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const all = {};
    Object.keys(form).forEach((k) => (all[k] = true));
    setTouched(all);

    const errs = {};
    let valid = true;
    Object.keys(form).forEach((k) => {
      const msg = validate(k, form[k]);
      errs[k] = msg;
      if (msg) valid = false;
    });
    setErrors(errs);

    if (!valid) {
      alert(
        "Fix errors:\n" +
          Object.entries(errs)
            .filter(([_, m]) => m)
            .map(([f, m]) => `• ${f}: ${m}`)
            .join("\n")
      );
      return;
    }

    navigate("/summary", { state: form });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-50 pt-4 px-2 py-4">
      <div
        className="
          w-full max-w-md bg-white border-2 border-indigo-200 rounded-2xl
          shadow-2xl p-6 max-h-[95vh] overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          hover:-translate-y-1
        "
      >
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-1 ">
          Registration Form
        </h2>
        <form onSubmit={handleSubmit} noValidate>
          {[
            { name: "firstName", label: "First Name", placeholder: "Enter first name" },
            { name: "lastName", label: "Last Name", placeholder: "Enter last name" },
            { name: "username", label: "Username", placeholder: "8-char username" },
            {
              name: "email",
              label: "E-mail",
              placeholder: "you@example.com",
              type: "email",
            },
          ].map(({ name, label, placeholder, type }) => (
            <div key={name} className="mb-1">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                {label}
              </label>
              <input
                name={name}
                type={type || "text"}
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`
                  w-full px-3 py-1 border-2 rounded-lg focus:outline-none
                  focus:ring-2 focus:ring-indigo-300 transition-shadow
                  duration-200 ease-in-out hover:shadow-md placeholder-gray-300 
                  ${
                    touched[name] && errors[name]
                      ? "border-red-500"
                      : "border-indigo-200"
                  }
                `}
              />
              {touched[name] && errors[name] && (
                <p className="text-red-600 text-xs italic mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-medium mb-1  ">
              Password
            </label>
            <div className="flex items-center space-x-2">
              <input
                type={showPwd ? "text" : "password"}
                name="password"
                placeholder="Password@123"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`
                  flex-1 px-3 py-1 border-2 rounded-lg focus:outline-none
                  focus:ring-2 focus:ring-indigo-300 transition-shadow
                  duration-200 ease-in-out hover:shadow-md placeholder-gray-300
                  ${
                    touched.password && errors.password
                      ? "border-red-500"
                      : "border-indigo-200"
                  }
                `}
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="text-indigo-600 text-xs font-medium hover:text-indigo-800"
              >
                {showPwd ? "Hide" : "Show"}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="text-red-600 text-xs italic mt-1">{errors.password}</p>
            )}
          </div>

          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Phone
            </label>
            <div className="flex space-x-2">
              <input
                name="phoneCode"
                value={form.phoneCode}
                readOnly
                className="w-16 px-2 py-1 border-2 rounded-lg bg-gray-100 text-gray-700 text-s"
              />
              <input
                name="phoneNumber"
                placeholder="10 digits"
                value={form.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`
                  flex-1 px-3 py-1 border-2 rounded-lg focus:outline-none
                  focus:ring-2 focus:ring-indigo-300 transition-shadow
                  duration-200 ease-in-out hover:shadow-md placeholder-gray-300
                  ${
                    touched.phoneNumber && errors.phoneNumber
                      ? "border-red-500"
                      : "border-indigo-200"
                  }
                `}
              />
            </div>
            {touched.phoneNumber && errors.phoneNumber && (
              <p className="text-red-600 text-xs italic mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          {["country", "city"].map((field) => (
            <div key={field} className="mb-1">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <select
                name={field}
                value={form[field]}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={field === "city" && !form.country}
                className={`
                  w-full px-3 py-1 border-2 rounded-lg focus:outline-none
                  focus:ring-2 focus:ring-indigo-300 transition-shadow
                  duration-200 ease-in-out hover:shadow-md placeholder-gray-300
                  ${
                    touched[field] && errors[field]
                      ? "border-red-500"
                      : "border-indigo-200"
                  }
                  ${field === "city" && !form.country ? "bg-gray-100 cursor-not-allowed" : ""}
                `}
              >
                <option value="">Select {field}</option>
                {(field === "country" ? Object.keys(countryCityMap) : cities).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {touched[field] && errors[field] && (
                <p className="text-red-600 text-xs italic mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              PAN No.
            </label>
            <input
              name="pan"
              placeholder="ABCDE1234F"
              value={form.pan}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`
                w-full px-3 py-1 border-2 rounded-lg focus:outline-none
                focus:ring-2 focus:ring-indigo-300 transition-shadow
                duration-200 ease-in-out hover:shadow-md placeholder-gray-300
                ${touched.pan && errors.pan ? "border-red-500" : "border-indigo-200"}
              `}
            />
            {touched.pan && errors.pan && (
              <p className="text-red-600 text-xs italic mt-1">{errors.pan}</p>
            )}
          </div>

          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Aadhar No.
            </label>
            <input
              name="aadhar"
              placeholder="123456789012"
              value={form.aadhar}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`
                w-full px-3 py-1 border-2 rounded-lg focus:outline-none
                focus:ring-2 focus:ring-indigo-300 transition-shadow
                duration-200 ease-in-out hover:shadow-md placeholder-gray-300
                ${touched.aadhar && errors.aadhar ? "border-red-500" : "border-indigo-200"}
              `}
            />
            {touched.aadhar && errors.aadhar && (
              <p className="text-red-600 text-xs italic mt-1">{errors.aadhar}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 rounded-lg disabled:opacity-50 transition transform duration-200 ease-in-out hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
