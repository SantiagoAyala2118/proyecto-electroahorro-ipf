import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Capturamos los valores de los campos del formulario
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // * Fetch para contactarse con la API
    try {
      // Enviamos los datos al backend
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Inicio de sesión exitoso:", data);

        // ✅ Redirige al dashboard o App principal
        navigate("/app");
      } else {
        alert("Email o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
      alert("Hubo un problema al iniciar sesión");
    }
  };

  const handleGoogleLogin = () => {
    // Lógica para login con Google
    console.log("Login con Google");
  };

  const handleEmailLogin = () => {
    // Lógica para login con email
    console.log("Login con Email");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-dropboxDark mb-2">
              ElectroAhorro
            </h1>
            <p className="text-gray-600 text-sm">
              Gestiona tu consumo eléctrico de forma inteligente.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md py-3 px-4 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Iniciar sesión con Google
            </button>

            <button
              onClick={handleEmailLogin}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md py-3 px-4 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              Iniciar sesión con Email
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 text-sm">o</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* ✅ FORMULARIO con names agregados */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email" // 👈 agregado
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dropboxBlue focus:border-transparent"
                placeholder="Introduce tu email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password" // 👈 agregado
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dropboxBlue focus:border-transparent"
                placeholder="Introduce tu contraseña"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-dropboxBlue focus:ring-dropboxBlue border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Recordarme
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-dropboxBlue text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="text-center mt-6">
            <a href="#" className="text-sm text-dropboxBlue hover:underline">
              ¿Has olvidado tu contraseña?
            </a>
            <p className="mt-4 text-sm text-gray-600">
              ¿No tienes una cuenta?
              {/* ✅ Link cambiado para usar React Router */}
              <Link to="/" className="text-dropboxBlue hover:underline ml-1">
                Regístrate
              </Link>
            </p>
          </div>
        </div>

        <div className="bg-gray-100 py-4 px-8 text-center">
          <p className="text-xs text-gray-500">
            © 2025 ElectroAhorro. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
