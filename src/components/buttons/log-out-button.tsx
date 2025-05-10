"use client";

export default function LogOutButton() {
  return (
    <button
      onClick={() => {
        document.cookie =
          "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }}
    >
      Log out
    </button>
  );
}
