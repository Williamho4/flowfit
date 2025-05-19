"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSession } from "@/lib/features/session/sessionSlice";
import { UserInfo } from "@/lib/types";

export default function SessionHydrator({
  initialSession,
}: {
  initialSession: UserInfo | null;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialSession) {
      dispatch(setSession(initialSession));
    }
  }, [initialSession, dispatch]);

  return null;
}
