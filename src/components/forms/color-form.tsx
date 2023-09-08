"use client";

import { toast } from "@/hooks/use-toast";
import { CategoryType, CategoryValidation } from "@/lib/validations/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Color, Store } from "@prisma/client";
import { TrashIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ColorType, ColorValidation } from "@/lib/validations/colors";

interface ColorFormProps {
  initialData?: Color | null;
  colors?: Color[];
}

const ColorForm: React.FC<ColorFormProps> = ({ initialData, colors }) => {
  const params = useParams();
  const router = useRouter();
  const form = useForm<ColorType>({
    // @ts-ignore
    resolver: zodResolver(ColorValidation),
    defaultValues: initialData || {
      value: "",
      name: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ value, name }: ColorType) => {
      const payload = {
        value,
        name,
        storeId: params.storeId,
      };

      if (initialData) {
        const { data } = await axios.patch(
          `/api/store/${params.storeId}/colors/${initialData.id}`,
          payload
        );

        return data;
      } else {
        const { data } = await axios.post(
          `/api/store/${params.storeId}/colors`,
          payload
        );

        return data;
      }
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error?.response?.status === 401) {
          router.push("/sign-in");
          return toast({
            title: "Unauthorized",
            description: "Please Sign in",
            variant: "destructive",
          });
        }

        if (error?.response?.status === 400) {
          return toast({
            title: "Invalid data",
            description: "Please fill every Fields",
            variant: "destructive",
          });
        }
        if (error?.response?.status === 500) {
          return toast({
            title: "Internal Server Error",
            description: "Please fill every Fields",
            variant: "destructive",
          });
        }
        if (error?.response?.status === 422) {
          return toast({
            title: "Not Allowed",
            description: "Invalid Data",
            variant: "destructive",
          });
        }
      }
      return toast({
        title: "Something went Wrong",
        description: "Please Try Again",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      router.push(`/store/${params.storeId}/colors`);
      router.refresh();
      return toast({
        title: "Color  Successfully Created",
      });
    },
  });

  const { mutate: onDelete } = useMutation({
    mutationFn: async () => {
      await axios.delete(
        `/api/store/${params.storeId}/colors/${initialData?.id}`
      );
    },
    onError: (error) => {
      return toast({
        title: "Cannot Delete",
        description: "Please Try Again",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      router.push(`/store/${params.storeId}/colors`);
      return toast({
        title: "Deleted Successfully",
        description: "Store Deleted Successfully",
      });
    },
  });

  const onSubmit = (data: ColorType) => {
    const payload: ColorType = {
      value: data.value,
      name: data.name,
    };

    mutate(payload);
  };
  return (
    <Card className="lg:w-[50vw]">
      <CardHeader>
        <div>
          <CardTitle className="text-3xl">
            {initialData ? "Update Colors" : " Create Colors"}
          </CardTitle>
          <CardDescription>
            {initialData
              ? "Update Your Colors"
              : "Create Your Colors to Continue"}
          </CardDescription>
        </div>
        {initialData && (
          <Button onClick={() => onDelete()} size="icon" variant="destructive">
            <TrashIcon className="h-5 w-5" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="eg: black"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="eg: #111"
                      {...field}
                    />
                  </FormControl>
                  <div
                    className="h-9 w-9 rounded-full"
                    style={{
                      backgroundColor: field.value,
                    }}
                  ></div>
                </FormItem>
              )}
            />

            <div>
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full lg:w-fit"
              >
                {isLoading ? (
                  <>
                    <UpdateIcon className="h-4 w-4 animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  <>{initialData ? <>Update</> : <>Create</>}</>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ColorForm;
