import "./styles/globals.css";

export const metadata = {
  title: "Chatwave",
  description: "Это мой сайт на Next.js",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark:bg-black dark:text-white">
        {children}
      </body>
    </html>
  );
}
