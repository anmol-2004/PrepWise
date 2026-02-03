"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface NavButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function NavButton({ href, children, className }: NavButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleNavigate = () => {
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <Button 
      onClick={handleNavigate} 
      disabled={isPending}
      className={className}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  );
}