import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";

interface IProps {
  children: ReactNode;
}

export default function CommonLayout({ children }: IProps) {
  return (
    <div className="container mx-auto">
      <div className="min-h-screen flex flex-col">
        <Navbar></Navbar>
        <div className="grow-1">{children}</div>
        <ScrollToTop />
        <Footer></Footer>
      </div>
    </div>
  );
}
