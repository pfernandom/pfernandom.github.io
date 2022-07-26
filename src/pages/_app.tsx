/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';

import '../styles/global.scss';
import '../styles/layout.scss';

import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { AnimatePresence, MotionConfig } from 'framer-motion';

import Heading from 'src/components/heading';
import { DefaultSeo } from 'next-seo';
import SocialAndContact from 'src/components/social';
import { Metadata, PostInfo } from 'src/models/interfaces';

import * as gtag from '../helpers/gtag';

let visitedPages = [];

export interface PageInfo {
  data: unknown;
  metadata: Metadata;
  post?: PostInfo;
  posts?: Array<PostInfo>;
  content?: string;
}

interface MyAppProps extends AppProps {
  pageProps: PageInfo;
}

const pageToClassName = {
  '/': 'page1',
  '/about': 'page3',
};

export default function MyApp({ Component, pageProps }: MyAppProps) {
  const router = useRouter();

  visitedPages.unshift(router.pathname);
  if (!visitedPages.includes(router.pathname)) {
    visitedPages = visitedPages.slice(0, 2);
  }
  const [current, lastVisited] = visitedPages;

  const getClassNameForRoute = () => {
    const currentPageClass = pageToClassName[current] ?? 'page2';
    const lastPageClass = pageToClassName[lastVisited] ?? 'page2';

    if (lastVisited) {
      return `curr-${currentPageClass}-prev-${lastPageClass}`;
    }

    return currentPageClass;
  };

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <DefaultSeo
        title="CV - Pedro Marquez-Soto"
        description={pageProps.metadata.description}
        twitter={{
          handle: '@pfernandom',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />

      <MotionConfig reducedMotion="user">
        <SocialAndContact />
        <Heading title={pageProps.post?.frontmatter.title ?? 'Full-stack engineer'} />

        <div className={getClassNameForRoute()}>
          <AnimatePresence
            key="animatePrescence"
            exitBeforeEnter
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <Component key="body" {...pageProps} />
          </AnimatePresence>
        </div>
      </MotionConfig>
    </>
  );
}
