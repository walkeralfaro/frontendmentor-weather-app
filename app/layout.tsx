import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  weight: ["300", "500", "600", "700"],
  subsets: ["latin"],
})

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  weight: ["700"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Weather App",
  description: "Weather App with Open Meteo - Next.js, Shadcn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${bricolageGrotesque.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="fixed bottom-2 right-2">
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
