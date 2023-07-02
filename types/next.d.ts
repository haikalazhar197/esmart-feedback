import type {
  NextComponentType,
  NextPageContext,
  NextComponentWithLayoutType,
} from "next";
import type { Session } from "next-auth";
import type { Router } from "next/router";
import type { AppProps } from "next/app";
import React, { ReactNode, ReactElement, PropsWithChildren } from "react";

//   import { LayoutComponent } from "@components/Layout/typedefs"
export type LayoutComponent = React.FC<PropsWithChildren<{ title?: string }>>;

declare module "next" {
  type NextComponentWithLayoutType<P = {}> = NextComponentType<
    NextPageContext,
    any,
    P
  > & {
    Layout?: LayoutComponent;
    Title?: string;
  };
}

declare module "next/app" {
  type AppLayoutProps<P = Record<string, unknown>> = AppProps & {
    Component: NextComponentWithLayoutType;
    router: Router;
    __N_SSG?: boolean;
    __N_SSP?: boolean;
    pageProps: P & {
      // Component: NextComponentWithLayoutType;
      /** Initial session passed in from `getServerSideProps` or `getInitialProps` */
      session?: Session;
    };
  };
}
