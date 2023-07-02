/*
  STYLES
*/
import "../styles/globals.css";

/*
  TYPES
*/
import type { AppLayoutProps } from "next/app";

/*
  LAYOUT
*/
import { PublicLayout } from "@/layout/Publiclayout";

/*
  AUTH
*/
// import { SessionProvider } from "next-auth/react";

/*
  TRPC
*/
// import { trpc } from "@lib/trpc";

function App({ Component, pageProps }: AppLayoutProps) {
  const Layout = Component.Layout || PublicLayout;
  const Title = Component.Title;

  return (
    // <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
    <Layout title={Title}>
      <Component {...pageProps} />
    </Layout>
    // </SessionProvider>
  );
}

export default App;
