"use client"

import {
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Zap,
  Sparkles,
  ChevronLeft,
  Plus,
  RotateCcw,
  Minus,
  Sun,
  Moon,
  Loader2,
  Server,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

import { Input, Button, Checkbox } from "../../index"

interface LoginFormProps {
  username: any
  setUsername: any
  password: any
  setPassword: any
  message: any
  handleFormSubmit: any
  handleDemoClick: any
  residentialStatus: any
  setResidentialStatus: any
  isDayscholarWithBus: any
  setIsDayscholarWithBus: any
  activeApi: string
  onApiChange: (newUrl: string) => void
  primaryApiUrl: string
  backupApiUrl: string
}

export default function LoginForm({
  username,
  setUsername,
  password,
  setPassword,
  message,
  handleFormSubmit,
  handleDemoClick,
  residentialStatus,
  setResidentialStatus,
  isDayscholarWithBus,
  setIsDayscholarWithBus,
  activeApi,
  onApiChange,
  primaryApiUrl,
  backupApiUrl,
}: LoginFormProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isLoading = message.startsWith("Logging")
  const [showPassword, setShowPassword] = useState(false)
  const [showLoginCard, setShowLoginCard] = useState(false)

  // Scrolled state for transparent navbar transition
  const [isScrolled, setIsScrolled] = useState(false)

  // FAQ states
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Attendance simulator states
  const [mockAttended, setMockAttended] = useState(17)
  const [mockTotal, setMockTotal] = useState(20)
  const mockPercent = mockTotal > 0 ? (mockAttended / mockTotal) * 100 : 0

  const handleSimulateAttend = () => {
    setMockAttended((prev) => prev + 1)
    setMockTotal((prev) => prev + 1)
  }

  const handleSimulateSkip = () => {
    setMockTotal((prev) => prev + 1)
  }

  const handleSimulateReset = () => {
    setMockAttended(17)
    setMockTotal(20)
  }

  // Skip status calculation
  const getSkipStatus = () => {
    if (mockPercent < 75) {
      return {
        text: "Critical: Attendance below 75% limit!",
        color: "text-danger bg-danger-soft border border-danger/20",
      }
    }
    const maxTotal = Math.floor(mockAttended / 0.75)
    const skipCount = maxTotal - mockTotal
    if (skipCount > 0) {
      return {
        text: `Safe to skip: Yes (${skipCount} class${skipCount > 1 ? "es" : ""})`,
        color: "text-ok bg-ok-soft border border-ok/20",
      }
    }
    return {
      text: "Borderline: Exactly 75%. Do not skip.",
      color: "text-warn bg-warn-soft border border-warn/20",
    }
  }

  const skipStatus = getSkipStatus()
  const radius = 24
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (Math.min(mockPercent, 100) / 100) * circumference

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  const toggleTheme = () => {
    if (typeof document !== "undefined" && (document as any).startViewTransition) {
      ;(document as any).startViewTransition(() => {
        setTheme(isDark ? "light" : "dark")
      })
    } else {
      setTheme(isDark ? "light" : "dark")
    }
  }

  const features = [
    {
      emoji: "📅",
      title: "Attendance Tracker",
      desc: "Predict safety margins and skip lists instantly with an offline-first calculator.",
    },
    {
      emoji: "🎓",
      title: "Academics Hub",
      desc: "Access courses, grade lists, schedules, and active curriculum structures.",
    },
    {
      emoji: "📈",
      title: "CGPA Predictor",
      desc: "Set target grades, calculate SGPA distributions, and monitor credit levels.",
    },
    {
      emoji: "👨‍🏫",
      title: "Faculty Explorer",
      desc: "Search professor cabinets, designations, emails, and student feedback.",
    },
    {
      emoji: "🏠",
      title: "Hostel & Logistics",
      desc: "Check daily mess menus, visual room details, counseling slots, and leaves.",
    },
    {
      emoji: "📚",
      title: "Question Bank",
      desc: "Search and download previous years' exam question papers offline.",
    },
    {
      emoji: "❤️",
      title: "FFCS Wishlist",
      desc: "Draft mock wishlist classes to prepare for upcoming registration sessions.",
    },
    {
      emoji: "💳",
      title: "Payments Ledger",
      desc: "Track tuition transactions, invoice records, and pending fee structures.",
    },
    {
      emoji: "📖",
      title: "Libraries search",
      desc: "Search the OPAC catalog books and view checkouts from Koha accounts.",
    },
    {
      emoji: "📅",
      title: "FFCS Planner",
      desc: "Design draft schedules and check slot collisions before registration.",
    },
    {
      emoji: "🎉",
      title: "Event Hub",
      desc: "View upcoming club events, register profiles, and secure ticket passes.",
    },
  ]

  const companionTimeline = [
    {
      time: "08:00 AM",
      title: "Timetable Check",
      desc: "AmazeCC wakes up with a clean view of today's schedule, locations, and attendance.",
    },
    {
      time: "11:00 AM",
      title: "Interactive Skip",
      desc: "Want to skip a slot? Check the simulator to see if you stay above the 75% limit.",
    },
    {
      time: "01:30 PM",
      title: "Mess Menu",
      desc: "Check what food is scheduled for lunch directly on the hostel panel.",
    },
    {
      time: "04:30 PM",
      title: "Library Check",
      desc: "Search OPAC catalogs for reference books and verify return dates.",
    },
    {
      time: "06:00 PM",
      title: "Event Listing",
      desc: "Discover upcoming club hackathons, workshops, and register passes.",
    },
    {
      time: "09:00 PM",
      title: "Wishlist Drafting",
      desc: "Plan course slot selections for the upcoming semester's FFCS.",
    },
  ]

  const benefits = [
    {
      title: "Everything in one place",
      desc: "No more loading VTOP, Koha, EventHub, and Mess PDFs separately.",
    },
    {
      title: "Privacy First",
      desc: "100% local processing. Your passwords and keys never leave your browser.",
    },
    {
      title: "Offline Support",
      desc: "Your schedule, marks, and attendance details are cached for instant offline lookup.",
    },
    {
      title: "Lightning Fast",
      desc: "Optimized bundle sizes and lightweight state loads make queries instant.",
    },
  ]

  const roadmap = [
    {
      status: "In Progress",
      title: "AI Assistant",
      desc: "Intelligent chatbot to answer questions about slots and exams.",
    },
    {
      status: "Planned",
      title: "Placement Tracker",
      desc: "Log active job listings and requirements inside the profile.",
    },
    {
      status: "Planned",
      title: "Smart Notifications",
      desc: "Reminders for class timings and pending library checkouts.",
    },
    {
      status: "Backlog",
      title: "Expense Manager",
      desc: "Log pocket money and food purchases inside hostel tabs.",
    },
  ]

  const faqs = [
    {
      q: "Is this official?",
      a: "No. AmazeCC is an independent, student-designed project built to provide a clean companion UI. It speaks directly to official portals securely.",
    },
    {
      q: "Is it free?",
      a: "Yes. AmazeCC is completely free and student-focused with zero advertisements or subscription plans.",
    },
    {
      q: "Does it store passwords?",
      a: "No. All authentication occurs directly on your client browser. Credentials and sessions are preserved in your local browser cache securely.",
    },
    {
      q: "Can alumni use it?",
      a: "Yes. Any student with active credentials can synchronize history and inspect catalogs.",
    },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background text-ink flex flex-col justify-between selection:bg-accent/30 overflow-x-hidden relative font-sans transition-colors duration-300">
      {/* Inline Floating Animation CSS */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(0.3deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--line-2)_1px,transparent_1px),linear-gradient(to_bottom,var(--line-2)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${isScrolled ? "bg-background/95 border-line" : "bg-transparent border-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => setShowLoginCard(false)}
            >
              <img
                src="/logo.png"
                alt="AmazeCC Logo"
                className="h-7 w-7 rounded-lg object-contain shadow-md"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = "/images/icons/logo.png"
                }}
              />
              <span className="font-bold text-sm tracking-tight text-ink font-[family-name:var(--font-outfit)]">
                AmazeCC
              </span>
            </div>

            {/* Nav links on desktop */}
            <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-500 dark:text-muted">
              <a href="#problem" className="hover:text-ink transition-colors">
                The Challenge
              </a>
              <a href="#features" className="hover:text-ink transition-colors">
                Modules
              </a>
              <a href="#timeline" className="hover:text-ink transition-colors">
                Timeline
              </a>
              <a href="#roadmap" className="hover:text-ink transition-colors">
                Roadmap
              </a>
              <a href="#faq" className="hover:text-ink transition-colors">
                FAQ
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Light/Dark Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-surface-2 hover:bg-slate-200 dark:hover:bg-neutral-800 text-ink-2 transition-colors"
              title="Toggle theme"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <button
              onClick={handleDemoClick}
              className="text-xs font-semibold text-muted hover:text-ink transition-colors cursor-pointer"
            >
              Try Demo
            </button>
            {!showLoginCard && (
              <button
                onClick={() => setShowLoginCard(true)}
                className="bg-accent hover:bg-accent/90 text-background font-semibold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Landing/Login Container */}
      <main className="flex-grow">
        {!showLoginCard ? (
          /* Premium Redesigned Landing Page */
          <div className="w-full">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 pt-32 pb-24 lg:pt-44 lg:pb-36">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                {/* Hero Content Left */}
                <div className="lg:col-span-6 space-y-6 text-left animate-fadeIn">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-accent-soft border border-accent/30 text-accent">
                    <Sparkles size={11} /> Next-Generation Portal Dashboard
                  </div>

                  <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-ink font-[family-name:var(--font-outfit)]">
                    Your Entire VIT Life.
                    <br />
                    <span className="text-accent">One Dashboard.</span>
                  </h1>

                  <p className="text-sm text-ink-2 leading-relaxed max-w-lg font-medium">
                    AmazeCC brings everything a VIT student needs into one beautifully designed
                    platform. Stop opening ten different portals. Track attendance, marks, room
                    counselling, and mess menus instantly.
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <button
                      onClick={() => setShowLoginCard(true)}
                      className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-background font-semibold text-xs px-6 py-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <span>Get Started</span>
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                    <a
                      href="#features"
                      className="w-full sm:w-auto bg-surface-2 hover:bg-slate-200 border border-line hover:border-slate-300 dark:hover:bg-neutral-900 dark:hover:border-neutral-700 text-ink-2 font-semibold text-xs px-6 py-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer text-center"
                    >
                      Explore Features
                    </a>
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-3 gap-6 pt-8 border-t border-line">
                    <div>
                      <h4 className="text-xl font-semibold text-ink">30+</h4>
                      <p className="text-[11px] text-slate-500 dark:text-gray-500 font-bold mt-1">
                        Student Tools
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-ink">10+</h4>
                      <p className="text-[11px] text-slate-500 dark:text-gray-500 font-bold mt-1">
                        Modules
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-accent">100%</h4>
                      <p className="text-[11px] text-slate-500 dark:text-gray-500 font-bold mt-1">
                        Free & Local
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hero Centerpiece Artwork Right */}
                <div className="lg:col-span-6 relative flex justify-center">
                  <div className="relative w-full max-w-[500px] aspect-4/3 rounded-lg overflow-hidden border border-line dark:border-neutral-850 shadow-lg animate-float">
                    <img
                      src="/hero-artwork.png"
                      alt="VIT Chennai Twilight Illustration"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: The Problem */}
            <section id="problem" className="bg-surface-2 border-y border-line py-20 px-6">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <div className="space-y-3">
                  <span className="text-[11px] font-semibold text-accent block">
                    The Portal Challenge
                  </span>
                  <h2 className="text-2xl md:text-4xl font-semibold text-ink font-[family-name:var(--font-outfit)]">
                    Tired of hopping between disconnected links?
                  </h2>
                  <p className="text-xs md:text-sm text-ink-2 max-w-xl mx-auto leading-relaxed">
                    Most students waste hours daily logging into multiple outdated gateways just to
                    check attendance, look up room validation OTPs, or retrieve mess menus.
                  </p>
                </div>

                {/* Scattered Disconnected Cards UI */}
                <div className="flex flex-wrap gap-4 justify-center items-center py-8">
                  <div className="bg-surface border border-line rounded-xl px-4 py-3 text-xs text-danger rotate-[-3deg] shadow-md select-none flex items-center gap-2">
                    🔒 VTOP Session Expired (Re-login)
                  </div>
                  <div className="bg-surface border border-line rounded-xl px-4 py-3 text-xs text-warn rotate-[2deg] shadow-md select-none flex items-center gap-2">
                    💬 Outing Pass OTP Pending
                  </div>
                  <div className="bg-surface border border-line rounded-xl px-4 py-3 text-xs text-course-3 shadow-md select-none flex items-center gap-2">
                    🧺 Laundry Booking Slot Locked
                  </div>
                  <div className="bg-surface border border-line rounded-xl px-4 py-3 text-xs text-accent rotate-[3deg] shadow-md select-none flex items-center gap-2">
                    🍲 Mess Menu PDF (Page 4)
                  </div>
                  <div className="bg-surface border border-line rounded-xl px-4 py-3 text-xs text-ok rotate-[-2deg] shadow-md select-none flex items-center gap-2">
                    💳 Koha Book Catalog Error
                  </div>
                </div>

                {/* Arrow Connector */}
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="h-10 w-[1px] bg-line" />
                  <span className="text-[11px] font-semibold text-accent bg-accent-soft border border-accent/30 px-4 py-1.5 rounded-full">
                    AmazeCC Unifies Everything
                  </span>
                  <div className="h-10 w-[1px] bg-line" />
                </div>
              </div>
            </section>

            {/* Section 3: Everything In One Place */}
            <section id="features" className="max-w-7xl mx-auto px-6 py-24 space-y-16">
              <div className="text-center space-y-3">
                <span className="text-[11px] font-semibold text-accent block">
                  Comprehensive Modules
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold text-ink font-[family-name:var(--font-outfit)]">
                  Everything inside one application
                </h2>
                <p className="text-xs md:text-sm text-slate-650 dark:text-muted max-w-xl mx-auto">
                  A unified layout that groups core widgets, predictive calculators, and offline
                  catalogs under cohesive interfaces.
                </p>
              </div>

              {/* Grid Layout of feature cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                {features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="bg-surface border border-line hover:border-accent/30 p-6 rounded-lg flex flex-col justify-between hover:bg-slate-50 transition-colors shadow-xs dark:shadow-none group"
                  >
                    <div className="space-y-3">
                      <span className="text-3xl block shrink-0">{feat.emoji}</span>
                      <h3 className="text-sm font-semibold text-ink font-[family-name:var(--font-outfit)]">
                        {feat.title}
                      </h3>
                      <p className="text-xs text-ink-2 leading-relaxed font-medium">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Attendance Simulator Widget Placement */}
            <section className="bg-surface-2 border-y border-line py-24 px-6 relative">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-4 text-left">
                  <span className="text-[11px] font-semibold text-accent block">
                    Predictive Calculator
                  </span>
                  <h2 className="text-3xl font-semibold text-ink font-[family-name:var(--font-outfit)]">
                    Simulate attendance margins live
                  </h2>
                  <p className="text-xs md:text-sm text-ink-2 leading-relaxed font-medium max-w-xl">
                    Calculate safe margins before skip classes. Adjust the simulator below to check
                    the real-time safety limits, percentage ratios, and skip counts immediately.
                  </p>
                  <div className="flex items-center gap-6 pt-2 text-xs font-semibold text-slate-500 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-ok" />
                      <span>75% safety guard</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                      <span>Dynamic percentage</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-surface border border-line dark:border-neutral-850 p-6 rounded-lg space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-line pb-3">
                    <div>
                      <span className="text-[11px] font-semibold text-accent block">
                        Attendance Preview
                      </span>
                      <h3 className="text-xs font-bold text-ink">Predictor Sandbox</h3>
                    </div>
                    <button
                      onClick={handleSimulateReset}
                      className="p-1.5 rounded-lg text-muted hover:text-slate-900 dark:text-gray-500 dark:hover:text-white hover:bg-surface-2 dark:hover:bg-neutral-800 transition-colors"
                      title="Reset Demo"
                    >
                      <RotateCcw size={12} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-500 dark:text-muted">
                        CSE3002 - COMPILER DESIGN
                      </span>
                      <div className="text-xs font-semibold text-slate-600 dark:text-gray-350">
                        Attended: <span className="text-ink font-semibold">{mockAttended}</span> /{" "}
                        {mockTotal}
                      </div>
                    </div>

                    {/* SVG percentage circle */}
                    <div className="relative h-14 w-14 flex items-center justify-center shrink-0">
                      <svg className="w-14 h-14 transform -rotate-90">
                        <circle
                          cx="28"
                          cy="28"
                          r={radius}
                          className="stroke-slate-100 dark:stroke-neutral-850"
                          strokeWidth="4.5"
                          fill="transparent"
                        />
                        <circle
                          cx="28"
                          cy="28"
                          r={radius}
                          className="stroke-accent transition-colors duration-300"
                          strokeWidth="4.5"
                          fill="transparent"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-[11px] font-semibold text-ink">
                        {Math.round(mockPercent)}%
                      </span>
                    </div>
                  </div>

                  {/* Skip alert panel */}
                  <div
                    className={`p-3 rounded-xl text-[11px] font-bold text-center transition-colors duration-300 ${skipStatus.color}`}
                  >
                    {skipStatus.text}
                  </div>

                  {/* Simulator Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={handleSimulateAttend}
                      className="flex-1 py-2.5 bg-slate-50 hover:bg-surface-2 border border-line dark:border-neutral-850 rounded-xl text-[11px] font-bold text-ok flex items-center justify-center gap-1 transition-colors"
                    >
                      <Plus size={11} /> Attend
                    </button>
                    <button
                      onClick={handleSimulateSkip}
                      className="flex-1 py-2.5 bg-slate-50 hover:bg-surface-2 border border-line dark:border-neutral-850 rounded-xl text-[11px] font-bold text-danger flex items-center justify-center gap-1 transition-colors"
                    >
                      <Minus size={11} /> Skip
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Beautiful Dashboard Preview Mockup */}
            <section className="max-w-7xl mx-auto px-6 py-24 space-y-16">
              <div className="text-center space-y-3">
                <span className="text-[11px] font-semibold text-accent block">User Interface</span>
                <h2 className="text-3xl md:text-4xl font-semibold text-ink font-[family-name:var(--font-outfit)]">
                  Designed for clarity
                </h2>
                <p className="text-xs md:text-sm text-ink-2 max-w-xl mx-auto">
                  A high-fidelity layout optimized for fast reading, dark preferences, and
                  desktop-first tracking.
                </p>
              </div>

              {/* Overlapping CSS Mockup Container */}
              <div className="relative max-w-4xl mx-auto h-[450px] overflow-hidden rounded-lg border border-line bg-surface-2 p-6 md:p-8 flex items-center justify-center shadow-md dark:shadow-xl">
                {/* Mock Desktop Panel */}
                <div className="hidden md:flex absolute top-10 left-10 right-28 bottom-10 bg-surface border border-line dark:border-neutral-850 rounded-md shadow-lg overflow-hidden -rotate-2 origin-top-left transition-transform duration-500 hover:rotate-0">
                  {/* Sidebar mockup */}
                  <div className="w-1/4 border-r border-line p-4 space-y-4 bg-surface select-none">
                    <div className="flex items-center gap-2 pb-3 border-b border-line">
                      <div className="w-4 h-4 rounded bg-accent shrink-0" />
                      <span className="text-[11px] font-bold text-ink">AmazeCC</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-6 rounded bg-slate-50 flex items-center px-2 text-[11px] text-slate-700 dark:text-muted font-bold">
                        📅 Calendar
                      </div>
                      <div className="h-6 rounded flex items-center px-2 text-[11px] text-slate-500 dark:text-gray-500 font-bold">
                        🏫 Attendance
                      </div>
                      <div className="h-6 rounded flex items-center px-2 text-[11px] text-slate-500 dark:text-gray-500 font-bold">
                        🏡 Hostel Hub
                      </div>
                    </div>
                  </div>
                  {/* Core layout mockup */}
                  <div className="flex-1 p-6 space-y-4 bg-surface-2 select-none">
                    <div className="flex items-center justify-between border-b border-line pb-3">
                      <span className="text-xs font-bold text-ink">Semester Course List</span>
                      <span className="text-[11px] bg-ok-soft text-ok px-2 py-0.5 rounded-full font-bold">
                        Active
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-surface border border-line dark:border-neutral-850 p-3 rounded-xl space-y-2">
                        <span className="text-[11px] font-bold text-slate-400 dark:text-muted block">
                          BMAT201L
                        </span>
                        <div className="h-1.5 w-3/4 rounded bg-accent" />
                        <span className="text-[11px] text-slate-500 dark:text-gray-500 font-bold block">
                          Complex Variables
                        </span>
                      </div>
                      <div className="bg-surface border border-line dark:border-neutral-850 p-3 rounded-xl space-y-2">
                        <span className="text-[11px] font-bold text-slate-400 dark:text-muted block">
                          CSE3002
                        </span>
                        <div className="h-1.5 w-1/2 rounded bg-accent" />
                        <span className="text-[11px] text-slate-500 dark:text-gray-500 font-bold block">
                          Compiler Design
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overlapping Mock Phone Panel */}
                <div className="absolute md:right-6 md:bottom-6 left-1/2 md:left-auto top-1/2 md:top-auto -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0 w-52 h-80 bg-surface border-4 border-line rounded-lg shadow-lg p-4 overflow-hidden md:rotate-3 transition-transform duration-500 hover:rotate-0">
                  <div className="w-12 h-4 bg-surface-2 dark:bg-neutral-850 rounded-full mx-auto mb-4" />
                  <div className="space-y-4 select-none">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-ink">Today's hub</span>
                      <span className="text-[11px] text-accent font-bold">22BCE1234</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl space-y-2">
                      <span className="text-[11px] text-ok font-bold block">✓ Attendance Safe</span>
                      <div className="h-1 bg-accent rounded w-full" />
                    </div>
                    <div className="bg-surface-2 border border-line p-2.5 rounded-xl space-y-2">
                      <span className="text-[11px] text-slate-500 dark:text-muted font-bold block">
                        Hostel Laundry
                      </span>
                      <span className="text-[7px] text-muted block">D-Block Slot #03 locked</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Why Students Love AmazeCC */}
            <section className="bg-surface-2 border-y border-line py-24 px-6">
              <div className="max-w-7xl mx-auto space-y-16">
                <div className="text-center space-y-3">
                  <span className="text-[11px] font-semibold text-accent block">Why AmazeCC?</span>
                  <h2 className="text-3xl md:text-4xl font-semibold text-ink font-[family-name:var(--font-outfit)]">
                    Built for speed and complete trust
                  </h2>
                  <p className="text-xs md:text-sm text-slate-650 dark:text-muted max-w-xl mx-auto">
                    Design choices aligned to speed, local privacy, and simplicity.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                  {benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="bg-surface border border-line p-6 rounded-md space-y-2 shadow-xs dark:shadow-none"
                    >
                      <h3 className="text-xs font-semibold text-ink font-[family-name:var(--font-outfit)]">
                        {benefit.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-gray-455 leading-relaxed font-medium">
                        {benefit.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 6: Campus Companion Day Timeline */}
            <section id="timeline" className="max-w-7xl mx-auto px-6 py-24 space-y-16">
              <div className="text-center space-y-3">
                <span className="text-[11px] font-semibold text-accent block">
                  Daily Walkthrough
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold text-ink font-[family-name:var(--font-outfit)]">
                  A typical day with AmazeCC
                </h2>
                <p className="text-xs md:text-sm text-ink-2 max-w-xl mx-auto">
                  See how AmazeCC supports your schedule checks and mess menu updates throughout
                  college hours.
                </p>
              </div>

              {/* Vertical timeline details */}
              <div className="max-w-3xl mx-auto space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-200 dark:before:bg-neutral-900">
                {companionTimeline.map((item, idx) => (
                  <div key={idx} className="flex gap-6 relative pl-8 text-left">
                    {/* Circle indicators */}
                    <div className="absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full bg-accent border-4 border-slate-50 dark:border-neutral-950 shrink-0" />
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-accent">{item.time}</span>
                      <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                      <p className="text-xs text-slate-600 dark:text-gray-455 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 7: Future Roadmap */}
            <section id="roadmap" className="bg-surface-2 border-t border-line py-24 px-6">
              <div className="max-w-7xl mx-auto space-y-16">
                <div className="text-center space-y-3">
                  <span className="text-[11px] font-semibold text-accent block">
                    Project Roadmap
                  </span>
                  <h2 className="text-3xl md:text-4xl font-semibold text-ink font-[family-name:var(--font-outfit)]">
                    What is coming next
                  </h2>
                  <p className="text-xs md:text-sm text-slate-650 dark:text-muted max-w-xl mx-auto">
                    Continuous upgrades to extend scheduling assistance.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                  {roadmap.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-surface border border-line p-6 rounded-md flex flex-col justify-between space-y-4 shadow-xs dark:shadow-none"
                    >
                      <div className="space-y-2">
                        <span className="text-[11px] font-semibold text-accent bg-accent-soft border border-accent/30 px-2 py-0.5 rounded-full w-fit block">
                          {item.status}
                        </span>
                        <h3 className="text-xs font-bold text-ink pt-2">{item.title}</h3>
                        <p className="text-xs text-ink-2 leading-relaxed font-medium">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 8: FAQ Accordion */}
            <section id="faq" className="max-w-4xl mx-auto px-6 py-24 space-y-16">
              <div className="text-center space-y-3">
                <span className="text-[11px] font-semibold text-accent block">Support & FAQs</span>
                <h2 className="text-3xl md:text-4xl font-semibold text-ink font-[family-name:var(--font-outfit)]">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs md:text-sm text-ink-2 max-w-xl mx-auto">
                  Answers to common questions regarding credentials and connections.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx
                  return (
                    <div
                      key={idx}
                      className="border border-line bg-surface rounded-md overflow-hidden shadow-xs dark:shadow-none"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-5 text-left text-xs font-bold text-slate-900 hover:bg-slate-50 dark:text-white dark:hover:bg-neutral-900/30 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronLeft
                          size={16}
                          className={`text-muted transition-transform duration-300 ${isOpen ? "-rotate-90" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="p-5 border-t border-line bg-surface-2 text-ink-2 text-xs leading-relaxed font-medium">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>
          </div>
        ) : (
          /* Premium Login Screen Card with split details panel */
          <div className="max-w-4xl mx-auto px-6 pt-32 pb-24 w-full animate-scaleIn">
            <button
              onClick={() => setShowLoginCard(false)}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:text-muted hover:text-white mb-6 transition-colors cursor-pointer"
            >
              <ChevronLeft size={14} /> Back to product info
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column: Security and Details info */}
              <div className="lg:col-span-5 bg-surface-2 border border-line p-6 rounded-lg flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-ink font-[family-name:var(--font-outfit)]">
                    Security & Privacy
                  </h3>
                  <div className="space-y-4 text-left">
                    <div className="flex gap-3">
                      <div className="p-2 bg-accent-soft text-accent rounded-lg shrink-0 h-fit">
                        <Shield size={14} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-ink">Client-Side Only</h4>
                        <p className="text-[11px] text-slate-500 dark:text-gray-455 mt-0.5 leading-relaxed font-medium">
                          Authentication details and cookie stores stay strictly local. We never
                          host database storage.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="p-2 bg-accent-soft text-accent rounded-lg shrink-0 h-fit">
                        <Zap size={14} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-ink">Direct verify</h4>
                        <p className="text-[11px] text-slate-500 dark:text-gray-455 mt-0.5 leading-relaxed font-medium">
                          Secure verification directly with VTOP servers to pull schedules.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-line text-[11px] text-slate-450 dark:text-gray-500 font-semibold text-left">
                  Secured by standard TLS encryption directly to the VIT gateway.
                </div>
              </div>

              {/* Right Column: Login form card */}
              <div className="lg:col-span-7 bg-surface border border-line rounded-lg p-7 flex flex-col justify-between shadow-lg relative overflow-hidden">
                {isLoading && (
                  <div className="absolute inset-0 bg-surface/90 rounded-lg flex flex-col items-center justify-center z-25 space-y-4 animate-in fade-in duration-300">
                    <div className="relative flex items-center justify-center w-16 h-16 rounded-md bg-accent-soft text-accent">
                      <Loader2 className="w-8 h-8 animate-spin" />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-xs font-semibold text-ink font-[family-name:var(--font-outfit)]">
                        VTOP Authentication
                      </p>
                      <p className="text-[11px] font-bold text-slate-500 dark:text-muted animate-pulse">
                        Establishing secure gateway...
                      </p>
                    </div>
                  </div>
                )}
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Header info */}
                  <div className="flex items-center gap-2.5 border-b border-slate-105 pb-4 mb-2">
                    <div className="p-2 bg-accent-soft border border-accent/30 text-accent rounded-lg">
                      <Shield size={16} />
                    </div>
                    <div className="text-left">
                      <h2 className="text-sm font-bold text-ink">VTOP Verification</h2>
                      <p className="text-[11px] text-slate-500 dark:text-gray-455 mt-0.5">
                        Secure authentication via VIT database
                      </p>
                    </div>
                  </div>

                  {message &&
                    (message.toLowerCase().includes("failed") ||
                      message.toLowerCase().includes("invalid") ||
                      message.toLowerCase().includes("wrong") ||
                      message.toLowerCase().includes("incorrect") ||
                      message.toLowerCase().includes("captcha") ||
                      message.toLowerCase().includes("error")) && (
                      <div className="p-3.5 rounded-xl border text-xs text-center font-bold bg-danger-soft border-danger/20 text-danger">
                        {message}
                      </div>
                    )}

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-line mb-4">
                    <div className="flex items-center gap-2">
                      <Server size={14} className="text-slate-500" />
                      <span className="text-xs font-bold text-slate-600 dark:text-gray-300">
                        API Gateway
                      </span>
                    </div>
                    <select
                      value={activeApi}
                      onChange={(e) => onApiChange(e.target.value)}
                      className="text-xs bg-transparent border-none focus:ring-0 text-accent font-bold cursor-pointer"
                    >
                      <option value={primaryApiUrl}>Primary</option>
                      <option value={backupApiUrl}>Backup</option>
                    </select>
                  </div>

                  <div className="space-y-4 text-left">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 dark:text-muted pl-0.5">
                        VTop Username
                      </label>
                      <Input
                        className="uppercase"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="E.g., VITUSER12345"
                        disabled={isLoading}
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 dark:text-muted pl-0.5">
                        VTOP Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          disabled={isLoading}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded text-slate-400 hover:text-ink"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {!isLoading && (
                    <>
                      <div className="space-y-3 text-left">
                        <p className="text-[11px] font-bold text-slate-500 dark:text-muted pl-0.5">
                          Residential Status
                        </p>
                        <div className="flex gap-2.5">
                          <button
                            type="button"
                            onClick={() => {
                              setResidentialStatus("hosteller")
                              setIsDayscholarWithBus(false)
                            }}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-colors border ${
                              residentialStatus === "hosteller"
                                ? "bg-accent text-background border-accent"
                                : "bg-slate-50 text-slate-500 border-line dark:text-muted hover:border-accent/30"
                            }`}
                          >
                            Hosteller
                          </button>
                          <button
                            type="button"
                            onClick={() => setResidentialStatus("dayscholar")}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-colors border ${
                              residentialStatus === "dayscholar"
                                ? "bg-accent text-background border-accent"
                                : "bg-slate-50 text-slate-500 border-line dark:text-muted hover:border-accent/30"
                            }`}
                          >
                            Dayscholar
                          </button>
                        </div>
                        {residentialStatus === "dayscholar" && (
                          <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-line cursor-pointer transition-colors hover:border-accent/30">
                            <Checkbox
                              checked={isDayscholarWithBus}
                              onCheckedChange={(checked) => setIsDayscholarWithBus(!!checked)}
                            />
                            <span className="text-xs font-bold text-slate-600 dark:text-gray-300">
                              I have registered transport (bus)
                            </span>
                          </label>
                        )}
                      </div>
                      <Button type="submit" className="w-full text-xs font-semibold" size="lg">
                        Authenticate
                      </Button>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-line bg-surface-2 text-center space-y-3 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-gray-500">
          <div>
            <span className="font-bold text-ink font-[family-name:var(--font-outfit)]">
              AmazeCC
            </span>
          </div>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-ink transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-ink transition-colors">
              Terms
            </a>
            <a
              href="https://github.com/AmazeContinuityProjects/AmazeCC"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              GitHub
            </a>
          </div>
          <p className="text-[11px] font-semibold">
            Made with ❤️ by students. Not affiliated with VIT or VTOP.
          </p>
        </div>
      </footer>
    </div>
  )
}
