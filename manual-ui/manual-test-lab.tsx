import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronDown,
  CircleHelp,
  Command,
  CreditCard,
  FileText,
  FlaskConical,
  GraduationCap,
  House,
  LayoutGrid,
  ListChecks,
  Moon,
  PanelTop,
  Search,
  Sun,
} from "lucide-react"
import * as React from "react"
import { Alert } from "../src/components/ui/alert"
import { AttendanceBar } from "../src/components/ui/attendance-bar"
import { CourseDot, SlotBadge } from "../src/components/ui/course-mark"
import { Badge } from "../src/components/ui/badge"
import { Breadcrumbs } from "../src/components/ui/breadcrumbs"
import { Button } from "../src/components/ui/button"
import { Card, CardContent, CardFooter } from "../src/components/ui/card"
import { Checkbox } from "../src/components/ui/checkbox"
import { CircularProgress } from "../src/components/ui/circular-progress"
import { ColorPalettePicker } from "../src/components/ui/color-palette-picker"
import { DataTable } from "../src/components/ui/data-table"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../src/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../src/components/ui/dropdown-menu"
import { EmptyState } from "../src/components/ui/empty-state"
import { ExpandableSection } from "../src/components/ui/expandable-section"
import { InfoRow } from "../src/components/ui/info-row"
import { Input, Textarea } from "../src/components/ui/input"
import { Label } from "../src/components/ui/label"
import { LoadingSpinner } from "../src/components/ui/loading-spinner"
import { MobileBottomNav } from "../src/components/ui/mobile-bottom-nav"
import { Modal } from "../src/components/ui/modal"
import { OptionPicker } from "../src/components/ui/option-picker"
import { PageHeader } from "../src/components/ui/page-header"
import { Popover, PopoverContent, PopoverTrigger } from "../src/components/ui/popover"
import { Progress } from "../src/components/ui/progress"
import { ProgressBar } from "../src/components/ui/progress-bar"
import { SearchInput } from "../src/components/ui/search-input"
import { SectionHeader } from "../src/components/ui/section-header"
import { Select as SelectControl } from "../src/components/ui/select"
import { Skeleton } from "../src/components/ui/skeleton"
import { StatusBadge } from "../src/components/ui/status-badge"
import { SubTabStrip } from "../src/components/ui/sub-tab-strip"
import { Switch } from "../src/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../src/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../src/components/ui/tabs"
import {
  Timeline,
  TimelineActions,
  TimelineCard,
  TimelineDate,
  TimelineDescription,
  TimelineItem,
  TimelineTitle,
} from "../src/components/ui/timeline"
import { ViewModeToggle } from "../src/components/ui/view-mode-toggle"

type TestStatus = "pass" | "fail"
type ManualCase = {
  id: string
  section: string
  title: string
  steps: string
  expected: string
}

