import type { Metadata } from "next"
import "./globals.css"
import ClientSideToastContainer from "./toastify"
import { CartProvider } from "./context/cartContext"

export const metadata: Metadata = {
  title: "Ctlst eCommerce",
  description: "A modern full-stack eCommerce software solution.",
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className='antialiased'
      >
        <ClientSideToastContainer />
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
