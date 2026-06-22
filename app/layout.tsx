import type { Metadata } from "next";
import React from "react";
import { StyledComponentsRegistry } from "./registry";
import "./globals.css";

export const metadata: Metadata = {
  title: "Liquid Neumorphic UI Kit",
  description: "A Next.js component library in a soft liquid-neumorphic interaction style.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
