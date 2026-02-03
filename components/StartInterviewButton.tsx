"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function StartInterviewButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    // startTransition tracks the navigation state
    startTransition(() => {
      router.push("/interview");
    });
  };

  return (
    <Button 
      onClick={handleClick} 
      disabled={isPending}
      className="btn-primary max-sm:w-full"
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        "Start an Interview"
      )}
    </Button>
  );
}