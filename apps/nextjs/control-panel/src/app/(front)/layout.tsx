import { ReactNode } from "react";
import { Layout } from "@/components/Layout/Layout";

export default function FrontLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
