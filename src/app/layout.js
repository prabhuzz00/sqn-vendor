import ThemeProvider from "@/context/ThemeContext";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";
import "./responsive.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Ecommerce App Next Js",
  description: "Ecommerce App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <ClientLayout>
              <Header />
              {children}
              <ToastContainer />
              <Footer />
            </ClientLayout>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}