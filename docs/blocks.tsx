import { useState } from 'react';
import { brand, colorValue, component, motion, webMotion, webRadii, contrastReport, themeContrastReport, themedColors, font, layout, mobile, mobileRadii, radii, paletteById, paletteColorSet, paletteContrastReport, paletteIds, paletteShadows, type ModeShadowStyle, type Platform } from '../src/tokens';
import { ThemeFrame, usePalette, useProduct } from './ThemeFrame';

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
  const palette = usePalette();
  const list = themedColors(platform, useProduct(), platform === 'mobile' ? palette : undefined);
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
  const product = useProduct();
  const report = product ? themeContrastReport(product).filter((r) => r.platform === platform) : contrastReport(platform);
  return (
    <div className="sb-unstyled text-ink font-sans flex flex-col gap-4 lg:flex-row">
      {(['light', 'dark'] as const).map((mode) => (
        <ThemeFrame key={mode} mode={mode}>
          <ul className="flex flex-col gap-2">
            {report
              .filter((r) => r.mode === mode && !r.fg.startsWith('membro') && !r.bg.startsWith('membro') && r.fg !== 'onPetAvatar')
              .map((r) => (
                <li
                  key={`${r.fg}-${r.bg}-${r.level}`}
                  className="flex items-center justify-between gap-3 rounded-[10px] px-3 py-2"
                  style={{ background: colorValue(platform, r.bg, mode, product), color: colorValue(platform, r.fg, mode, product) }}
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
      ? [
          ...radii.map((r) => ({ ...r, code: `rounded-${r.name}` })),
          ...webRadii.map((r) => ({ ...r, code: `var(--toski-radius-${r.name})` })),
        ]
      : [
          ...radii.map((r) => ({ ...r, name: r.mobileName, code: `ToskiRadius.${r.mobileName}` })),
          ...mobileRadii.map((r) => ({
            ...r,
            code: r.side ? `ToskiRadius.${r.name}(side:) · ${r.value} em ${r.side}` : `ToskiRadius.${r.name}`,
          })),
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
            {t.lineHeight ? ` · altura de linha ${t.lineHeight}` : ''}
            {t.uppercase ? ' · caixa alta' : ''}
            {t.align === 'leading' ? ' · alinhado à esquerda' : ''}
          </span>
          <span
            style={{
              fontSize: t.size,
              fontWeight: t.weight,
              lineHeight: t.lineHeight,
              letterSpacing: t.tracking ? `${t.tracking}em` : undefined,
              textTransform: t.uppercase ? 'uppercase' : undefined,
              textAlign: t.align === 'leading' ? 'left' : undefined,
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
      {row('avatarUser', [mobile.pet.avatarUser])}
      {row('BlackFriday', Object.values(mobile.blackFriday))}
      <div className="py-2 text-sm">
        <strong>ToskiShadow</strong> ({mobile.shadowNote}):{' '}
        {Object.entries(mobile.shadow)
          .map(([k, v]) => `${k} y ${v.y} · blur ${v.blur} · ${v.color} ${Math.round(v.opacity * 100)}%`)
          .join(' | ')}
        . Exceção: <code>glass</code> e <code>glassNeve</code> mudam com o modo (veja Paletas, abaixo).
      </div>
      {Object.entries(mobile.rules).map(([k, rule]) => (
        <div key={k} className="py-2 text-sm">
          <strong>Regra {k}</strong>: {rule}
        </div>
      ))}
      <div className="py-2 text-sm">
        <strong>ToskiSpacing</strong>: {Object.entries(mobile.spacing).map(([k, v]) => `${k} ${v}`).join(' · ')}
      </div>
      <div className="py-2 text-sm">
        <strong>ToskiSize</strong>: {Object.entries(mobile.size).map(([k, v]) => `${k} ${v}`).join(' · ')}
      </div>
    </div>
  );
}

type Tree = { [k: string]: unknown };

function flatten(obj: Tree, prefix = ''): [string, string][] {
  const rows: [string, string][] = [];
  for (const [k, v] of Object.entries(obj)) {
    if (k === '$description' || k === 'description') continue;
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) rows.push(...flatten(v as Tree, key));
    else rows.push([key, Array.isArray(v) ? `[${v.join(', ')}]` : String(v)]);
  }
  return rows;
}

function TreeTable({ data, swift }: { data: Tree; swift: string }) {
  return (
    <div className="sb-unstyled text-ink font-sans overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr>
            <th className="py-2 pr-4">Token</th>
            <th className="py-2 pr-4">Valor</th>
            <th className="py-2">Swift</th>
          </tr>
        </thead>
        <tbody>
          {flatten(data).map(([k, v]) => {
            const parts = k.split('.');
            const last = parts.pop()!;
            const path = [swift, ...parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)), last].join('.');
            return (
              <tr key={k} className="border-t border-line">
                <td className="py-1.5 pr-4"><code>{k}</code></td>
                <td className="py-1.5 pr-4 tabular-nums">{v}</td>
                <td className="py-1.5 text-muted"><code>{path}</code></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function MotionTokens() {
  const groups = Object.entries(motion).filter(([k]) => !k.startsWith('$')) as [string, Tree][];
  return (
    <div className="sb-unstyled text-ink font-sans flex flex-col gap-6">
      {groups.map(([k, v]) => (
        <div key={k} className="flex flex-col gap-2">
          <p className="font-semibold">{k}</p>
          {typeof v.description === 'string' && <p className="text-sm text-muted">{v.description}</p>}
          <TreeTable data={{ [k]: v }} swift="ToskiMotionTokens" />
        </div>
      ))}
    </div>
  );
}

export function WebMotionTokens() {
  const rows: [string, string, string][] = [
    ...webMotion.map((m): [string, string, string] => [`--toski-motion-${m.name}`, `${Math.round(m.value * 1000)}ms`, m.description]),
    ['--toski-ease-out', `cubic-bezier(${motion.curve.easeOut.join(', ')})`, 'Entradas (abrir, aparecer)'],
    ['--toski-ease-in-out', `cubic-bezier(${motion.curve.easeInOut.join(', ')})`, 'Movimentos que vão e voltam'],
  ];
  return (
    <div className="sb-unstyled text-ink font-sans overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr>
            <th className="py-2 pr-4">Variável</th>
            <th className="py-2 pr-4">Valor</th>
            <th className="py-2">Uso</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, value, use]) => (
            <tr key={name} className="border-t border-line">
              <td className="py-1.5 pr-4"><code>{name}</code></td>
              <td className="py-1.5 pr-4 tabular-nums">{value}</td>
              <td className="py-1.5 text-muted">{use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MenuDemo() {
  const [open, setOpen] = useState(true);
  const [closing, setClosing] = useState(false);
  const toggle = () => {
    if (open) {
      setClosing(true);
      setTimeout(() => {
        setOpen(false);
        setClosing(false);
      }, 100);
    } else setOpen(true);
  };
  return (
    <div className="sb-unstyled flex min-h-40 flex-col items-end gap-2 font-sans text-ink">
      <button type="button" onClick={toggle} className="rounded-button bg-tint px-4 py-2 text-sm font-medium">
        {open ? 'Fechar menu' : 'Abrir menu'}
      </button>
      {open && (
        <ul className="toski-menu w-48 rounded-card border border-line bg-surface p-2 text-sm shadow-lg" data-closing={closing ? '' : undefined}>
          <li className="px-3 py-2">Perfil</li>
          <li className="px-3 py-2">Ajustes</li>
          <li className="px-3 py-2">Sair</li>
        </ul>
      )}
    </div>
  );
}

export function ComponentTokens() {
  return <TreeTable data={component as Tree} swift="ToskiComponent" />;
}

export function BallDemo() {
  return (
    <div className="sb-unstyled flex items-end gap-8 font-sans text-ink">
      {(['slow', 'fast'] as const).map((k) => (
        <div key={k} className="flex flex-col items-center gap-2">
          <svg width="60" height="80" viewBox="0 0 60 80" aria-hidden="true">
            <g
              style={{
                animation: `toski-bounce ${motion.ball[k].duration}s var(--toski-ease-in-out) infinite`,
                ['--toski-motion-ball-rise' as string]: `${motion.ball[k].rise * 2}px`,
              }}
            >
              <circle cx="30" cy="62" r="14" fill="var(--toski-caramelo)" />
            </g>
          </svg>
          <code className="text-xs text-muted">{k} · {motion.ball[k].duration}s · {motion.ball[k].rise}</code>
        </div>
      ))}
    </div>
  );
}

// ---------- Paletas do app (Nova XP) ----------

const hexToRgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(', ');

/** "#RRGGBB" + opacidade → rgba(), para montar o box-shadow do vidro. */
const rgbaOf = (hex: string, opacity: number) => `rgba(${hexToRgb(hex)}, ${opacity})`;

function glassBoxShadow(s: ModeShadowStyle): string {
  return `0 ${s.y}px ${s.blur}px ${rgbaOf(s.color, s.opacity)}, 0 0 0 ${s.ring.width}px ${rgbaOf(s.ring.color, s.ring.opacity)}`;
}

/** O vocabulário da Nova XP nas duas paletas, claro e escuro, com o produto escolhido na barra. */
export function PaletteVocabulary() {
  const product = useProduct();
  const sets = paletteIds.map((id) => ({ id, list: paletteColorSet(id, product) }));
  const names = sets[0].list.map((c) => c.name);
  const bg = (id: string, mode: 'light' | 'dark') => sets.find((s) => s.id === id)!.list.find((c) => c.name === 'background')![mode];
  return (
    <div className="sb-unstyled text-ink font-sans overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr>
            <th className="py-2 pr-4">Token</th>
            {paletteIds.flatMap((id) => [
              <th key={`${id}-l`} className="py-2 pr-4">{paletteById(id).name} claro</th>,
              <th key={`${id}-d`} className="py-2 pr-4">{paletteById(id).name} escuro</th>,
            ])}
          </tr>
        </thead>
        <tbody>
          {names.map((name) => (
            <tr key={name} className="border-t border-line">
              <td className="py-2 pr-4"><code>{name}</code></td>
              {sets.flatMap((s) =>
                (['light', 'dark'] as const).map((mode) => {
                  const value = s.list.find((c) => c.name === name)![mode];
                  return (
                    <td key={`${s.id}-${mode}`} className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        {/* translúcidas aparecem sobre o fundo da própria paleta */}
                        <span className="size-8 shrink-0 rounded-[8px] border border-line" style={{ background: bg(s.id, mode) }} aria-hidden="true">
                          <span className="block size-full rounded-[7px]" style={{ background: value }} />
                        </span>
                        <code className="text-[13px]">{value}</code>
                      </div>
                    </td>
                  );
                }),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Sombra do vidro (sombra + anel de 0,5 pt) em cada paleta e modo. */
export function GlassShadows() {
  const product = useProduct();
  return (
    <div className="sb-unstyled text-ink font-sans grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
      {paletteIds.flatMap((id) =>
        (['light', 'dark'] as const).map((mode) => {
          const set = paletteColorSet(id, product);
          const c = (name: string) => set.find((x) => x.name === name)![mode];
          const shadow = paletteShadows(id).glass[mode];
          return (
            <div key={`${id}-${mode}`} className="flex flex-col gap-2 rounded-card p-5" style={{ background: c('background'), color: c('textPrimary') }}>
              <span className="text-[13px] font-semibold uppercase tracking-[0.06em]" style={{ color: c('textSecondary') }}>
                {paletteById(id).name} · {mode === 'light' ? 'claro' : 'escuro'}
              </span>
              <div
                className="flex h-14 items-center justify-center text-sm font-semibold"
                style={{
                  borderRadius: mobileRadii.find((r) => r.name === 'surface')!.value,
                  background: c('glass'),
                  border: `1px solid ${c('glassBorder')}`,
                  boxShadow: glassBoxShadow(shadow),
                  backdropFilter: 'blur(20px)',
                }}
              >
                Vidro
              </div>
              <code className="text-[13px]" style={{ color: c('textSecondary') }}>
                y {shadow.y} · blur {shadow.blur} · {shadow.color} {Math.round(shadow.opacity * 100)}% · anel {shadow.ring.width}pt {shadow.ring.color} {Math.round(shadow.ring.opacity * 100)}%
              </code>
            </div>
          );
        }),
      )}
    </div>
  );
}

/** Pares de contraste da Nova XP na paleta escolhida na barra, com o produto escolhido. */
export function PaletteContrast() {
  const palette = usePalette() ?? 'bege';
  const product = useProduct();
  const report = paletteContrastReport(palette, product);
  return (
    <div className="sb-unstyled text-ink font-sans flex flex-col gap-4 lg:flex-row">
      {(['light', 'dark'] as const).map((mode) => (
        <ThemeFrame key={mode} mode={mode} title={`${paletteById(palette).name} · ${mode === 'light' ? 'claro' : 'escuro'}`}>
          <ul className="flex flex-col gap-2 text-sm">
            {report
              .filter((r) => r.mode === mode)
              .map((r) => (
                <li key={`${r.fg}-${r.bg}-${r.level}`} className="flex items-center justify-between gap-3 border-b border-line pb-2" title={r.known}>
                  <span>
                    {r.fg} / {r.bg}
                  </span>
                  <span className="font-semibold tabular-nums">
                    {r.ratio.toFixed(2)}:1 {r.pass ? '✓' : r.known ? '⚠' : '✗'}
                  </span>
                </li>
              ))}
          </ul>
        </ThemeFrame>
      ))}
    </div>
  );
}
