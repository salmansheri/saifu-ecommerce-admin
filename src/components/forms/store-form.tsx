"use client";

import { Store } from "@prisma/client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StoreType, StoreValidation } from "@/lib/validations/store";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { TrashIcon, UpdateIcon } from "@radix-ui/react-icons";

interface StoreFormProps {
  initialData?: Store;
}

const StoreForm: React.FC<StoreFormProps> = ({ initialData }) => {
  const router = useRouter();
  const form = useForm<StoreType>({
    // @ts-ignore
    resolver: zodResolver(StoreValidation),
    defaultValues: initialData || {
      name: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({ name }: StoreType) => {
      const payload = {
        name,
      };

      if (initialData) {
        const { data } = await axios.patch(
          `/api/store/${initialData.id}`,
          payload
        );

        return data;
      } else {
        const { data } = await axios.post("/api/store", payload);

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
    onSuccess: (data: Store) => {
      router.push(`/store/${data.id}/update`);
      router.refresh();
      return toast({
        title: "Store Successfully Created",
      });
    },
  });

  const { mutate: onDelete } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/store/${initialData?.id}`);
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
      return toast({
        title: "Deleted Successfully",
        description: "Store Deleted Successfully",
      });
    },
  });

  const onSubmit = (data: StoreType) => {
    const payload: StoreType = {
      name: data.name,
    };

    mutate(payload);
  };
  return (
    <Card className="lg:w-[50vw]">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="text-3xl">
            {initialData ? "Update Store" : " Create Store"}
          </CardTitle>
          <CardDescription>
            {initialData
              ? "Update Your Store"
              : "Create Your Store to Continue"}
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
                  <FormLabel>Store</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="eg: Super Stores"
                      {...field}
                    />
                  </FormControl>
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

export default StoreForm;
