import { FC } from 'react';

import { Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import theme from '../utils/lightThemeOptions';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from 'utils/createEmotionCache';
import { createTheme } from '@mui/material';
import lightThemeOptions from '../utils/lightThemeOptions';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();
const lightTheme = createTheme(lightThemeOptions);

const MyApp: FC<MyAppProps> = (props) => {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <Fragment>
          <Head>
            <title>Store - Fashion Clothes</title>
            <link href="/favicon.ico" rel="icon" />

            <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
            {/*SEO*/}

            <meta name="description" content="Find the latest fashion clothes at the best price" />
          </Head>
          <CssBaseline />
          <Component {...pageProps} />
        </Fragment>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
