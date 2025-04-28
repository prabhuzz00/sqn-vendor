"use client";
import { usePathname } from "next/navigation";
import ProtectedLayout from "@/components/ProtectedLayout";

// Define protected routes in one place
const PROTECTED_ROUTES = ["/my-account", "/my-orders", "/my-list", "/my-account/address"]; // Add more routes as needed

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Check if the current route is protected
  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  return isProtected ? <ProtectedLayout>{children}</ProtectedLayout> : children;
}