"use client";

import { toast } from "@/hooks/use-toast";
import { ProductType, ProductValidation } from "@/lib/validations/products";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Category,
  Color,
  Gender,
  Image,
  Product,
  Size,
  Store,
} from "@prisma/client";
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
import ImageUpload from "../ui/image-upload";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ProductFormProps {
  initialData?:
    | Product
    | (null & {
        images: Image[] | null;
      });
  categories?: Category[];

  sizes: Size[];
  colors: Color[];
  genders: Gender[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  sizes,
  colors,
  genders,
}) => {
  const params = useParams();
  const router = useRouter();
  const form = useForm<ProductType>({
    // @ts-ignore
    resolver: zodResolver(ProductValidation),
    defaultValues: initialData || {
      categoryId: "",
      colorId: "",
      images: [],
      price: 0,
      sizeId: "",
      isArchieved: false,
      isFeatured: false,
      name: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      categoryId,
      colorId,
      images,
      name,
      price,
      sizeId,
      isArchieved,
      isFeatured,
      genderId,
    }: ProductType) => {
      const payload: ProductType = {
        name,
        colorId,
        images,
        categoryId,
        isArchieved,
        isFeatured,
        sizeId,
        price,
        genderId,
      };

      if (initialData) {
        const { data } = await axios.patch(
          `/api/store/${params.storeId}/products/${initialData.id}`,
          payload
        );

        return data;
      } else {
        const { data } = await axios.post(
          `/api/store/${params.storeId}/products`,
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
    onSuccess: (data: Store) => {
      router.push(`/store/${params.storeId}/products`);
      router.refresh();
      return toast({
        title: "Product Successfully Created",
      });
    },
  });

  const { mutate: onDelete } = useMutation({
    mutationFn: async () => {
      await axios.delete(
        `/api/store/${params.storeId}/products/${initialData?.id}`
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
      return toast({
        title: "Deleted Successfully",
        description: "Store Deleted Successfully",
      });
    },
  });

  const onSubmit = (data: ProductType) => {
    const payload: ProductType = {
      categoryId: data.categoryId,
      colorId: data.colorId,
      images: data.images,
      price: Number(data.price),
      isArchieved: data.isArchieved,
      isFeatured: data.isFeatured,
      name: data.name,
      sizeId: data.sizeId,
      genderId: data.genderId,
    };

    console.log(data);

    mutate(payload);
  };
  return (
    <Card className="lg:w-[50vw]">
      <CardHeader>
        <div>
          <CardTitle className="text-3xl">
            {initialData ? "Update Products" : " Create Products"}
          </CardTitle>
          <CardDescription>
            {initialData
              ? "Update Your Products"
              : "Create Your Products to Continue"}
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols gap-8">
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field?.value?.map((image) => image.url)}
                        onChange={(url) => {
                          field.onChange([...field?.value, { url }]);
                        }}
                        onRemove={(url) => {
                          field.onChange([
                            ...field.value.filter(
                              (current) => current.url !== url
                            ),
                          ]);
                        }}
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="eg: Shoe"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        disabled={isLoading}
                        placeholder="eg: Super Stores"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Category</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select  Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genderId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Gender</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select  Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genders?.map((gender) => (
                          <SelectItem key={gender.id} value={gender.id}>
                            {gender.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Colors</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colors?.map((color) => (
                          <SelectItem key={color.id} value={color.id}>
                            {color.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sizeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Sizes</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sizes?.map((size) => (
                          <SelectItem key={size.id} value={size.id}>
                            {size.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
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

export default ProductForm;
