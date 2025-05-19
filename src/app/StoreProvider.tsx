"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "@/lib/store";
import { UserInfo } from "@/lib/types";
import SessionHydrator from "./SessionHydrator";

type StoreProviderProps = {
  children: React.ReactNode;
  initialSession: UserInfo | null;
};

export default function StoreProvider({
  children,
  initialSession,
}: StoreProviderProps) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <SessionHydrator initialSession={initialSession} />
      {children}
    </Provider>
  );
}
