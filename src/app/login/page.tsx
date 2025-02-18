"use client";

import { useState } from "react";
import RegisterModal from "./components/RegisterModal";

export default function AuthForm() {
  const [error, setError] = useState<string>(""); // Error message
  const [loading, setLoading] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false); // Controls modal visibility
  const [email, setEmail] = useState<string>("");

  // Handle Login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const enteredEmail = formData.get("email") as string;
    const password = formData.get("password") as string;

    setEmail(enteredEmail);

    try {
      const loginResponse = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: enteredEmail, password }),
      });

      if (loginResponse.ok) {
        window.location.href = "/";
        return;
      }

      const loginError = await loginResponse.json();

      if (loginError.error.includes("Invalid identifier or password")) {
        setError("El usuario no existe. ¿Quieres registrarte?");
      } else {
        setError("Error al iniciar sesión. Inténtalo de nuevo.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError("Hubo un problema con el servidor. Inténtalo más tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto my-16 w-full max-w-lg rounded border p-8 shadow-md">
      <form onSubmit={handleLogin}>
        <h2 className="mb-4 text-xl font-semibold text-neutral-800">Inicia sesión</h2>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Correo electrónico"
          className="w-full rounded border px-4 py-2 mb-4"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Contraseña"
          className="w-full rounded border px-4 py-2 mb-6"
          required
        />
        <button type="submit" className="w-full rounded bg-black px-4 py-2 text-white hover:bg-gray-500" disabled={loading}>
          {loading ? "Procesando..." : "Inicia sesión"}
        </button>

        {/* Smooth animated error message */}
        {error && (
          <div className="mt-4 text-center">
            <p className="text-red-500 transition-opacity duration-300 ease-in-out">{error}</p>
            {error.includes("¿Quieres registrarte?") && (
              <button
                onClick={() => setShowRegister(true)}
                className="mt-2 text-blue-600 hover:underline"
              >
                Registrarme
              </button>
            )}
          </div>
        )}
      </form>

      {/* Register Modal (opens only when the user clicks "Registrarme") */}
      {showRegister && <RegisterModal email={email} onClose={() => setShowRegister(false)} />}
    </div>
  );
}