const manualCases: ManualCase[] = [
  {
    id: "button-variants",
    section: "Foundation",
    title: "Button variants and disabled state",
    steps: "Activate each variant, then try the disabled button.",
    expected: "Each variant has a distinct treatment; disabled cannot be activated.",
  },
  {
    id: "button-keyboard",
    section: "Foundation",
    title: "Button keyboard focus",
    steps: "Use Tab and Shift+Tab to reach the button row; press Enter and Space.",
    expected: "A visible focus ring appears and enabled buttons respond to keyboard input.",
  },
  {
    id: "badge-variants",
    section: "Foundation",
    title: "Badge and status variants",
    steps: "Compare neutral, success, warning, danger, info and all live statuses.",
    expected: "Text remains legible; meaning is not conveyed by color alone.",
  },
  {
    id: "alerts",
    section: "Foundation",
    title: "Alert variants and long copy",
    steps: "Read each alert and resize the viewport to a narrow width.",
    expected: "Icon, message and border stay aligned without clipping.",
  },
  {
    id: "cards",
    section: "Foundation",
    title: "Card variants, header and action",
    steps: "Compare default, outline, glass and gradient cards; hover the interactive card.",
    expected: "Header, body and footer spacing are consistent; hover does not zoom.",
  },
  {
    id: "input-label",
    section: "Forms",
    title: "Input label, value and placeholder",
    steps: "Focus the labeled field, replace its value and clear it.",
    expected: "Label stays associated, entered text is visible, placeholder returns when empty.",
  },
  {
    id: "input-errors",
    section: "Forms",
    title: "Input required, disabled and error states",
    steps: "Submit the required field empty; inspect the disabled and error examples.",
    expected: "Required blocks submission; disabled cannot be edited; error text is announced.",
  },
  {
    id: "textarea",
    section: "Forms",
    title: "Textarea multiline entry",
    steps: "Enter several lines and test keyboard navigation.",
    expected: "Newlines are preserved and the field remains readable in both themes.",
  },
  {
    id: "select",
    section: "Forms",
    title: "Select and option picker",
    steps: "Choose an option in each control; search a partial name in the option picker.",
    expected: "Selection updates and the searchable list filters to matching options.",
  },
  {
    id: "checkbox",
    section: "Forms",
    title: "Checkbox pointer and keyboard",
    steps: "Toggle the checkbox by click, Space, and its visible label.",
    expected: "Checked state tracks all three inputs and the label toggles the control.",
  },
  {
    id: "switch",
    section: "Forms",
    title: "Switch controlled value",
    steps: "Toggle the switch repeatedly and observe the inline state.",
    expected: "The switch and its on/off text stay in sync.",
  },
  {
    id: "search",
    section: "Forms",
    title: "Search input typing and clearing",
    steps: "Type a query, use select-all, replace it, then clear the field.",
    expected: "The controlled result count updates for every edit.",
  },
  {
    id: "palette",
    section: "Forms",
    title: "Color palette persistence",
    steps: "Pick each palette, change theme, refresh, and confirm the selection.",
    expected: "Accent changes in both themes and the selected seed persists after refresh.",
  },
  {
    id: "progress",
    section: "Feedback",
    title: "Progress boundaries",
    steps: "Compare 0%, partial, full and over-100 values; move the progress slider.",
    expected: "Values stay within the track; 0 and 100 render as valid endpoints.",
  },
  {
    id: "loading",
    section: "Feedback",
    title: "Loading and skeleton states",
    steps: "Compare spinner sizes, labels, and skeleton rows in both themes.",
    expected: "Loading indicators remain visible and do not shift surrounding layout.",
  },
  {
    id: "empty-state",
    section: "Feedback",
    title: "Empty state with action",
    steps: "Activate the empty-state action and confirm its feedback.",
    expected: "Icon, title, description and action are centered and usable.",
  },
  {
    id: "tabs",
    section: "Navigation",
    title: "Tabs selection and content",
    steps: "Select every tab and use keyboard navigation where available.",
    expected: "Only the selected tab content is shown and the active state is clear.",
  },
  {
    id: "subtabs",
    section: "Navigation",
    title: "Sub-tab switching",
    steps: "Switch between the three sub-tabs.",
    expected: "The active indicator tracks the selection and text stays readable.",
  },
  {
    id: "breadcrumbs",
    section: "Navigation",
    title: "Breadcrumb links and active page",
    steps: "Activate the linked crumb and inspect the final active item.",
    expected: "Links are navigable and the current page is distinguishable.",
  },
  {
    id: "expandable",
    section: "Navigation",
    title: "Expandable section",
    steps: "Open and close the section with pointer and keyboard.",
    expected: "Content visibility and chevron state agree after each toggle.",
  },
  {
    id: "view-mode",
    section: "Navigation",
    title: "View mode toggle",
    steps: "Choose each view icon and inspect the textual mode below.",
    expected: "Selected view and status text update together.",
  },
  {
    id: "dropdown",
    section: "Overlays",
    title: "Dropdown open, select and dismiss",
    steps: "Open the menu, select an item, reopen, then dismiss outside.",
    expected: "Selection updates the label and the menu closes after selection/dismissal.",
  },
  {
    id: "popover",
    section: "Overlays",
    title: "Popover open and dismiss",
    steps: "Toggle the popover and dismiss by clicking outside.",
    expected: "Content opens once, stays open while interacting, and dismisses outside.",
  },
  {
    id: "dialog",
    section: "Overlays",
    title: "Dialog open and close paths",
    steps: "Open the dialog; close with Cancel, the close action, and Escape.",
    expected: "Each close path returns focus to the trigger and removes the overlay.",
  },
  {
    id: "modal",
    section: "Overlays",
    title: "Modal close and click containment",
    steps: "Open the modal, click inside, click the backdrop, then reopen and press Escape.",
    expected: "Inside clicks do not close it; backdrop and Escape do.",
  },
  {
    id: "table",
    section: "Data",
    title: "Table alignment and narrow viewport",
    steps: "Compare the compact table with the data table; resize to phone width.",
    expected: "Headers align with cells and wide content can be inspected without page overflow.",
  },
  {
    id: "timeline",
    section: "Data",
    title: "Timeline sequence and actions",
    steps: "Read the sample timeline in order and activate its action.",
    expected: "Dates, titles and descriptions read in order; action produces feedback.",
  },
  {
    id: "theme",
    section: "Accessibility",
    title: "Light and dark theme",
    steps: "Switch both directions and inspect text, borders, form controls and overlays.",
    expected: "No unreadable text, lost borders or unintended mixed-theme surfaces.",
  },
  {
    id: "responsive",
    section: "Accessibility",
    title: "Responsive layout and touch targets",
    steps: "Test at 1440, 1024, 768, 390 and 320 px viewport widths.",
    expected: "No horizontal page overflow; controls remain reachable and at least 44 px tall.",
  },
  {
    id: "reduced-motion",
    section: "Accessibility",
    title: "Reduced motion preference",
    steps: "Enable reduced motion in OS/browser settings and reload.",
    expected: "Decorative motion is minimized while state changes remain understandable.",
  },
]

const sections = [
  { id: "foundation", label: "Foundation", icon: LayoutGrid },
  { id: "forms", label: "Forms", icon: ListChecks },
  { id: "feedback", label: "Feedback", icon: Activity },
  { id: "navigation", label: "Navigation", icon: PanelTop },
  { id: "overlays", label: "Overlays", icon: Command },
  { id: "data", label: "Data", icon: FileText },
  { id: "accessibility", label: "Accessibility", icon: CircleHelp },
  { id: "checklist", label: "QA checklist", icon: CheckCheck },
]

function readTestResults(): Record<string, TestStatus> {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem("amazeui-manual-test-results") ?? "{}")
    if (!stored || typeof stored !== "object" || Array.isArray(stored)) return {}
    return Object.entries(stored).reduce<Record<string, TestStatus>>((results, [id, value]) => {
      if (value === "pass" || value === "fail") results[id] = value
      return results
    }, {})
  } catch {
    return {}
  }
}

