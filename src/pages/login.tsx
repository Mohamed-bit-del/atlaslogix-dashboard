import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks";
import { Input, Button } from "../components/atoms";
import type { LoginPayload } from "../types/auth";

import logo from "../../public/logo.png";

export default function Login() {
    const { register, handleSubmit, formState: { errors }, } = useForm<LoginPayload>();

    const navigate = useNavigate();

    const { mutate, isPending, error } = useAuth();

    const onSubmit = (data: LoginPayload) => {
        mutate(data, {
            onSuccess: () => {
                navigate("/shipments");
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-lg shadow w-[360px]"
                noValidate
            >

                <div className="flex flex-col items-center mb-8">
                    <img src={logo} alt="AtlasLogix Logo" className="w-16 h-16 mb-4 object-contain" />
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">
                        AtlasLogix
                    </h1>
                    <p className="text-slate-500 text-sm">
                        Logistics Compliance Platform
                    </p>
                </div>

                <Input

                    {...register("email", {
                        required: "Email is required",
                    })}
                    type="email"
                    placeholder="Email"
                    error={errors.email?.message}
                />

                <Input
                    {...register("password", {
                        required: "Password is required",
                    })}
                    type="password"
                    placeholder="Password"
                    error={errors.password?.message}
                />

                {error && (
                    <p className="text-red-500 text-sm mt-2">
                        {error instanceof Error
                            ? "Invalid email or password"
                            : "Something went wrong. Please try again."}
                    </p>
                )}

                <Button
                    type="submit"
                    loading={isPending}
                    disabled={isPending}
                    className="mt-4 w-full"
                >
                    Login
                </Button>
            </form>
        </div>
    );
}
