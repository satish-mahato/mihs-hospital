


import { PropsWithChildren } from "react";
import Header from "../components/layout/header/page";
import Footer from "../components/layout/footer/page";


function Layout({ children }: PropsWithChildren) {
  return (
    <div className="font-jost">
      <Header />
    
      <main className="flex-grow min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
