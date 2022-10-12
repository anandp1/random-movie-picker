import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";

import "../../styles/globals.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig value={{ refreshInterval: 30000, revalidateOnFocus: false }}>
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
