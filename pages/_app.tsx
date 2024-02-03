import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import Inner from "@/components/inner";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <AnimatePresence mode="wait">
      <main className="p-2.5 min-h-screen h-full bg-royal" key={router.route}>
        <div className="border border-royal h-full rounded-[18px] bg-cream relative">
          <Component {...pageProps} />
          <Inner />
        </div>
      </main>
    </AnimatePresence>
  );
}
