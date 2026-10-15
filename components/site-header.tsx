"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Home, Sparkles, User, Mail, BookOpen } from "lucide-react";

const navItems = [
  { href: "/#top", label: "หน้าหลัก", id: "top", icon: Home },
  { href: "/#works", label: "ผลงาน", id: "works", icon: Sparkles },
  { href: "/#about", label: "เรื่องส่วนตัว", id: "about", icon: User },
    { href: "/#journal", label: "บันทึก", id: "journal", icon: BookOpen },
  { href: "/#contact", label: "ติดต่อ", id: "contact", icon: Mail },
] as const;

export function SiteHeader() {
  const [activeSection, setActiveSection] = useState<string>("top");
  const [bkkTime, setBkkTime] = useState<string>("");
  const pathname = usePathname();
  const isBlogPage = pathname.startsWith("/blog");
  const isClickScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Live Bangkok Time
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Bangkok",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
        setBkkTime(`${timeStr} @ bkk`);
      } catch {
        setBkkTime("bkk");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Track active section on scroll (only when user manually scrolls)
  useEffect(() => {
    const handleScroll = () => {
      // If user recently clicked a tab, ignore scroll events to prevent pill jitter
      if (isClickScrollingRef.current) return;

      // If at the very bottom of page, highlight contact
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      const sections = ["top", "works", "about", "journal", "contact"];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (targetId === "blog" || window.location.pathname !== "/") return;
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (!el && targetId !== "top") return;

    // 1. Immediately lock to the target tab so the background pill glides cleanly
    isClickScrollingRef.current = true;
    setActiveSection(targetId);
    window.history.pushState(null, "", `#${targetId}`);

    // 2. Perform smooth scroll
    if (targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (el) {
      const offset = window.innerWidth < 640 ? 60 : 90;
      const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }

    // 3. Unlock scroll tracking once the smooth scroll has finished
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 750);
  };

  return (
    <>
      {/* =========================================
          1. DESKTOP NAVBAR: Floating Island Top Dock (sm and up)
         ========================================= */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 hidden justify-center p-4 pointer-events-none md:flex lg:p-5"
      >
        <div className="pointer-events-auto flex items-center justify-between gap-5 rounded-full border border-ink/10 bg-card/85 px-4 py-2 backdrop-blur-md shadow-[0_8px_30px_rgba(43,38,34,0.06)] transition-all">
          {/* Brand */}
          <Link
            href="/#top"
            onClick={(e) => handleNavClick(e, "top")}
            className="group flex items-center gap-2 pr-2 text-ink transition-opacity hover:opacity-85"
          >
            <div className="relative size-6 shrink-0 overflow-hidden rounded-full ring-1 ring-ink/15">
              <Image
                src="/avatar.svg"
                alt="FEYE Avatar"
                width={24}
                height={24}
                className="size-full object-cover"
                priority
              />
            </div>
            <span className="font-hero text-sm font-bold tracking-wide">FEYE</span>
          </Link>

          <span className="h-4 w-px bg-ink/10" />

          {/* Nav Items with Sliding Pill Indicator */}
          <nav aria-label="Main Navigation" className="relative flex items-center gap-1">
            {navItems.map((item) => {
const isActive = item.id === "journal"
  ? isBlogPage || activeSection === "journal"
  : !isBlogPage && activeSection === item.id;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className="relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors"
                >
                  {isActive && (
                    <motion.span
                      layoutId="desktop-navbar-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive ? "font-semibold text-paper" : "text-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <span className="h-4 w-px bg-ink/10" />

          {/* Clock */}
          <div className="flex items-center gap-1.5 rounded-full border border-ink/6 bg-paper/70 px-2.5 py-1 font-mono text-[11px] text-ink/75">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{bkkTime || "bkk"}</span>
          </div>
        </div>
      </motion.header>

      {/* =========================================
          2. MOBILE TOP BAR: Minimal Brand + Status
         ========================================= */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-ink/8 bg-paper/90 px-4 py-3 backdrop-blur-md sm:px-5 md:hidden"
      >
        <Link
          href="/#top"
          onClick={(e) => handleNavClick(e, "top")}
          className="flex items-center gap-2"
        >
          <div className="relative size-6 shrink-0 overflow-hidden rounded-full ring-1 ring-ink/15">
            <Image
              src="/avatar.svg"
              alt="FEYE Avatar"
              width={24}
              height={24}
              className="size-full object-cover"
              priority
            />
          </div>
          <span className="font-hero text-sm font-bold tracking-wide text-ink">FEYE</span>
        </Link>

        <div className="flex items-center gap-1.5 rounded-full border border-ink/8 bg-card px-2.5 py-1 font-mono text-[10px] text-ink/75">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{bkkTime || "bkk"}</span>
        </div>
      </motion.div>

      {/* =========================================
          3. MOBILE BOTTOMBAR: Floating Thumb-Friendly Nav
         ========================================= */}
      <motion.nav
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Mobile Navigation"
        className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 pointer-events-none sm:px-4 md:hidden"
      >
        <div className="pointer-events-auto grid w-full max-w-sm grid-cols-5 items-center gap-1 rounded-full border border-ink/12 bg-card/92 p-1.5 shadow-[0_8px_32px_rgba(43,38,34,0.12)] backdrop-blur-lg sm:max-w-md">
          {navItems.map((item) => {
            const Icon = item.icon;
              const isActive = item.id === "journal"
              ? isBlogPage || activeSection === "journal"
              : !isBlogPage && activeSection === item.id;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-current={isActive ? "page" : undefined}
                className="relative flex flex-col items-center justify-center gap-1 rounded-full py-2 text-center transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-navbar-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon
                  className={`relative z-10 size-4 transition-colors duration-200 ${
                    isActive ? "text-paper" : "text-muted"
                  }`}
                  strokeWidth={isActive ? 2.25 : 1.75}
                />
                <span
                  className={`relative z-10 text-[10px] leading-none transition-colors duration-200 ${
                    isActive ? "font-bold text-paper" : "font-medium text-muted"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
