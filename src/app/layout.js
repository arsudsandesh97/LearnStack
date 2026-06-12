import '@/styles/globals.css';
import '@/styles/markdown.css';
import '@/styles/landing.css';
import '@/styles/auth.css';
import '@/styles/docs.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'Learning Docs — Private Documentation Platform',
  description: 'A secure, modern documentation platform for collaborative learning. Access organized educational content with clean navigation and a premium reading experience.',
  keywords: 'documentation, learning, private, education, knowledge base',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
