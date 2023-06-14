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
  );
}
