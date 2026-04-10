import { inter, playfair, jetbrains, spaceGrotesk } from '@/lib/fonts';
import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';
import Script from 'next/script'

export const metadata = {
  title: 'Z Soft | AI & Web Solutions That Transform Businesses',
  description: 'Z Soft is a leading IT services company specializing in web development, AI solutions, and custom software. We build powerful applications that drive business growth.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-base text-text-primary selection:bg-violet selection:text-white overflow-x-hidden">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
