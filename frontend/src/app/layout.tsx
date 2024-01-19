'use client'
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryQlient = new QueryClient;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryQlient}>
          <CssBaseline/>
          <html lang="en">
          <body>
          {children}
          </body>
          </html>
        </QueryClientProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
