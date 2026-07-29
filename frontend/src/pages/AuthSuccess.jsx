import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (!token) {
            navigate("/");
            return;
        }

        localStorage.setItem("token", token);

        const getUser = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                // Reload application so Header updates immediately
                window.location.href = "/";

            } catch (error) {
                console.error(error);

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                window.location.href = "/";
            }
        };

        getUser();

    }, [navigate]);

    return (
        <div className="flex items-center justify-center h-screen bg-[#071022]">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white">
                    Signing you in...
                </h2>

                <p className="text-gray-400 mt-2">
                    Please wait while we log you in...
                </p>
            </div>
        </div>
    );
}