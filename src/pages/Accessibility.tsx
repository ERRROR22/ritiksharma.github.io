import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Tracks an overlay's open state and briefly applies a highlight class
 * to its trigger when it closes — visually confirming focus returned.
 */
function useFocusReturnFlash(
  screenshotMode: boolean = false,
  durationMs: number = 3000,
) {
  const [open, setOpen] = useState(false);
  const [flash, setFlash] = useState(false);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (wasOpen.current && !open) {
      setFlash(true);
      if (!screenshotMode) {
        const t = window.setTimeout(
          () => setFlash(false),
          Math.max(0, durationMs),
        );
        wasOpen.current = open;
        return () => window.clearTimeout(t);
      }
    }
    wasOpen.current = open;
  }, [open, screenshotMode, durationMs]);

  const flashClass = flash
    ? "ring-2 ring-primary ring-offset-2 ring-offset-background animate-pulse"
    : "";

  return { open, onOpenChange: setOpen, flashClass, dismiss: () => setFlash(false) };
}
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Section = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <section className="rounded-xl border border-border bg-card/40 p-6 space-y-3">
    <div>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    <div className="flex flex-wrap gap-3 pt-2">{children}</div>
  </section>
);

const ChecklistItem = ({ label }: { label: string }) => (
  <li className="flex items-start gap-2 text-sm text-muted-foreground">
    <span className="mt-0.5 h-4 w-4 shrink-0 rounded border border-border" />
    {label}
  </li>
);

const OVERLAY_KEYS = [
  "dialog",
  "alert",
  "dropdown",
  "context",
  "popover",
  "select",
  "sheet",
  "command",
] as const;
type OverlayKey = (typeof OVERLAY_KEYS)[number];

const OVERLAY_LABELS: Record<OverlayKey, string> = {
  dialog: "Dialog",
  alert: "Alert Dialog",
  dropdown: "Dropdown",
  context: "Context Menu",
  popover: "Popover",
  select: "Select",
  sheet: "Sheet",
  command: "Command Menu",
};

const SCREENSHOT_MODE_KEY_PREFIX = "a11y:screenshotMode:";
const DURATION_KEY_PREFIX = "a11y:flashDuration:";
const DEFAULT_DURATION_MS = 3000;
const DURATION_PRESETS = [0, 1000, 3000, 60000] as const;
const SAVED_PRESETS_KEY = "a11y:flashDuration:savedPresets";
const storageKey = (k: OverlayKey) => `${SCREENSHOT_MODE_KEY_PREFIX}${k}`;
const durationStorageKey = (k: OverlayKey) => `${DURATION_KEY_PREFIX}${k}`;

type SavedPreset = { name: string; durations: Record<OverlayKey, number> };

function loadSavedPresets(): SavedPreset[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SAVED_PRESETS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (p): p is SavedPreset =>
        p && typeof p.name === "string" && p.durations && typeof p.durations === "object",
    );
  } catch {
    return [];
  }
}

function usePersistedScreenshotMode() {
  const [modes, setModes] = useState<Record<OverlayKey, boolean>>(() => {
    const initial = {} as Record<OverlayKey, boolean>;
    for (const k of OVERLAY_KEYS) {
      let v = false;
      if (typeof window !== "undefined") {
        try {
          v = window.localStorage.getItem(storageKey(k)) === "true";
        } catch {
          /* ignore */
        }
      }
      initial[k] = v;
    }
    return initial;
  });

  const setMode = (k: OverlayKey, v: boolean) => {
    setModes((prev) => ({ ...prev, [k]: v }));
    try {
      window.localStorage.setItem(storageKey(k), String(v));
    } catch {
      /* ignore */
    }
  };

  const setAll = (v: boolean) => {
    const next = {} as Record<OverlayKey, boolean>;
    for (const k of OVERLAY_KEYS) {
      next[k] = v;
      try {
        window.localStorage.setItem(storageKey(k), String(v));
      } catch {
        /* ignore */
      }
    }
    setModes(next);
  };

  return { modes, setMode, setAll };
}

