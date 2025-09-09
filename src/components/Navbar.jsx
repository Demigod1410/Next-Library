"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Sun, Moon, BookOpen, Upload, Home } from "lucide-react";
import { useTheme } from "next-themes";
import PropTypes from "prop-types";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="mr-2"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
};

const NavItems = ({ className = "", direction = "horizontal" }) => {
  const pathname = usePathname();
  
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/library", label: "Library", icon: BookOpen },
    { path: "/upload", label: "Upload", icon: Upload },
  ];
  
  return (
    <nav className={className}>
      <ul className={`flex ${direction === "vertical" ? "flex-col space-y-4" : "space-x-4"}`}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <li key={item.path}>
              <Link href={item.path}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={`${direction === "vertical" ? "w-full justify-start" : ""}`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

NavItems.propTypes = {
  className: PropTypes.string,
  direction: PropTypes.oneOf(["horizontal", "vertical"]),
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <div className="px-2 py-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl mb-8 text-primary">
            <BookOpen className="h-6 w-6" />
            <span>Book Library</span>
          </Link>
          <NavItems direction="vertical" />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center max-w-7xl">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center">
            <MobileNav />
            <Link href="/" className="hidden md:flex items-center gap-2 font-bold text-xl text-primary">
              <BookOpen className="h-5 w-5" />
              <span>Modern Book Library</span>
            </Link>
          </div>
          <NavItems className="hidden md:block" />
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