function CaseCard({
  testCase,
  result,
  onResult,
}: {
  testCase: ManualCase
  result?: TestStatus
  onResult: (result?: TestStatus) => void
}) {
  const [note, setNote] = React.useState(
    () => localStorage.getItem(`amazeui-manual-note:${testCase.id}`) ?? ""
  )

  return (
    <article className={`case-card ${result ? `case-card--${result}` : ""}`}>
      <div className="case-card__top">
        <span className="case-id">{testCase.id}</span>
        <span className={`case-result ${result ? `case-result--${result}` : ""}`}>
          {result ?? "Not run"}
        </span>
      </div>
      <h3>{testCase.title}</h3>
      <p className="case-steps">
        <strong>Try:</strong> {testCase.steps}
      </p>
      <p className="case-expected">
        <strong>Expect:</strong> {testCase.expected}
      </p>
      {result === "fail" && (
        <label className="case-note">
          What went wrong?
          <textarea
            value={note}
            onChange={(event) => {
              setNote(event.target.value)
              localStorage.setItem(`amazeui-manual-note:${testCase.id}`, event.target.value)
            }}
            placeholder="Describe the issue so it can be reproduced."
            rows={2}
          />
        </label>
      )}
      <div className="case-actions" aria-label={`${testCase.title} result`}>
        <button
          type="button"
          className={
            result === "pass"
              ? "result-button result-button--pass is-selected"
              : "result-button result-button--pass"
          }
          aria-pressed={result === "pass"}
          onClick={() => onResult(result === "pass" ? undefined : "pass")}
        >
          <Check size={14} aria-hidden="true" /> Pass
        </button>
        <button
          type="button"
          className={
            result === "fail"
              ? "result-button result-button--fail is-selected"
              : "result-button result-button--fail"
          }
          aria-pressed={result === "fail"}
          onClick={() => onResult(result === "fail" ? undefined : "fail")}
        >
          Flag issue
        </button>
      </div>
    </article>
  )
}

