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
import { signUp } from "~/store/slices/auth.slice";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const schema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().required("E-mail is required").email("Invalid email"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Password confirmation is required"),
}).required();

type FormInput = SignUpInput & { confirmPassword: string };

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormInput>({ resolver: yupResolver(schema) });

  const authenticated = useAppSelector((state) => state.auth.authenticated);
  const dispatch = useAppDispatch();

  const onSubmit = (input: FormInput) => {
    const { confirmPassword, ...signUpInput } = input;
    dispatch(signUp(signUpInput))
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
          <CardTitle>Create a new account</CardTitle>
          <CardDescription className="text-xs">
            Fill in the fields below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  type="text"
                  placeholder="John"
                  {...register("firstName")}
                />
                {errors.firstName?.message}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  type="text"
                  placeholder="Doe"
                  {...register("lastName")}
                />
                {errors.lastName?.message}
              </div>
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
                <Label htmlFor="password">Password</Label>
                <Input type="password" {...register("password")} />
                {errors.password?.message}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input type="password" {...register("confirmPassword")} />
                {errors.confirmPassword?.message}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="login" className="underline underline-offset-4">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