function usePersistedDurations() {
  const [durations, setDurations] = useState<Record<OverlayKey, number>>(() => {
    const initial = {} as Record<OverlayKey, number>;
    for (const k of OVERLAY_KEYS) {
      let v = DEFAULT_DURATION_MS;
      if (typeof window !== "undefined") {
        try {
          const raw = window.localStorage.getItem(durationStorageKey(k));
          const parsed = raw == null ? NaN : parseInt(raw, 10);
          if (Number.isFinite(parsed) && parsed >= 0) v = parsed;
        } catch {
          /* ignore */
        }
      }
      initial[k] = v;
    }
    return initial;
  });

  const setDuration = (k: OverlayKey, v: number) => {
    const clamped = Math.max(0, Math.min(60000, Math.round(v)));
    setDurations((prev) => ({ ...prev, [k]: clamped }));
    try {
      window.localStorage.setItem(durationStorageKey(k), String(clamped));
    } catch {
      /* ignore */
    }
  };

  return { durations, setDuration };
}

const Accessibility = () => {
  const { modes, setMode, setAll } = usePersistedScreenshotMode();
  const { durations, setDuration } = usePersistedDurations();
  const [durationErrors, setDurationErrors] = useState<Record<OverlayKey, boolean>>(() => {
    const initial = {} as Record<OverlayKey, boolean>;
    for (const k of OVERLAY_KEYS) initial[k] = false;
    return initial;
  });

  const dialog = useFocusReturnFlash(modes.dialog, durations.dialog);
  const alert = useFocusReturnFlash(modes.alert, durations.alert);
  const dropdown = useFocusReturnFlash(modes.dropdown, durations.dropdown);
  const context = useFocusReturnFlash(modes.context, durations.context);
  const popover = useFocusReturnFlash(modes.popover, durations.popover);
  const select = useFocusReturnFlash(modes.select, durations.select);
  const sheet = useFocusReturnFlash(modes.sheet, durations.sheet);
  const command = useFocusReturnFlash(modes.command, durations.command);

  const overlays: Record<OverlayKey, { dismiss: () => void }> = {
    dialog,
    alert,
    dropdown,
    context,
    popover,
    select,
    sheet,
    command,
  };

  const dismissAllRings = () => {
    OVERLAY_KEYS.forEach((k) => overlays[k].dismiss());
  };

  const resetDurations = () => {
    OVERLAY_KEYS.forEach((k) => setDuration(k, DEFAULT_DURATION_MS));
    const cleared = {} as Record<OverlayKey, boolean>;
    for (const k of OVERLAY_KEYS) cleared[k] = false;
    setDurationErrors(cleared);
  };

  const [savedPresets, setSavedPresets] = useState<SavedPreset[]>(() => loadSavedPresets());

  const persistPresets = (next: SavedPreset[]) => {
    setSavedPresets(next);
    try {
      window.localStorage.setItem(SAVED_PRESETS_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const saveCurrentPreset = () => {
    const name = window.prompt("Name this preset:");
    if (!name) return;
    const trimmed = name.trim();
    if (!trimmed) return;
    const snapshot: Record<OverlayKey, number> = { ...durations };
    const existing = savedPresets.findIndex((p) => p.name === trimmed);
    const next =
      existing >= 0
        ? savedPresets.map((p, i) => (i === existing ? { name: trimmed, durations: snapshot } : p))
        : [...savedPresets, { name: trimmed, durations: snapshot }];
    persistPresets(next);
  };

  const loadPreset = (name: string) => {
    const preset = savedPresets.find((p) => p.name === name);
    if (!preset) return;
    OVERLAY_KEYS.forEach((k) => {
      const v = preset.durations[k];
      if (typeof v === "number" && Number.isFinite(v)) setDuration(k, v);
    });
    const cleared = {} as Record<OverlayKey, boolean>;
    for (const k of OVERLAY_KEYS) cleared[k] = false;
    setDurationErrors(cleared);
  };

  const deletePreset = (name: string) => {
    persistPresets(savedPresets.filter((p) => p.name !== name));
  };

  const anyOn = OVERLAY_KEYS.some((k) => modes[k]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-4 py-12 space-y-8">
        <header className="space-y-2">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to portfolio
          </Link>
          <h1 className="text-3xl font-bold">Accessibility Test Page</h1>
          <p className="text-muted-foreground">
            Tab through each control and open every overlay to confirm focus
            rings are visible. Use Esc to close and confirm focus returns to
            the trigger.
          </p>
          <div className="rounded-md border border-primary/30 bg-primary/5 p-3 text-sm text-foreground">
            <strong className="font-medium">Focus-return verification:</strong>{" "}
            After you close any overlay (Esc, arrow keys, or selecting an
            item), its trigger briefly pulses with a primary-colored ring.
            That visual confirms focus returned to the trigger element.
          </div>
          <div className="space-y-3 rounded-md border border-border bg-card/40 p-3 text-sm">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-medium text-foreground">
                Screenshot mode (per overlay)
              </span>
              <span className="text-muted-foreground">
                Keeps focus-return rings visible until dismissed. Saved per
                overlay across refreshes.
              </span>
              <div className="ml-auto flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setAll(!anyOn)}
                >
                  {anyOn ? "Disable all" : "Enable all"}
                </Button>
                <Button size="sm" variant="outline" onClick={dismissAllRings}>
                  Dismiss rings
                </Button>
                <Button size="sm" variant="outline" onClick={resetDurations}>
                  Reset to defaults
                </Button>
                <Button size="sm" variant="outline" onClick={saveCurrentPreset}>
                  Save preset
                </Button>
              </div>
            </div>
            {savedPresets.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 border-t border-border/50 pt-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Saved presets:
                </span>
                {savedPresets.map((p) => (
                  <span
                    key={p.name}
                    className="inline-flex items-center gap-1 rounded border border-border/60 bg-background px-1.5 py-0.5 text-xs"
                  >
                    <button
                      type="button"
                      onClick={() => loadPreset(p.name)}
                      className="text-foreground hover:text-primary"
                      title="Load preset"
                    >
                      {p.name}
                    </button>
                    <button
                      type="button"
                      onClick={() => deletePreset(p.name)}
                      className="text-muted-foreground hover:text-destructive"
                      aria-label={`Delete preset ${p.name}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {OVERLAY_KEYS.map((k) => (
                <div
                  key={k}
                  className="flex items-center gap-2 rounded border border-border/50 bg-background/40 px-2 py-1.5"
                >
                  <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={modes[k]}
                      onChange={(e) => setMode(k, e.target.checked)}
                      className="h-4 w-4 rounded border-border accent-primary"
                    />
                    <span className="text-foreground truncate">
                      {OVERLAY_LABELS[k]}
                    </span>
                  </label>
                  <div className="flex flex-col items-end gap-0.5">
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min={0}
                        max={60000}
                        step={250}
                        value={durations[k]}
                        disabled={modes[k]}
                        onChange={(e) => {
                          const raw = e.target.value;
                          const val = parseInt(raw, 10);
                          const invalid = !Number.isNaN(val) && (val < 0 || val > 60000);
                          setDurationErrors((prev) => ({ ...prev, [k]: invalid }));
                          setDuration(k, Number.isNaN(val) ? 0 : val);
                        }}
                        onBlur={() => setDurationErrors((prev) => ({ ...prev, [k]: false }))}
                        className={cn(
                          "w-20 rounded border bg-background px-2 py-0.5 text-right text-xs text-foreground disabled:opacity-50",
                          durationErrors[k] ? "border-destructive" : "border-border",
                        )}
                        aria-label={`${OVERLAY_LABELS[k]} ring duration in milliseconds`}
                        aria-invalid={durationErrors[k] || undefined}
                      />
                      <span className="text-xs text-muted-foreground">ms</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {DURATION_PRESETS.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          disabled={modes[k]}
                          onClick={() => {
                            setDurationErrors((prev) => ({ ...prev, [k]: false }));
                            setDuration(k, preset);
                          }}
                          className={cn(
                            "rounded border px-1.5 py-0.5 text-[10px] leading-none transition-colors",
                            modes[k]
                              ? "border-border/30 text-muted-foreground/40 cursor-not-allowed"
                              : "border-border/60 bg-background text-muted-foreground hover:border-primary hover:text-primary",
                          )}
                        >
                          {preset === 0 ? "0ms" : preset === 60000 ? "60s" : `${preset}ms`}
                        </button>
                      ))}
                    </div>
                    {durationErrors[k] && (
                      <span className="text-[10px] leading-none text-destructive">
                        0–60000 ms
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </header>

        <section className="rounded-xl border border-border bg-card/40 p-6 space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Keyboard Test Checklist
            </h2>
            <p className="text-sm text-muted-foreground">
              Follow these steps for each overlay to verify keyboard
              accessibility.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">Dialog</h3>
              <ul className="space-y-1">
                <ChecklistItem label="Tab to the Open Dialog button and press Enter/Space." />
                <ChecklistItem label="Tab cycles only inside the dialog (input → Cancel → Confirm)." />
                <ChecklistItem label="Press Esc to close the dialog." />
                <ChecklistItem label="Focus returns to the Open Dialog button with a visible ring." />
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">
                Alert Dialog
              </h3>
              <ul className="space-y-1">
                <ChecklistItem label="Tab to the Open Alert Dialog button and press Enter/Space." />
                <ChecklistItem label="Tab cycles between Cancel and Continue only." />
                <ChecklistItem label="Press Esc to close the alert." />
                <ChecklistItem label="Focus returns to the trigger button with a visible ring." />
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">
                Dropdown Menu
              </h3>
              <ul className="space-y-1">
                <ChecklistItem label="Tab to the Open Dropdown button and press Enter/Space." />
                <ChecklistItem label="Use ↑ / ↓ arrows to move between items." />
                <ChecklistItem label="Highlighted item shows a focus ring." />
                <ChecklistItem label="Press Esc to close; focus returns to trigger." />
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">
                Context Menu
              </h3>
              <ul className="space-y-1">
                <ChecklistItem label="Tab to the target area and press Shift+F10 (or right-click)." />
                <ChecklistItem label="Use ↑ / ↓ arrows to move between items." />
                <ChecklistItem label="Press Esc to close the context menu." />
                <ChecklistItem label="Focus returns to the target area." />
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">Popover</h3>
              <ul className="space-y-1">
                <ChecklistItem label="Tab to the Open Popover button and press Enter/Space." />
                <ChecklistItem label="Tab moves into the popover content (input → Submit)." />
                <ChecklistItem label="Press Esc to close the popover." />
                <ChecklistItem label="Focus returns to the Open Popover button." />
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">Select</h3>
              <ul className="space-y-1">
                <ChecklistItem label="Tab to the Select trigger and press Enter/Space." />
                <ChecklistItem label="Use ↑ / ↓ arrows to move between options." />
                <ChecklistItem label="Press Enter to select; Esc closes without selecting." />
                <ChecklistItem label="Focus returns to the Select trigger." />
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">Sheet</h3>
              <ul className="space-y-1">
                <ChecklistItem label="Tab to the Open Sheet button and press Enter/Space." />
                <ChecklistItem label="Tab cycles inside the sheet (Name → Email → Save)." />
                <ChecklistItem label="Press Esc to close the sheet." />
                <ChecklistItem label="Focus returns to the Open Sheet button." />
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">
                Command Menu
              </h3>
              <ul className="space-y-1">
                <ChecklistItem label="Tab to the Show Command Menu button and press Enter/Space." />
                <ChecklistItem label="Type to filter; use ↑ / ↓ arrows to navigate items." />
                <ChecklistItem label="Press Esc to close the command menu." />
                <ChecklistItem label="Focus returns to the Show Command Menu button." />
              </ul>
            </div>
          </div>
        </section>

        <Section
          title="Dialog"
          description="Standard modal dialog. Tab cycles within content; Esc closes."
        >
          <Dialog open={dialog.open} onOpenChange={dialog.onOpenChange}>
            <DialogTrigger asChild>
              <Button className={dialog.flashClass}>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sample dialog</DialogTitle>
                <DialogDescription>
                  Tab between the input and the buttons to check focus rings.
                </DialogDescription>
              </DialogHeader>
              <Input placeholder="Focusable input" />
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        <Section
          title="Alert Dialog"
          description="Confirmation alert with action and cancel buttons."
        >
          <AlertDialog open={alert.open} onOpenChange={alert.onOpenChange}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className={alert.flashClass}>
                Open Alert Dialog
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Section>

        <Section
          title="Dropdown Menu"
          description="Arrow keys move between items; highlighted item shows focus ring."
        >
          <DropdownMenu open={dropdown.open} onOpenChange={dropdown.onOpenChange}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className={dropdown.flashClass}>
                Open Dropdown
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        <Section
          title="Context Menu"
          description="Right-click (or Shift+F10) on the target to open."
        >
          <ContextMenu onOpenChange={context.onOpenChange}>
            <ContextMenuTrigger
              className={`flex h-24 w-full items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground ${context.flashClass}`}
            >
              Right-click here
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Cut</ContextMenuItem>
              <ContextMenuItem>Copy</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Section>

        <Section
          title="Popover"
          description="Inline overlay with focusable content."
        >
          <Popover open={popover.open} onOpenChange={popover.onOpenChange}>
            <PopoverTrigger asChild>
              <Button variant="outline" className={popover.flashClass}>
                Open Popover
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <p className="text-sm">Popover content with an input:</p>
                <Input placeholder="Type here" />
                <Button size="sm">Submit</Button>
              </div>
            </PopoverContent>
          </Popover>
        </Section>

        <Section
          title="Select"
          description="Native-feeling select with keyboard support."
        >
          <Select onOpenChange={select.onOpenChange}>
            <SelectTrigger className={`w-[220px] ${select.flashClass}`}>
              <SelectValue placeholder="Pick an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="cherry">Cherry</SelectItem>
            </SelectContent>
          </Select>
        </Section>

        <Section
          title="Sheet"
          description="Side drawer overlay."
        >
          <Sheet open={sheet.open} onOpenChange={sheet.onOpenChange}>
            <SheetTrigger asChild>
              <Button variant="outline" className={sheet.flashClass}>
                Open Sheet
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Sample sheet</SheetTitle>
                <SheetDescription>
                  Tab between focusable items to check rings.
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-2 pt-4">
                <Input placeholder="Name" />
                <Input placeholder="Email" />
                <Button>Save</Button>
              </div>
            </SheetContent>
          </Sheet>
        </Section>

        <Section
          title="Command Menu"
          description="Searchable command palette (cmdk)."
        >
          <Button
            variant="outline"
            className={command.flashClass}
            onClick={() => command.onOpenChange(!command.open)}
          >
            {command.open ? "Hide" : "Show"} Command Menu
          </Button>
          {command.open && (
            <div className="w-full rounded-md border border-border">
              <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>Calendar</CommandItem>
                    <CommandItem>Search</CommandItem>
                    <CommandItem>Settings</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          )}
        </Section>
      </div>
    </main>
  );
};

export default Accessibility;
