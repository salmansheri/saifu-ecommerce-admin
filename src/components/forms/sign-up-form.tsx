"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpType, SignUpValidation } from "@/lib/validations/user";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import ImageUpload from "../ui/image-upload";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SignUpForm = () => {
  const router = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ name, email, password, image }: SignUpType) => {
      const payload = {
        name,
        email,
        password,
        image,
      };

      const { data } = await axios.post("/api/user", payload);
      return data;
    },

    onError: (error) => {
      return toast({
        title: "Something went Wrong",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      router.push("/sign-in");
      return toast({
        title: "Registered Successfully",
      });
    },
  });
  const form = useForm<SignUpType>({
    // @ts-ignore
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpType> = (data: SignUpType) => {
    const payload: SignUpType = {
      name: data.name,
      email: data.email,
      password: data.password,
      image: data.image,
    };

    mutate(payload);
  };

  return (
    <Card className="lg:w-[35vw]">
      <CardHeader>
        <CardTitle className="text-3xl">Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      {...field}
                      placeholder="eg. John Doe"
                    />
                  </FormControl>
                  <FormDescription>Enter Your Name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-10">Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      // @ts-ignore
                      value={[field.value]}
                      onChange={field.onChange}
                      onRemove={() => field.onChange("")}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>Upload your Profile</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button disabled={isLoading} type="submit">
                Sign Up
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>
          Already Have an Account?{" "}
          <Link
            className={cn(
              buttonVariants({
                variant: "link",
              })
            )}
            href="sign-in"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
