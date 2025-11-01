import { Fredoka } from 'next/font/google';
import QueryProvider from './providers';
import type { Metadata } from 'next';
import '@/styles/main.scss';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/shadcn/sonner';

const fredoka = Fredoka({
    subsets: ['latin'],
    variable: '--font-fredoka',
    display: 'swap',
});

export const metadata: Metadata = {
  title: 'Project Catalyst',
  description: "A tool for tracking a company's initiatives",
  icons: {
      icon: [
          { url: '/favicon/favicon.ico' },
          { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
          { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
          { url: '/favicon/apple-touch-icon.png', sizes: '180x180' },
      ],
  },
  manifest: '/favicon/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en">
      <body className={ `${fredoka.variable} antialiased` }>
        <QueryProvider>
            <div className="site-container">
                <div className="full-height">
                    { children }
                </div>
                <Footer />
            </div>
            <Toaster position="top-center" expand={ true } duration={ 6000 } richColors closeButton />
        </QueryProvider>
      </body>
    </html>
  );
}