function ManualTestLabContent() {
  const [darkMode, setDarkMode] = React.useState(
    () => localStorage.getItem("amazeui-manual-theme") === "dark"
  )
  const [results, setResults] = React.useState(readTestResults)
  const [sectionFilter, setSectionFilter] = React.useState("all")
  const [search, setSearch] = React.useState("")
  const [switchOn, setSwitchOn] = React.useState(true)
  const [checkboxOn, setCheckboxOn] = React.useState(false)
  const [requiredValue, setRequiredValue] = React.useState("")
  const [query, setQuery] = React.useState("")
  const [selectValue, setSelectValue] = React.useState("forest")
  const [optionValue, setOptionValue] = React.useState("morning")
  const [progressValue, setProgressValue] = React.useState(68)
  const [tab, setTab] = React.useState("overview")
  const [subTab, setSubTab] = React.useState("today")
  const [viewMode, setViewMode] = React.useState("list")
  const [selectedMenu, setSelectedMenu] = React.useState("Choose action")
  const [modalOpen, setModalOpen] = React.useState(false)
  const [emptyAction, setEmptyAction] = React.useState(false)
  const [toast, setToast] = React.useState("")
  const [activeMobileNav, setActiveMobileNav] = React.useState("home")

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
    localStorage.setItem("amazeui-manual-theme", darkMode ? "dark" : "light")
  }, [darkMode])

  const allTested = Object.values(results).filter(Boolean).length
  const passed = Object.values(results).filter((value) => value === "pass").length
  const failed = Object.values(results).filter((value) => value === "fail").length
  const queryLower = search.trim().toLowerCase()
  const visibleCases = manualCases.filter((testCase) => {
    const sectionMatches =
      sectionFilter === "all" || testCase.section.toLowerCase().replace(/ /g, "-") === sectionFilter
    const queryMatches =
      !queryLower ||
      `${testCase.title} ${testCase.steps} ${testCase.expected} ${testCase.section}`
        .toLowerCase()
        .includes(queryLower)
    return sectionMatches && queryMatches
  })

  const setCaseResult = (id: string, result?: TestStatus) => {
    setResults((current) => {
      const next = { ...current }
      if (result) next[id] = result
      else delete next[id]
      localStorage.setItem("amazeui-manual-test-results", JSON.stringify(next))
      return next
    })
  }

  const showToast = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(""), 2400)
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="lab-shell">
      <aside className="lab-sidebar">
        <a className="brand" href="#top" aria-label="AmazeUI test lab home">
          <span className="brand-mark">A</span>
          <span>
            <strong>AmazeUI</strong>
            <small>Manual test lab</small>
          </span>
        </a>
        <div className="sidebar-label">COMPONENTS</div>
        <nav className="section-nav" aria-label="Component sections">
          {sections.slice(0, -1).map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" onClick={() => scrollTo(id)}>
              <Icon size={16} aria-hidden="true" />
              <span>{label}</span>
              <span className="nav-count">
                {
                  manualCases.filter(
                    (testCase) => testCase.section.toLowerCase() === label.toLowerCase()
                  ).length
                }
              </span>
            </button>
          ))}
          <button type="button" onClick={() => scrollTo("checklist")}>
            <ListChecks size={16} aria-hidden="true" />
            <span>QA checklist</span>
            <span className="nav-count">{manualCases.length}</span>
          </button>
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-progress">
            <div className="sidebar-progress__row">
              <span>Test progress</span>
              <strong>
                {allTested}/{manualCases.length}
              </strong>
            </div>
            <div className="progress-track">
              <span style={{ width: `${(allTested / manualCases.length) * 100}%` }} />
            </div>
            <div className="sidebar-progress__meta">
              <span>{passed} passed</span>
              <span>{failed} flagged</span>
            </div>
          </div>
          <div className="sidebar-footnote">
            <FlaskConical size={14} aria-hidden="true" />
            <span>Local only · results stay in this browser</span>
          </div>
        </div>
      </aside>

      <main className="lab-main" id="top">
        <header className="topbar">
          <div className="breadcrumbs">
            AmazeCC <span>/</span> Design system <span>/</span> <strong>Manual QA</strong>
          </div>
          <div className="topbar-actions">
            <span className="viewport-indicator">
              <span className="live-dot" /> Interactive preview
            </span>
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setDarkMode((value) => !value)}
              aria-label={`Switch to ${darkMode ? "light" : "dark"} theme`}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              <span>{darkMode ? "Light" : "Dark"}</span>
            </button>
          </div>
        </header>

        <div className="page-content">
          <section className="hero">
            <div className="hero-copy">
              <div className="eyebrow">
                <span>AMAZEUI 1.6</span> COMPONENT WORKBENCH
              </div>
              <h1>
                Make every detail
                <br />
                <em>feel right.</em>
              </h1>
              <p>
                Explore the component system in real states. Try every interaction, check the
                expected behavior, and record a pass or a reproducible issue as you go.
              </p>
              <div className="hero-actions">
                <Button onClick={() => scrollTo("foundation")} className="hero-button">
                  Start exploring <ArrowUpRight size={16} aria-hidden="true" />
                </Button>
                <button type="button" className="text-button" onClick={() => scrollTo("checklist")}>
                  Open QA checklist <ListChecks size={15} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="hero-report" aria-label="Manual test progress">
              <div className="report-topline">
                <span>MANUAL RUN</span>
                <span>LOCAL SESSION</span>
              </div>
              <div
                className="report-ring"
                style={
                  { "--progress": `${(passed / manualCases.length) * 100}%` } as React.CSSProperties
                }
              >
                <div>
                  <strong>{passed}</strong>
                  <span>passed</span>
                </div>
              </div>
              <div className="report-detail">
                <span>
                  <i className="legend-dot legend-dot--pass" />
                  {passed} passing
                </span>
                <span>
                  <i className="legend-dot legend-dot--fail" />
                  {failed} flagged
                </span>
                <span>
                  <i className="legend-dot legend-dot--todo" />
                  {manualCases.length - allTested} remaining
                </span>
              </div>
            </div>
            <div className="hero-stamp" aria-hidden="true">
              FIELD
              <br />
              NOTES
              <br />
              <span>№ 01</span>
            </div>
          </section>

          <div className="stats-row" aria-label="Test lab summary">
            <div>
              <strong>60+</strong>
              <span>UI components</span>
            </div>
            <div>
              <strong>{manualCases.length}</strong>
              <span>Manual checks</span>
            </div>
            <div>
              <strong>2</strong>
              <span>Color modes</span>
            </div>
            <div>
              <strong>5</strong>
              <span>Accent seeds</span>
            </div>
            <div className="stats-tip">
              <CircleHelp size={17} />
              <span>Mark a check after testing it. Failed checks reveal a notes field.</span>
            </div>
          </div>

          <section className="lab-section" id="foundation">
            <SectionHeading
              index="01"
              title="Foundation"
              description="The everyday building blocks: surfaces, actions, and status."
            />
            <div className="demo-grid demo-grid--2">
              <DemoCard title="Buttons" meta="6 variants · 3 sizes · disabled">
                <div className="demo-row demo-row--wrap">
                  <Button>Default action</Button>
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Destructive</Button>
                  <Button variant="success">Success</Button>
                  <Button size="sm">Small</Button>
                  <Button size="lg">Large</Button>
                  <Button disabled>Disabled</Button>
                  <Button aria-label="Icon action" size="icon-sm" variant="outline">
                    <Search size={16} />
                  </Button>
                </div>
                <p className="demo-caption">
                  Tab through this row to inspect keyboard focus. Buttons keep a 44 px target.
                </p>
              </DemoCard>
              <DemoCard title="Badges & live status" meta="6 badge tones · 6 status values">
                <div className="demo-row demo-row--wrap">
                  <Badge>Neutral</Badge>
                  <Badge variant="success">Present</Badge>
                  <Badge variant="warning">At risk</Badge>
                  <Badge variant="danger">Blocked</Badge>
                  <Badge variant="info">Synced</Badge>
                  <Badge variant="purple">Elective</Badge>
                </div>
                <div className="demo-row demo-row--wrap demo-row--spaced">
                  {(["pending", "processing", "success", "error", "warning", "info"] as const).map(
                    (status) => (
                      <StatusBadge key={status} status={status} />
                    )
                  )}
                </div>
              </DemoCard>
              <DemoCard title="Attendance & courses" meta="75% line · skip budget · course hues">
                <div className="alert-stack">
                  <AttendanceBar attended={26} held={35} course={3} showLabel />
                  <AttendanceBar attended={19} held={25} course={2} showLabel />
                  <AttendanceBar attended={30} held={34} course={1} showLabel />
                </div>
                <div className="demo-row demo-row--wrap demo-row--spaced">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((hue) => (
                    <SlotBadge key={hue} course={hue}>
                      {["A1+TA1", "B1+TB1", "C1+TC1", "D1", "F1", "G1", "L31+L32", "E2"][hue - 1]}
                    </SlotBadge>
                  ))}
                </div>
                <div className="demo-row demo-row--wrap demo-row--spaced">
                  <CourseDot course="BCSE202L" /> <span className="demo-caption">BCSE202L</span>
                  <CourseDot course="BMAT201L" /> <span className="demo-caption">BMAT201L</span>
                  <CourseDot course="BPHY101L" /> <span className="demo-caption">BPHY101L</span>
                </div>
              </DemoCard>
              <DemoCard title="Alerts" meta="Default · success · warning · error · info">
                <div className="alert-stack">
                  <Alert>Changes are saved to this device.</Alert>
                  <Alert variant="success">Attendance synced just now.</Alert>
                  <Alert variant="warning">One class is below the 75% target.</Alert>
                  <Alert variant="error">We couldn’t reach the timetable service. Try again.</Alert>
                  <Alert variant="info">Your next class starts in 12 minutes.</Alert>
                </div>
              </DemoCard>
              <DemoCard title="Cards" meta="Default · outline · glass · gradient">
                <div className="demo-row demo-row--wrap">
                  <Card className="mini-card" title="Today" subtitle="Default surface">
                    <CardContent>Two classes remaining</CardContent>
                  </Card>
                  <Card className="mini-card" variant="outline" title="Outline">
                    <CardContent>Quiet by default</CardContent>
                  </Card>
                  <Card className="mini-card" variant="glass" title="Glass">
                    <CardContent>Solid surface fallback</CardContent>
                  </Card>
                  <Card className="mini-card" variant="gradient" title="Accent">
                    <CardContent>Reserved for emphasis</CardContent>
                  </Card>
                </div>
                <Card
                  hover
                  className="interactive-card"
                  title="Hover and action"
                  subtitle="Move the pointer over this card."
                  action={
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => showToast("Card action activated")}
                    >
                      Open
                    </Button>
                  }
                >
                  <CardContent>Hover should change only the surface—not scale or lift.</CardContent>
                  <CardFooter>
                    <span className="demo-caption">Compact footer spacing</span>
                  </CardFooter>
                </Card>
              </DemoCard>
            </div>
            <TestCallout
              cases={manualCases.filter((testCase) => testCase.section === "Foundation")}
              results={results}
              setCaseResult={setCaseResult}
            />
          </section>

          <section className="lab-section" id="forms">
            <SectionHeading
              index="02"
              title="Forms & choices"
              description="Inputs should be clear, forgiving, and comfortable to use."
            />
            <div className="demo-grid demo-grid--2">
              <DemoCard title="Text entry" meta="Label · placeholder · required · error · disabled">
                <div className="form-grid">
                  <div>
                    <FieldLabel htmlFor="student-email">Email address</FieldLabel>
                    <Input id="student-email" type="email" placeholder="you@university.edu" />
                  </div>
                  <div>
                    <FieldLabel htmlFor="student-id">
                      Registration number <span className="required-mark">Required</span>
                    </FieldLabel>
                    <Input
                      id="student-id"
                      value={requiredValue}
                      onChange={(event) => setRequiredValue(event.target.value)}
                      placeholder="24BCE1042"
                      aria-required="true"
                    />
                    {!requiredValue && (
                      <span className="field-hint">Enter your campus registration number.</span>
                    )}
                  </div>
                  <div>
                    <FieldLabel htmlFor="invalid-field">Validation error</FieldLabel>
                    <Input
                      id="invalid-field"
                      value="bad-address"
                      error="Enter a valid university email."
                      readOnly
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="disabled-field">Disabled</FieldLabel>
                    <Input id="disabled-field" value="Read-only value" disabled />
                  </div>
                  <div className="form-span">
                    <FieldLabel htmlFor="notes">Multiline notes</FieldLabel>
                    <Textarea id="notes" rows={3} placeholder="Add context for this request…" />
                  </div>
                </div>
              </DemoCard>
              <DemoCard
                title="Selection controls"
                meta="Native select · searchable picker · checkbox · switch"
              >
                <div className="form-grid">
                  <div>
                    <FieldLabel htmlFor="campus-select">Campus</FieldLabel>
                    <SelectControl
                      value={selectValue}
                      onChange={setSelectValue}
                      options={[
                        { value: "forest", label: "Main campus" },
                        { value: "city", label: "City campus" },
                        { value: "online", label: "Online" },
                      ]}
                    />
                  </div>
                  <div>
                    <Label className="lab-label">Class timing</Label>
                    <OptionPicker
                      value={optionValue}
                      onChange={setOptionValue}
                      options={[
                        { value: "morning", label: "Morning · 08:00–12:00" },
                        { value: "afternoon", label: "Afternoon · 12:00–16:00" },
                        { value: "evening", label: "Evening · 16:00–19:00" },
                        { value: "weekend", label: "Weekend sessions" },
                      ]}
                      placeholder="Choose a time"
                      searchable
                    />
                  </div>
                  <label className="choice-row">
                    <Checkbox
                      checked={checkboxOn}
                      onCheckedChange={(checked) => setCheckboxOn(checked === true)}
                    />
                    <span>
                      <strong>Remember this device</strong>
                      <small>Keep this setting on this browser.</small>
                    </span>
                  </label>
                  <label className="choice-row">
                    <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
                    <span>
                      <strong>Push notifications</strong>
                      <small>Currently {switchOn ? "on" : "off"} · toggle to change.</small>
                    </span>
                  </label>
                  <div className="form-span">
                    <FieldLabel htmlFor="search-courses">Search courses</FieldLabel>
                    <SearchInput
                      id="search-courses"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Try “physics” or “design”"
                    />
                    <span className="field-hint">
                      {query
                        ? `Showing matches for “${query}”.`
                        : "Type to exercise input, replacement, and clear states."}
                    </span>
                  </div>
                </div>
              </DemoCard>
              <DemoCard title="Accent seed picker" meta="5 seeds · light/dark verified">
                <p className="demo-caption">
                  Choose a seed, switch the theme in the header, then refresh to check persistence.
                </p>
                <ColorPalettePicker />
              </DemoCard>
              <DemoCard title="Labeled form submission" meta="Try an empty required field">
                <form
                  className="sample-form"
                  onSubmit={(event) => {
                    event.preventDefault()
                    showToast(requiredValue ? "Form submitted" : "Registration number is required")
                  }}
                >
                  <FieldLabel htmlFor="required-form-id">
                    Registration number <span className="required-mark">Required</span>
                  </FieldLabel>
                  <Input
                    id="required-form-id"
                    required
                    value={requiredValue}
                    onChange={(event) => setRequiredValue(event.target.value)}
                    placeholder="24BCE1042"
                  />
                  <Button type="submit">Save details</Button>
                  <span className="field-hint">
                    Browser-native required validation should block an empty submission.
                  </span>
                </form>
              </DemoCard>
            </div>
            <TestCallout
              cases={manualCases.filter((testCase) => testCase.section === "Forms")}
              results={results}
              setCaseResult={setCaseResult}
            />
          </section>

          <section className="lab-section" id="feedback">
            <SectionHeading
              index="03"
              title="Feedback & progress"
              description="Clear signals for waiting, completion, emptiness, and trouble."
            />
            <div className="demo-grid demo-grid--2">
              <DemoCard title="Progress states" meta="0 · live · full · clamped">
                <div className="progress-sample">
                  <span>Not started</span>
                  <Progress value={0} />
                </div>
                <div className="progress-sample">
                  <span>Enrollment · {progressValue}%</span>
                  <Progress value={progressValue} />
                </div>
                <div className="progress-sample">
                  <span>Complete</span>
                  <Progress value={100} />
                </div>
                <div className="progress-sample">
                  <span>Out of range · 128% (should clamp)</span>
                  <Progress value={128} />
                </div>
                <label className="range-row">
                  Adjust live progress{" "}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progressValue}
                    onChange={(event) => setProgressValue(Number(event.target.value))}
                  />
                  <strong>{progressValue}%</strong>
                </label>
                <ProgressBar value={progressValue} showLabel size="md" color="emerald" />
                <div className="demo-row demo-row--wrap">
                  <ProgressBar value={24} color="blue" showLabel size="sm" />
                  <ProgressBar value={56} color="amber" showLabel />
                  <ProgressBar value={88} color="red" showLabel />
                </div>
                <div className="demo-row demo-row--wrap circle-row">
                  <CircularProgress value={74} size={72} />
                  <CircularProgress value={82} size={72} />
                  <CircularProgress value={94} size={72} />
                </div>
              </DemoCard>
              <DemoCard
                title="Loading & skeleton"
                meta="3 spinner sizes · text · content placeholder"
              >
                <div className="spinner-list">
                  <LoadingSpinner size="sm" label="Checking your session…" />
                  <LoadingSpinner size="md" label="Loading timetable…" />
                  <LoadingSpinner size="lg" label="Syncing course data…" />
                </div>
                <div className="skeleton-sample">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="skeleton-copy">
                    <Skeleton className="h-3 w-2/5" />
                    <Skeleton className="h-3 w-4/5" />
                  </div>
                </div>
              </DemoCard>
              <DemoCard title="Empty state" meta="Icon · title · explanation · action">
                {emptyAction ? (
                  <Alert variant="success">The empty-state action is wired up.</Alert>
                ) : (
                  <EmptyState
                    icon={<FileText size={28} />}
                    title="No saved courses yet"
                    description="Add a course to see its schedule and attendance here."
                    action={
                      <Button variant="outline" onClick={() => setEmptyAction(true)}>
                        Browse courses
                      </Button>
                    }
                  />
                )}
              </DemoCard>
              <DemoCard title="Section headings & info rows" meta="Optional details and actions">
                <SectionHeader
                  title="Attendance overview"
                  subtitle="A realistic heading with supporting context."
                  action={
                    <Button size="sm" variant="outline">
                      See report
                    </Button>
                  }
                />
                <div className="info-list">
                  <InfoRow icon={<Activity size={16} />}>Overall attendance: 82%</InfoRow>
                  <InfoRow icon={<CreditCard size={16} />}>Credits earned: 18 of 24</InfoRow>
                  <InfoRow icon={<CircleHelp size={16} />}>Minimum target: 75%</InfoRow>
                </div>
              </DemoCard>
            </div>
            <TestCallout
              cases={manualCases.filter((testCase) => testCase.section === "Feedback")}
              results={results}
              setCaseResult={setCaseResult}
            />
          </section>

          <section className="lab-section" id="navigation">
            <SectionHeading
              index="04"
              title="Navigation"
              description="Selection and orientation should always be obvious."
            />
            <div className="demo-grid demo-grid--2">
              <DemoCard title="Tabs" meta="Selected state and conditional content">
                <Tabs value={tab} onValueChange={setTab} className="sample-tabs">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="courses">Courses</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <div className="tab-content">
                      <strong>Weekly overview</strong>
                      <span>Two upcoming classes · one task due today.</span>
                    </div>
                  </TabsContent>
                  <TabsContent value="courses">
                    <div className="tab-content">
                      <strong>Enrolled courses</strong>
                      <span>Engineering Physics · Data Structures.</span>
                    </div>
                  </TabsContent>
                  <TabsContent value="activity">
                    <div className="tab-content">
                      <strong>Recent activity</strong>
                      <span>Attendance synced at 08:39.</span>
                    </div>
                  </TabsContent>
                </Tabs>
              </DemoCard>
              <DemoCard
                title="Breadcrumbs & page header"
                meta="Current location and contextual actions"
              >
                <Breadcrumbs
                  items={[
                    { label: "Academics", href: "#foundation" },
                    { label: "Attendance", href: "#feedback" },
                    { label: "Engineering Physics", active: true },
                  ]}
                />
                <PageHeader
                  title="Engineering Physics"
                  meta={<Badge variant="warning">74% attendance</Badge>}
                  actions={
                    <Button size="sm" onClick={() => showToast("Report opened")}>
                      View report
                    </Button>
                  }
                />
              </DemoCard>
              <DemoCard title="Sub-tab strip" meta="Animated active indicator">
                <SubTabStrip
                  tabs={[
                    { id: "today", label: "Today" },
                    { id: "week", label: "This week" },
                    { id: "month", label: "This month" },
                  ]}
                  activeTab={subTab}
                  onChange={setSubTab}
                />
                <div className="tab-content">
                  <strong>
                    {subTab === "today"
                      ? "3 classes today"
                      : subTab === "week"
                        ? "14 classes this week"
                        : "52 classes this month"}
                  </strong>
                  <span>Switch the period; summary follows selection.</span>
                </div>
              </DemoCard>
              <DemoCard title="View mode & expandable section" meta="Stateful controls">
                <ViewModeToggle
                  options={[
                    { key: "list", icon: <ListChecks size={16} />, label: "List" },
                    { key: "grid", icon: <LayoutGrid size={16} />, label: "Grid" },
                  ]}
                  value={viewMode}
                  onChange={setViewMode}
                />
                <p className="demo-caption">
                  Current view: <strong>{viewMode}</strong>
                </p>
                <div className="expandable-sample">
                  <ExpandableSection
                    title="Class details"
                    badge={<Badge>2 items</Badge>}
                    icon={<FileText size={16} />}
                  >
                    <p className="demo-caption">Room AB1-404 · Dr. R. Kavitha · 08:00–08:50</p>
                    <p className="demo-caption">
                      Use the heading to collapse and reveal these details.
                    </p>
                  </ExpandableSection>
                </div>
              </DemoCard>
            </div>
            <p className="demo-caption mobile-nav-hint">
              At phone widths, the fixed bottom navigation appears. Selected: {activeMobileNav}.
            </p>
            <TestCallout
              cases={manualCases.filter((testCase) => testCase.section === "Navigation")}
              results={results}
              setCaseResult={setCaseResult}
            />
          </section>

          <section className="lab-section" id="overlays">
            <SectionHeading
              index="05"
              title="Menus & overlays"
              description="Open, interact, dismiss: test every route out."
            />
            <div className="demo-grid demo-grid--2">
              <DemoCard title="Dropdown menu" meta="Open · choose · dismiss">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <span>{selectedMenu}</span>
                      <ChevronDown size={15} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onPress={() => setSelectedMenu("Export timetable")}>
                      Export timetable
                    </DropdownMenuItem>
                    <DropdownMenuItem onPress={() => setSelectedMenu("Copy share link")}>
                      Copy share link
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onPress={() => setSelectedMenu("Open settings")}>
                      Open settings
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </DemoCard>
              <DemoCard title="Popover" meta="Toggle and outside-dismiss">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">Show sync details</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <strong>Last synced just now</strong>
                    <p className="demo-caption">
                      All 6 course records are up to date. Click outside to dismiss.
                    </p>
                  </PopoverContent>
                </Popover>
              </DemoCard>
              <DemoCard title="Dialog" meta="Trigger · cancel · close · Escape">
                <Dialog>
                  <DialogTrigger className="min-h-11 rounded-sm bg-accent px-4 py-2 text-accent-foreground">
                    Review changes
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Save timetable changes?</DialogTitle>
                      <DialogDescription>
                        Your updated class preferences will apply to this device.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose className="min-h-11 rounded-sm border border-line px-4 py-2">
                        Cancel
                      </DialogClose>
                      <DialogClose className="min-h-11 rounded-sm bg-accent px-4 py-2 text-accent-foreground">
                        Save changes
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </DemoCard>
              <DemoCard title="Modal" meta="Inside click · backdrop · close button · Escape">
                <Button variant="outline" onClick={() => setModalOpen(true)}>
                  Open modal
                </Button>
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Edit reminder">
                  <p className="demo-caption">
                    Click this text or type here; the modal should stay open. Try Escape or the
                    backdrop to close.
                  </p>
                  <Input aria-label="Reminder title" defaultValue="Submit lab report" />
                  <div className="modal-actions">
                    <Button variant="outline" onClick={() => setModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        setModalOpen(false)
                        showToast("Reminder saved")
                      }}
                    >
                      Save reminder
                    </Button>
                  </div>
                </Modal>
              </DemoCard>
            </div>
            <TestCallout
              cases={manualCases.filter((testCase) => testCase.section === "Overlays")}
              results={results}
              setCaseResult={setCaseResult}
            />
          </section>

          <section className="lab-section" id="data">
            <SectionHeading
              index="06"
              title="Data display"
              description="Realistic density, empty tables, and information in sequence."
            />
            <div className="demo-grid demo-grid--1">
              <DemoCard
                title="Table & data table"
                meta="Headers · row hover · empty result · overflow"
              >
                <div className="table-scroll">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Slot</TableHead>
                        <TableHead>Room</TableHead>
                        <TableHead>Attendance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Engineering Physics</TableCell>
                        <TableCell>C1+TC1</TableCell>
                        <TableCell>AB1-404</TableCell>
                        <TableCell>
                          <Badge variant="warning">74%</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Data Structures</TableCell>
                        <TableCell>A1+TA1</TableCell>
                        <TableCell>AB1-306</TableCell>
                        <TableCell>
                          <Badge variant="success">88%</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <DataTable
                  caption="Upcoming classes"
                  columns={[
                    { key: "time", label: "Time" },
                    { key: "course", label: "Course" },
                    { key: "room", label: "Room" },
                    {
                      key: "status",
                      label: "Status",
                      render: (value) => (
                        <Badge variant={value === "On track" ? "success" : "warning"}>
                          {String(value)}
                        </Badge>
                      ),
                    },
                  ]}
                  data={[
                    {
                      time: "08:00",
                      course: "Engineering Physics",
                      room: "AB1-404",
                      status: "Review",
                    },
                    {
                      time: "08:55",
                      course: "Qualitative Skills",
                      room: "F1-201",
                      status: "On track",
                    },
                    {
                      time: "10:00",
                      course: "Data Structures",
                      room: "AB1-306",
                      status: "On track",
                    },
                  ]}
                />
                <div className="empty-table">
                  <DataTable
                    caption="Empty search result"
                    columns={[{ key: "course", label: "Course" }]}
                    data={[]}
                    emptyMessage="No courses match this filter."
                  />
                </div>
              </DemoCard>
              <DemoCard title="Timeline" meta="Date · title · description · action">
                <Timeline>
                  <TimelineItem dotColor="emerald">
                    <TimelineCard>
                      <TimelineDate>Today · 08:39</TimelineDate>
                      <TimelineTitle>Attendance synced</TimelineTitle>
                      <TimelineDescription>
                        All 6 enrolled courses are up to date.
                      </TimelineDescription>
                      <TimelineActions>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => showToast("Sync details opened")}
                        >
                          View sync details
                        </Button>
                      </TimelineActions>
                    </TimelineCard>
                  </TimelineItem>
                  <TimelineItem dotColor="amber">
                    <TimelineCard>
                      <TimelineDate>Yesterday · 17:20</TimelineDate>
                      <TimelineTitle>Reminder added</TimelineTitle>
                      <TimelineDescription>
                        Physics lab report · due Friday at 18:00.
                      </TimelineDescription>
                    </TimelineCard>
                  </TimelineItem>
                  <TimelineItem dotColor="blue">
                    <TimelineCard>
                      <TimelineDate>Monday · 09:00</TimelineDate>
                      <TimelineTitle>New course published</TimelineTitle>
                      <TimelineDescription>
                        Design Research Methods · 3 credits.
                      </TimelineDescription>
                    </TimelineCard>
                  </TimelineItem>
                </Timeline>
              </DemoCard>
            </div>
            <TestCallout
              cases={manualCases.filter((testCase) => testCase.section === "Data")}
              results={results}
              setCaseResult={setCaseResult}
            />
          </section>

          <section className="lab-section" id="accessibility">
            <SectionHeading
              index="07"
              title="Accessibility & responsive QA"
              description="These checks apply across every component—not just the examples above."
            />
            <div className="accessibility-grid">
              <div className="accessibility-card">
                <span className="accessibility-number">A</span>
                <strong>Keyboard access</strong>
                <p>
                  Tab through every section. Activate controls with Enter or Space. Escape should
                  dismiss open overlays.
                </p>
              </div>
              <div className="accessibility-card">
                <span className="accessibility-number">B</span>
                <strong>Visible focus</strong>
                <p>
                  Focus indicators should be easy to see in both themes and not be hidden by
                  clipping.
                </p>
              </div>
              <div className="accessibility-card">
                <span className="accessibility-number">C</span>
                <strong>Responsive behavior</strong>
                <p>
                  Check 1440, 1024, 768, 390, and 320 px. No accidental page-level horizontal
                  scroll.
                </p>
              </div>
              <div className="accessibility-card">
                <span className="accessibility-number">D</span>
                <strong>Motion preference</strong>
                <p>
                  Enable reduced motion. Transitions should not make essential status hard to
                  understand.
                </p>
              </div>
            </div>
            <TestCallout
              cases={manualCases.filter((testCase) => testCase.section === "Accessibility")}
              results={results}
              setCaseResult={setCaseResult}
            />
          </section>

          <section className="lab-section checklist-section" id="checklist">
            <SectionHeading
              index="08"
              title="Manual QA checklist"
              description="Test the interaction, compare it with the expectation, and record your result."
            />
            <div className="checklist-toolbar">
              <label className="checklist-search">
                <Search size={16} aria-hidden="true" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Find a test…"
                />
              </label>
              <select
                value={sectionFilter}
                onChange={(event) => setSectionFilter(event.target.value)}
                aria-label="Filter checklist"
              >
                <option value="all">All sections</option>
                {sections.slice(0, -1).map(({ id, label }) => (
                  <option key={id} value={label.toLowerCase().replace(/ /g, "-")}>
                    {label}
                  </option>
                ))}
              </select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (
                    !window.confirm(
                      "Clear all saved test results and issue notes for this browser?"
                    )
                  )
                    return
                  localStorage.removeItem("amazeui-manual-test-results")
                  manualCases.forEach(({ id }) =>
                    localStorage.removeItem(`amazeui-manual-note:${id}`)
                  )
                  setResults({})
                  showToast("Manual test run cleared")
                }}
              >
                Reset run
              </Button>
            </div>
            <div className="checklist-summary">
              <strong>{visibleCases.length} checks</strong>
              <span>{passed} pass</span>
              <span>{failed} flagged</span>
              <span>{manualCases.length - allTested} not run</span>
            </div>
            <div className="checklist-grid">
              {visibleCases.map((testCase) => (
                <CaseCard
                  key={testCase.id}
                  testCase={testCase}
                  result={results[testCase.id]}
                  onResult={(result) => setCaseResult(testCase.id, result)}
                />
              ))}
              {visibleCases.length === 0 && (
                <EmptyState
                  title="No matching checks"
                  description="Try a different search or section."
                />
              )}
            </div>
          </section>

          <footer className="lab-footer">
            <span>
              <span className="brand-mark brand-mark--small">A</span> AmazeUI · manual testing
              workbench
            </span>
            <span>Sample academic data · no network requests</span>
            <button type="button" onClick={() => scrollTo("top")}>
              Back to top ↑
            </button>
          </footer>
          <MobileBottomNav
            className="manual-mobile-nav"
            items={[
              { id: "home", label: "Home", icon: <House /> },
              { id: "academics", label: "Academics", icon: <GraduationCap /> },
              { id: "calendar", label: "Calendar", icon: <CalendarDays /> },
              { id: "apps", label: "Apps", icon: <LayoutGrid /> },
            ].map((tab) => ({
              ...tab,
              isActive: activeMobileNav === tab.id,
              onClick: () => setActiveMobileNav(tab.id),
            }))}
          />
        </div>
      </main>
      {toast && (
        <div className="toast-message" role="status">
          {toast}
        </div>
      )}
    </div>
  )
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label className="lab-field-label" htmlFor={htmlFor}>
      <Label>{children}</Label>
    </label>
  )
}

function SectionHeading({
  index,
  title,
  description,
}: {
  index: string
  title: string
  description: string
}) {
  return (
    <div className="section-heading">
      <span className="section-index">{index}</span>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}

function DemoCard({
  title,
  meta,
  children,
}: {
  title: string
  meta: string
  children: React.ReactNode
}) {
  return (
    <article className="demo-card">
      <header className="demo-card__header">
        <div>
          <h3>{title}</h3>
          <span>{meta}</span>
        </div>
        <span className="demo-card__dots" aria-hidden="true">
          •••
        </span>
      </header>
      <div className="demo-card__body">{children}</div>
    </article>
  )
}

function TestCallout({
  cases,
  results,
  setCaseResult,
}: {
  cases: ManualCase[]
  results: Record<string, TestStatus | undefined>
  setCaseResult: (id: string, result?: TestStatus) => void
}) {
  return (
    <div className="inline-cases">
      {cases.map((testCase) => (
        <CaseCard
          key={testCase.id}
          testCase={testCase}
          result={results[testCase.id]}
          onResult={(result) => setCaseResult(testCase.id, result)}
        />
      ))}
    </div>
  )
}

export function ManualTestLab() {
  return <ManualTestLabContent />
}
