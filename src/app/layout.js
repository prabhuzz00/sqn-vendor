import ThemeProvider from "@/context/ThemeContext";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";
import "./responsive.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { ToastContainer } from "react-toastify";
import { LanguageProvider } from "@/context/LanguageContext";
import WhatsAppChat from "@/components/WhatsAppChat/page";

export const metadata = {
  title: "Soouqna Seller",
  description: "Soouqna Seller Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <ClientLayout>
              <LanguageProvider>
                <Header />
                {children}
                <ToastContainer />
                <WhatsAppChat/>
                <Footer />
              </LanguageProvider>
            </ClientLayout>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
