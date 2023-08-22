"use client";

import { useMounted } from "@/hooks/use-mounted";
import React from "react";
import { Button } from "./button";
import { TrashIcon, ImageIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const isMounted = useMounted();

  if (!isMounted) {
    return null;
  }

  const onUploadImage = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                size="icon"
                variant="destructive"
                type="button"
                onClick={() => onRemove(url)}
              >
                <TrashIcon className="h-6 w-6" />
              </Button>
            </div>
            <Image className="object-cover" alt="upload" src={url} fill />
          </div>
        ))}
      </div>

      <div className="mt-10">
        <CldUploadWidget onUpload={onUploadImage} uploadPreset="r2aodnyj">
          {({ open }) => {
            const onClick = () => {
              open();
            };

            return (
              <Button
                type="button"
                disabled={disabled}
                variant="secondary"
                onClick={onClick}
              >
                <ImageIcon className="h-24 w-24" />
              </Button>
            );
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
};

export default ImageUpload;
