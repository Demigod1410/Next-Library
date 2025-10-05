"use client";

import React from "react";
import LoginForm from "@/components/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect to library if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/library");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Login to Modern Book Library</h1>
        <p className="text-center text-muted-foreground mb-8">
          Access your personalized library experience
        </p>
        <LoginForm />
      </div>
    </div>
  );
}