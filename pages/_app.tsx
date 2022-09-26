import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Navigation } from '../components/Navigation';
import { Session } from 'next-auth';

const lightTheme = createTheme({
  type: 'light',
  theme: {
    fonts: {
      sans: 'Manrope, sans-serif',
    },
  },
});

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    fonts: {
      sans: 'Manrope, sans-serif',
    },
  },
});

// Use the <SessionProvider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      session={pageProps.session}
    >
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider
        // theme={theme}
        >
          <Navigation />
          <Component {...pageProps} />
        </NextUIProvider>
      </NextThemesProvider>
    </SessionProvider>
  );
}
