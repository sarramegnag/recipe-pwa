import { t } from './i18n'

export type Theme = 'system' | 'light' | 'dark'

interface SettingsPanelProps {
  open: boolean
  theme: Theme
  onThemeChange: (theme: Theme) => void
  onClose: () => void
}

const themes: { value: Theme; label: () => string }[] = [
  { value: 'system', label: () => t('themeSystem') },
  { value: 'light', label: () => t('themeLight') },
  { value: 'dark', label: () => t('themeDark') },
]

export default function SettingsPanel({ open, theme, onThemeChange, onClose }: SettingsPanelProps) {
  return (
    <>
      <div className={`settings-backdrop${open ? ' open' : ''}`} onClick={onClose} />
      <aside className={`settings-panel${open ? ' open' : ''}`}>
        <header className="settings-header">
          <h2>{t('settings')}</h2>
          <button className="settings-close" onClick={onClose} aria-label="Close">✕</button>
        </header>
        <div className="settings-body">
          <label className="settings-label">{t('appearance')}</label>
          <div className="theme-picker">
            {themes.map(({ value, label }) => (
              <button
                key={value}
                className={`theme-option${theme === value ? ' active' : ''}`}
                onClick={() => onThemeChange(value)}
              >
                {label()}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}
