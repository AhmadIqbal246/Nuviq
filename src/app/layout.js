import { inter, playfair, jetbrains } from '@/lib/fonts';
import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';

export const metadata = {
  title: 'Personal Portfolio | Fully Animated',
  description: 'An award-winning creative portfolio with high-end animations.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <body className="bg-base text-text-primary selection:bg-violet selection:text-white overflow-x-hidden">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
