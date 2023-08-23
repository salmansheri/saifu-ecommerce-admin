"use client";

import { SignInType, SignInValidation } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const SignInForm = () => {
  const form = useForm<SignInType>({
    // @ts-ignore
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInType> = (data: SignInType) => {
    signIn("credentials", {
      ...data,
      callbackUrl: "/",
    });
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Card className="lg:w-[35vw]">
      <CardHeader>
        <CardTitle className="text-3xl">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="eg. JohnDoe@shop.com"
                    />
                  </FormControl>
                  <FormDescription>Enter Your Email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="Password"
                    />
                  </FormControl>
                  <FormDescription>Enter Your Password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button disabled={isLoading} type="submit">
                Sign in
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
