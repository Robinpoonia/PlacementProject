export default function SignInModal({
  isOpen,
  onClose,
}) {
  if (!isOpen) return null;

  // const googleLogin = () => {
  //     console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
  //   window.location.href =
  //     `${import.meta.env.VITE_API_URL}/api/auth/google`;
  // };
  const googleLogin = () => {
  alert("Google button clicked");

  console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);

  window.location.href =
    `${import.meta.env.VITE_API_URL}/api/auth/google`;
  // window.location.href = "http://localhost:5000/api/auth/google";
};
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">

      <div className="relative w-[420px] bg-[#121a2d] rounded-2xl p-8">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white text-3xl"
        >
          ×
        </button>

        <h1 className="text-white text-3xl font-bold mb-3">
          Sign in to MCA Launchpad
        </h1>

        <p className="text-gray-400 mb-8">
          Only MANIT students can sign in using their
          <br />
          <span className="text-cyan-400">
            @stu.manit.ac.in
          </span>{" "}
          email.
        </p>

        <button
          onClick={googleLogin}
          className="w-full bg-white text-black rounded-xl py-4 font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-3"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-6 h-6"
          />

          Continue with Google
        </button>

      </div>

    </div>
  );
}