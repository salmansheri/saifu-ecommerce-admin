"use client";

import React from "react";

interface ApiInterface {
  title: string;
}

const Api: React.FC<ApiInterface> = ({ title }) => {
  return (
    <div className="my-16">
      <div>
        <h1 className="text-2xl">Api Keys</h1>
      </div>
      <div className="mt-5">
        <h3>Get {title}</h3>
      </div>
    </div>
  );
};

export default Api;
