'use client';

import { useEffect, useId, useRef, useState, type ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import { SunIcon, MoonIcon, SystemIcon } from '../icons';
import { useTheme, type ThemePreference } from '../../../theme';

const iconByTheme: Record<ThemePreference, ReactElement> = {
  light: <SunIcon className="h-[1.25rem] w-[1.25rem] shrink-0" />,
  dark: <MoonIcon className="h-[1.25rem] w-[1.25rem] shrink-0" />,
  system: <SystemIcon className="h-[1.25rem] w-[1.25rem] shrink-0" />,
};

const options: Array<{ value: ThemePreference; labelKey: string }> = [
  { value: 'light', labelKey: 'theme.options.light' },
  { value: 'dark', labelKey: 'theme.options.dark' },
  { value: 'system', labelKey: 'theme.options.system' },
];

export const ThemeToggle = () => {
  const t = useTranslations('common');
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const selectedOption = options.find((option) => option.value === theme) ?? options[2];
  const selectedLabel = t(selectedOption.labelKey);
  const resolvedThemeLabel = mounted ? t(`theme.options.${resolvedTheme}`) : '';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSelect = (nextTheme: ThemePreference) => {
    setTheme(nextTheme);
    setIsOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className="theme-toggle"
      aria-label={mounted
        ? t('theme.selectorLabel', { preference: selectedLabel, applied: resolvedThemeLabel })
        : t('theme.menuLabel')}
    >
      <button
        type="button"
        className={`theme-toggle-trigger ${isOpen ? 'is-open' : ''}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={mounted
          ? t('theme.triggerLabel', { preference: selectedLabel, applied: resolvedThemeLabel })
          : t('theme.menuLabel')}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        {iconByTheme[theme]}
        <span className="theme-toggle-trigger-value">{selectedLabel}</span>
        <span className={`theme-toggle-caret ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
          ▼
        </span>
      </button>

      <div
        id={menuId}
        className={`theme-toggle-menu ${isOpen ? 'is-open' : ''}`}
        role="menu"
        aria-label={t('theme.menuLabel')}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`theme-toggle-option ${theme === option.value ? 'is-active' : ''}`}
            onClick={() => handleSelect(option.value)}
            role="menuitemradio"
            aria-checked={theme === option.value}
            aria-label={mounted
              ? t(option.value === 'system' ? 'theme.useSystemLabel' : 'theme.useThemeLabel', {
                  theme: t(option.labelKey),
                  applied: resolvedThemeLabel,
                })
              : t('theme.menuLabel')}
          >
            {iconByTheme[option.value]}
            <span className="theme-toggle-label">{t(option.labelKey)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
