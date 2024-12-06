import {
  FrontLayoutContainer,
  FrontLayoutHeader,
  FrontLayoutMain,
  FrontLayoutRoot,
  FrontLayoutMobileOverlay,
  FrontLayoutNavbarMobile,
  FrontLayoutBurger,
} from "@faastsaas/ui/layout";
import { Logo, LogoDescription } from "@faastsaas/ui/logo";
import { ReactNode } from "react";

export default function FrontLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <FrontLayoutRoot>
      <FrontLayoutMobileOverlay />
      <FrontLayoutHeader>
        <FrontLayoutContainer className="flex items-center">
          <FrontLayoutBurger />
          <Logo>
            FaastSaas
            <LogoDescription>Early Access</LogoDescription>
          </Logo>
        </FrontLayoutContainer>
      </FrontLayoutHeader>
      <FrontLayoutNavbarMobile>
        Front Layout Navbar Mobile
      </FrontLayoutNavbarMobile>
      <FrontLayoutMain>{children}</FrontLayoutMain>
    </FrontLayoutRoot>
  );
}
