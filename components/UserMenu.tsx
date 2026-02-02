"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "@/lib/actions/auth.action";
import { Button } from "./ui/button";
import { LogOut, User, Mail, ChevronDown } from "lucide-react"; // Optional: install lucide-react for icons

export default function UserMenu({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar / Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-full cursor-pointer"
      >
        <div className="h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center text-black font-semibold shadow-sm">
          {user.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-[100] overflow-hidden animate-in fade-in zoom-in duration-200">
          {/* User Info Header */}
          <div className="p-4 border-b bg-gray-50/50">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Account</p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-black text-lg">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col truncate">
                <span className="text-sm font-bold text-gray-800 truncate">{user.name}</span>
                <span className="text-xs text-gray-500 truncate">{user.email}</span>
              </div>
            </div>
          </div>

          {/* Menu Actions */}
          <div className="p-2">
            <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
              <User className="w-4 h-4" />
              <span>Profile Settings</span>
            </div>
            
            <hr className="my-2 border-gray-100" />
            
            <button
              onClick={async () => {
                await signOut();
                window.location.href = "/sign-in"; // Force redirect after logout
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}