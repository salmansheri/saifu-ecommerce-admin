"use client";

import React from "react";

interface HeadingProps {
  title: string;
  subtitle?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <h3 className="text-xl">{subtitle}</h3>
    </div>
  );
};

export default Heading;
