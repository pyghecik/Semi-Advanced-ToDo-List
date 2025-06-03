import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Semi-Advanced ToDo-List",
  description: "Manage your tasks!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
