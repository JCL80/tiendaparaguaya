import { useEffect, useState } from "react";

interface RegisterModalProps {
  email: string;
  onClose: () => void;
}

export default function RegisterModal({ email, onClose }: RegisterModalProps) {
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setPhone("");
    setPassword("");
  }, []);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const registerResponse = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, password }),
      });

      if (!registerResponse.ok) {
        const registerError = await registerResponse.json();

        // Map error messages to Spanish
        if (registerError.error.includes("Email or Username are already taken")) {
          throw new Error("El correo o número ya están en uso.");
        } else if (registerError.error.includes("Invalid phone number")) {
          throw new Error("El número de teléfono no es válido.");
        } else if (registerError.error.includes("Full name is required")) {
          throw new Error("Debes ingresar tu nombre y apellido.");
        } else {
          throw new Error("Error al registrarse. Inténtalo de nuevo.");
        }
      }

      window.location.href = "/"; // Full reload
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="mb-4 text-xl font-semibold text-neutral-800">Registro</h2>
        <form onSubmit={handleRegister} autoComplete="off">
          <input
            type="text"
            placeholder="Nombre y Apellido"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded border px-4 py-2 mb-4"
            required
          />
          <input
            type="email"
            value={email}
            readOnly
            className="w-full rounded border px-4 py-2 mb-4 bg-gray-200"
          />
          <input
            type="text"
            placeholder="Número de teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded border px-4 py-2 mb-4"
            required
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border px-4 py-2 mb-4"
            required
            autoComplete="new-password"
          />
          <button
            type="submit"
            className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition-all"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="mt-4 w-full text-gray-700 border border-gray-300 px-4 py-2 rounded hover:bg-gray-200 transition-all"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
