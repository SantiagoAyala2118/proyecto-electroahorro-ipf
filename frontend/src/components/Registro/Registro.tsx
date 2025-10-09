import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

type FormData = {
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

const Registro = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(data);

    const response = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Registro exitoso:", responseData);

      navigate("/login");
    } else {
      // Manejar errores de registro
      console.error("Error en el registro:", response.statusText);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url(/fondo-login.jpg)" }}
    >
      <div className="bg-blue-800/50 rounded-2xl border-2 border-solid border-lime-300 shadow-xl px-7 py-3 w-100 max-w-md mt-2">
        {/* Título y Descripción */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-lime-300 mb-2">
            ElectroAhorro
          </h1>
          <p className="text-white">
            Crea tu cuenta para gestionar tu consumo eléctrico
          </p>
        </div>

        {/* Formulario de Registro */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nombre Completo */}
          <div>
            <label className="block text-sm font-medium text-lime-300 mb-2">
              Nombre completo
            </label>
            <input
              type="text"
              placeholder="Introduce tu nombre completo"
              className="w-full px-4 py-3 border border-lime-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white"
              {...register("full_name", {
                required: "Este campo es obligatorio",
              })}
            />
            {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.full_name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-lime-300 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Introduce tu email"
              className="w-full px-4 py-3 border border-lime-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white"
              {...register("email", { required: "Este campo es obligatorio" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-lime-300 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Crea tu contraseña"
              className="w-full px-4 py-3 border border-lime-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white"
              {...register("password", {
                required: "Este campo es obligatorio",
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-lime-300 font-semibold py-3 px-4 rounded-lg transition-colors duration-100 transform hover:scale-105 hover:bg-lime-400 hover:text-blue-900"
          >
            Crear cuenta
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-white text-sm">
            ¿Ya tienes una cuenta?
            <Link
              to="/login"
              className="text-green-500 underline hover:text-lime-300 font-semibold ml-1"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-white text-sm">
            © 2025 ElectroAhorro. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registro;
