"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from 'react-icons/fc'; // Google icon

export default function AuthForm() {
  const [error, setError] = useState(null); // State to display errors
  const [loading, setLoading] = useState(false); // State for loading spinner
  const router = useRouter();

  // Handle Login (or Register if user doesn't exist)
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Clear previous errors
    setLoading(true); // Start loading

    const email = e.target.email.value; // Get email input value
    const password = e.target.password.value; // Get password input value

    console.log("Initiating login process");
    console.log("Input email:", email);
    console.log("Input password:", password);

    try {
      // Step 1: Attempt to log in
      console.log("Attempting to log in...");
      const loginResponse = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("loginResponse:", loginResponse);

      if (loginResponse.ok) {
        console.log("Login successful!");
        const loginData = await loginResponse.json();
        console.log("Login response:", loginData);

        window.location.href = "/";
        return;
      }

      // Step 2: If login failed, check if the user doesn't exist
      const loginError = await loginResponse.json();
      console.error("Login failed ds:", loginError);

      if (
        loginError.error &&
        (loginError.error.includes("User not found") ||
          loginError.error.includes("Invalid identifier or password"))
      ) {
        console.log("User not found. Attempting to register...");

        // Step 3: Register the user
        const registerResponse = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!registerResponse.ok) {
          const registerError = await registerResponse.json();
          throw new Error(registerError.error || "Registration failed");
        }

        console.log("Registration successful!");
        const registerData = await registerResponse.json();
        console.log("Register response:", registerData);

        window.location.href = "/";
      } else {
        console.log("got to the else dumb mofo");
        throw new Error(loginError.error || "Login failed");
      }
    } catch (err) {
      console.log("got to the catch dum mofo");
      // Handle errors
      setError(err.message || "An unexpected error occurred");
      console.error("Error during login/registration process:", err);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="mx-auto my-16 w-full max-w-lg rounded border p-8 shadow-md">
      {/* Login Form */}
      <form className=" rounded  p-8 " onSubmit={handleLogin}>
        <h2 className="mb-4 text-xl font-semibold text-neutral-800">Inicia sesión</h2>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="w-full rounded border px-4 py-2"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="w-full rounded border px-4 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white hover:bg-gray-500"
          disabled={loading}
        >
          {loading ? "Procesando..." : "Inicia sesión"}
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </form>
	  <hr/>
	  
    </div>
  );
}

{/* <div className="p-8 flex justify-center">
        <button
          onClick={() => {
            window.location.href = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/connect/google`;
          }}
          className="flex items-center justify-center rounded px-4 py-2 border shadow-lg hover:bg-gray-100"
        >
          <FcGoogle className="mr-2 h-5 w-5" /> 
          Inicia sesión con Google
        </button>
      </div> */}