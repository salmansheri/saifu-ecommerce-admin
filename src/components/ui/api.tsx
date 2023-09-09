"use client";

import React from "react";
import ApiAlert from "./api-alert";
import { useParams } from "next/navigation";
import { useOrigin } from "@/hooks/use-origin";

interface ApiInterface {
  entityIdName: string;
  entityName: string;
}

const Api: React.FC<ApiInterface> = ({ entityIdName, entityName }) => {
  const params = useParams();

  const origin = useOrigin();
  const baseURL = `${origin}/api/store/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseURL}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseURL}/${entityIdName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseURL}/${entityName}/${entityIdName}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseURL}/${entityName}/${entityIdName}`}
      />
    </>
  );
};

export default Api;
