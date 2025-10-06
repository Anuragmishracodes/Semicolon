import "./globals.css";

export const metadata = {
  title: "Semicolon",
  description: "Your app description here",
  icons: {
    icon: "/logo.svg", // public folder se pick karega
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
