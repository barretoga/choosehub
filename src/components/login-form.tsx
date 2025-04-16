"use client";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "~/hooks";
import { signIn } from "~/store/slices/auth.slice";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const schema = Yup.object({
  email: Yup.string().required("E-mail is required"),
  password: Yup.string().required("Password is required"),
}).required();

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<SignInInput>({ resolver: yupResolver(schema) });

  const authenticated = useAppSelector((state) => state.auth.authenticated);
  const dispatch = useAppDispatch();

  const onSubmit = (input: SignInInput) => {
    dispatch(signIn(input))
      .unwrap()
      .catch((error: ApiError) => {
        toast.error(error.message);
      });
  };

  if (authenticated) {
    redirect("/home");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription className="text-xs">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  {...register("email")}
                />
                {errors.email?.message}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/password-recovery"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input type="password" {...register("password")} />
                {errors.password?.message}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
