import { brand, colorValue, contrastReport, font, layout, mobile, mobileRadii, platformColors, radii, type Platform } from '../src/tokens';
import { ThemeFrame } from './ThemeFrame';

function Swatch({ value, label }: { value: string; label?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="size-8 shrink-0 rounded-[8px] border border-line" style={{ background: value }} aria-hidden="true" />
      <code className="text-[13px]">{label ?? value}</code>
    </div>
  );
}

export function BrandPalette() {
  return (
    <div className="sb-unstyled text-ink font-sans grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 ">
      {brand.map((b) => (
        <div key={b.name} className="overflow-hidden rounded-card border border-line bg-surface">
          <div className="h-20" style={{ background: b.value }} />
          <div className="p-3">
            <p className="font-semibold">{b.name}</p>
            <code className="text-[13px] text-muted">{b.value}</code>
            <p className="mt-1 text-[13px] text-muted">{b.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const scopeLabel = { shared: 'web + mobile', web: 'só web', mobile: 'só mobile' } as const;

export function SemanticPalette({ platform = 'web' }: { platform?: Platform }) {
  const list = platformColors(platform);
  return (
    <div className="sb-unstyled text-ink font-sans overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr>
            <th className="py-2 pr-4">{platform === 'web' ? 'CSS' : 'Swift'}</th>
            <th className="py-2 pr-4">Claro</th>
            <th className="py-2 pr-4">Escuro</th>
            <th className="py-2 pr-4">Onde</th>
            <th className="py-2">Uso</th>
          </tr>
        </thead>
        <tbody>
          {list.map((c) => (
            <tr key={c.name} className="border-t border-line">
              <td className="py-2 pr-4">
                <code>{platform === 'web' ? `--toski-${c.name}` : `ToskiColors.${c.name}`}</code>
              </td>
              <td className="py-2 pr-4">
                <Swatch value={c.light} />
              </td>
              <td className="py-2 pr-4">
                <Swatch value={c.dark} />
              </td>
              <td className="py-2 pr-4 whitespace-nowrap text-muted">{scopeLabel[c.scope]}</td>
              <td className="py-2">{c.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ContrastTable({ platform = 'web' }: { platform?: Platform }) {
  const report = contrastReport(platform);
  return (
    <div className="sb-unstyled text-ink font-sans flex flex-col gap-4 lg:flex-row">
      {(['light', 'dark'] as const).map((mode) => (
        <ThemeFrame key={mode} mode={mode}>
          <ul className="flex flex-col gap-2">
            {report
              .filter((r) => r.mode === mode)
              .map((r) => (
                <li
                  key={`${r.fg}-${r.bg}-${r.level}`}
                  className="flex items-center justify-between gap-3 rounded-[10px] px-3 py-2"
                  style={{ background: colorValue(platform, r.bg, mode), color: colorValue(platform, r.fg, mode) }}
                >
                  <span className={r.level === 'large' ? 'text-[18px] font-semibold' : 'text-sm'}>
                    {r.fg} / {r.bg}
                  </span>
                  <span className="text-sm font-semibold tabular-nums">
                    {r.ratio.toFixed(2)}:1 {r.pass ? '✓' : '✗'}
                  </span>
                </li>
              ))}
          </ul>
        </ThemeFrame>
      ))}
    </div>
  );
}

const typeScale = [
  { name: 'Título h1 (SectionHeading)', className: 'text-[clamp(36px,4.6vw,56px)] leading-[1.06] tracking-tight font-semibold', spec: '36–56px · 600 · altura 1,06' },
  { name: 'Título h2 (SectionHeading)', className: 'text-[clamp(30px,3.6vw,42px)] leading-[1.1] tracking-[-0.02em] font-semibold', spec: '30–42px · 600 · altura 1,1' },
  { name: 'Título h3 (SectionHeading)', className: 'text-[clamp(24px,2.6vw,30px)] leading-[1.15] font-semibold', spec: '24–30px · 600' },
  { name: 'Texto de apoio (lead)', className: 'text-[17px] leading-normal text-muted', spec: '17px · 400 · muted' },
  { name: 'Botão grande', className: 'text-[17px] font-semibold', spec: '17px · 600' },
  { name: 'Corpo / Botão médio', className: 'text-base', spec: '16px · 400' },
  { name: 'Pílula', className: 'text-sm font-medium', spec: '14px · 500' },
  { name: 'Kicker', className: 'text-[13px] font-semibold uppercase tracking-[0.06em] text-accent-text', spec: '13px · 600 · caixa alta · +0,06em' },
  { name: 'PLUS', className: 'text-xs font-semibold tracking-[0.04em]', spec: '12px · 600 · +0,04em' },
];

export function TypeScale() {
  return (
    <div className="sb-unstyled text-ink font-sans flex flex-col divide-y divide-line">
      {typeScale.map((t) => (
        <div key={t.name} className="flex flex-col gap-1 py-4">
          <span className="text-[13px] text-muted">
            {t.name} — {t.spec}
          </span>
          <span className={t.className}>A Paçoca cuida de você</span>
        </div>
      ))}
    </div>
  );
}

export function Weights() {
  return (
    <div className="sb-unstyled text-ink font-sans flex flex-wrap gap-6">
      {[400, 500, 600, 700].map((w) => (
        <div key={w} className="flex flex-col">
          <span className="text-[40px] leading-none" style={{ fontWeight: w }}>
            Aa
          </span>
          <code className="text-[13px] text-muted">{w}</code>
        </div>
      ))}
      <p className="basis-full text-sm text-muted">
        Família: <code>{font.web.join(', ')}</code>
      </p>
    </div>
  );
}

export function Radii({ platform = 'web' }: { platform?: Platform }) {
  const list =
    platform === 'web'
      ? radii.map((r) => ({ ...r, code: `rounded-${r.name}` }))
      : [
          ...radii.map((r) => ({ ...r, name: r.mobileName, code: `ToskiRadius.${r.mobileName}` })),
          ...mobileRadii.map((r) => ({ ...r, code: `ToskiRadius.${r.name}` })),
        ];
  return (
    <div className="sb-unstyled text-ink font-sans grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4">
      {list.map((r) => (
        <div key={r.name} className="flex flex-col gap-2">
          <div className="h-24 border-2 border-accent bg-tint" style={{ borderRadius: Math.min(r.value, 48) }} />
          <p className="font-semibold">
            {r.name} · {r.value}px
          </p>
          <code className="text-[13px] text-muted">{r.code}</code>
          <p className="text-[13px] text-muted">{r.description}</p>
        </div>
      ))}
    </div>
  );
}

export function Layout() {
  return (
    <ul className="sb-unstyled text-ink font-sans flex flex-col gap-2">
      {layout.map((l) => (
        <li key={l.name}>
          <strong>{l.name}</strong>: {l.value}px — {l.description}
        </li>
      ))}
    </ul>
  );
}

export function MobileTypeScale() {
  return (
    <div className="sb-unstyled text-ink font-sans flex flex-col divide-y divide-line">
      {Object.entries(mobile.typography).map(([name, t]) => (
        <div key={name} className="flex flex-col gap-1 py-3">
          <span className="text-[13px] text-muted">
            <code>ToskiFont.{name}</code> — {t.size}pt · {t.weight}
            {t.tracking ? ` · tracking ${t.tracking}em` : ''}
            {t.uppercase ? ' · caixa alta' : ''}
          </span>
          <span
            style={{
              fontSize: t.size,
              fontWeight: t.weight,
              letterSpacing: t.tracking ? `${t.tracking}em` : undefined,
              textTransform: t.uppercase ? 'uppercase' : undefined,
            }}
          >
            A Paçoca cuida de você
          </span>
        </div>
      ))}
    </div>
  );
}

export function MobileExtras() {
  const row = (label: string, values: string[]) => (
    <div className="flex flex-wrap items-center gap-3 py-2">
      <span className="w-40 text-sm font-semibold">{label}</span>
      {values.map((v, i) => (
        <Swatch key={`${label}-${i}`} value={v} />
      ))}
    </div>
  );
  return (
    <div className="sb-unstyled text-ink font-sans flex flex-col divide-y divide-line">
      {row('petAvatars', mobile.pet.avatars)}
      {row('petCalendarDots (claro)', mobile.pet.calendarDots.light)}
      {row('petCalendarDots (escuro)', mobile.pet.calendarDots.dark)}
      {row('BlackFriday', Object.values(mobile.blackFriday))}
      <div className="py-2 text-sm">
        <strong>ToskiSpacing</strong>: {Object.entries(mobile.spacing).map(([k, v]) => `${k} ${v}`).join(' · ')}
      </div>
      <div className="py-2 text-sm">
        <strong>ToskiSize</strong>: {Object.entries(mobile.size).map(([k, v]) => `${k} ${v}`).join(' · ')}
      </div>
    </div>
  );
}
