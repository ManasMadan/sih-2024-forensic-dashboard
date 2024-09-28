"use client";

import { Props, GridLayout } from "react-grid-layout-next";
import { useState, useEffect } from "react";
import React from "react";

export default function GridLayoutClient(props: Partial<Props>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <GridLayout {...props}>{props.children}</GridLayout>;
}
