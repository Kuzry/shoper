import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => (
  <div className="bg-red px-8 py-4">{children}</div>
);
