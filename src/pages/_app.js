import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultWallets,
  Chain,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig, chainaware } from "wagmi";
import { arbitrum, bsc } from "wagmi/chains";
import { Provider } from "react-redux";
import store from "@/store/index";

import { publicProvider } from "wagmi/providers/public";

let { chains, provider } = configureChains([arbitrum, bsc], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  chainaware,
});

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          showRecentTransactions={true}
          theme={darkTheme({
            overlayBlur: "small",
            accentColor: "#fff",
            accentColorForeground: "black",
          })}
          chains={chains}
          initialChain={arbitrum}
          coolMode
          {...true}
        >
          {" "}
            <Component className="bg-black min-h-screen" {...pageProps} />{" "}
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>

  );
}
