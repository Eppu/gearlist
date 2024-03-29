import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Navigation } from '../components/Navigation';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import ProgressBar from '../components/ProgressBar';

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
        <ProgressBar />
        <NextUIProvider>
          <Navigation />
          {
            // if the current route is /onboarding, don't use Auth wrapper
            Component.name === 'Onboarding' ? (
              (console.log("onboarding page, don't use auth wrapper"), (<Component {...pageProps} />))
            ) : (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            )
          }
        </NextUIProvider>
      </NextThemesProvider>
    </SessionProvider>
  );
}

function Auth({ children }: React.PropsWithChildren<{}>) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isOnboardedUser = !!session?.user.username;

  useEffect(() => {
    if (status === 'loading') {
      // Do nothing while loading
      return;
    }

    if (session && !isOnboardedUser) {
      // If not onboarded, force user to /onboarding
      router.push('/onboarding');
    }
  }, [status, isOnboardedUser, session, router]);

  if (!session || isOnboardedUser || router.route === '/onboarding') {
    return children as React.ReactElement;
  }

  // Session is being fetched, or no onboarded user
  return null;
}
