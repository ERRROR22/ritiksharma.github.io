import { Sun, Moon, Monitor, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const options = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
] as const;

const ThemeSwitcher = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-2 w-9 h-9" aria-hidden="true" />
    );
  }

  // Show icon based on resolved theme so "system" displays the active appearance
  const displayKey =
    theme === "system" ? `system-${resolvedTheme}` : theme ?? "dark";
  const ActiveIcon =
    theme === "system"
      ? Monitor
      : resolvedTheme === "light"
      ? Sun
      : Moon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all overflow-hidden"
          aria-label="Change theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={displayKey}
              initial={{ y: -16, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 16, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="block"
            >
              <ActiveIcon className="w-5 h-5" />
            </motion.span>
          </AnimatePresence>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass glass-border min-w-[10rem]">
        {options.map(({ value, label, Icon }) => {
          const selected = (theme ?? "system") === value;
          return (
            <DropdownMenuItem
              key={value}
              onClick={() => setTheme(value)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Icon className="w-4 h-4" />
              <span className="flex-1">{label}</span>
              {selected && <Check className="w-4 h-4 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
