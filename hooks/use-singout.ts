"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useSignOut() {
  const router = useRouter();
  const handleSignout = async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Вихід виконано успішно");
        },
        onError: () => {
          toast.error("Не вдалося вийти з облікового запису");
        },
      },
    });
  };

  return handleSignout;
}
