import { AppIcon } from '../src/components/AppIcon';
import { Mascot } from '../src/components/Mascot';
import { ProductIcon, ProductMascot, type ProductId } from '../src/components/ProductArt';
import { brand, themeContrastReport, themeIds, themeOverrides, themes, type Mode } from '../src/tokens';
import { ThemeFrame, useProduct } from './ThemeFrame';

function Chip({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="size-8 shrink-0 rounded-[8px] border border-line" style={{ background: value }} aria-hidden="true" />
      <div className="leading-tight">
        <p className="text-[13px] font-semibold">{label}</p>
        <code className="text-[12px] text-muted">{value}</code>
      </div>
    </div>
  );
}

function Panel({ mode, product }: { mode: Mode; product?: string }) {
  const theme = product ? themes[product] : undefined;
  const overrides = theme ? themeOverrides('web', theme.id) : [];
  const appOnly = theme ? themeOverrides('mobile', theme.id).filter((c) => c.scope === 'mobile') : [];
  return (
    <ThemeFrame mode={mode}>
      <div className="flex flex-col gap-6">
        <section>
          <h3 className="mb-3 text-[15px] font-semibold">Cores</h3>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-3">
            {theme
              ? [...overrides, ...appOnly].map((c) => <Chip key={c.name} value={c[mode]} label={c.name} />)
              : brand.map((b) => <Chip key={b.name} value={b.value} label={b.name} />)}
            {theme?.brand.map((b) => <Chip key={b.name} value={b.value} label={`marca · ${b.name}`} />)}
          </div>
        </section>

        {theme?.members && (
          <section>
            <h3 className="mb-3 text-[15px] font-semibold">Membros da casa (proposta das variantes de check e calendário)</h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-3">
              {Object.entries(theme.members).map(([id, m]) => (
                <div key={id} className="flex items-center gap-3">
                  <span
                    className="grid size-9 place-items-center rounded-full text-[14px] font-semibold"
                    style={{ background: m.avatar, color: '#231B17' }}
                    aria-hidden="true"
                  >
                    {m.name[0]}
                  </span>
                  <span className="size-4 rounded-full" style={{ background: m.mark[mode] }} aria-hidden="true" />
                  <div className="leading-tight">
                    <p className="text-[13px] font-semibold">{m.name}</p>
                    <code className="text-[12px] text-muted">
                      {m.avatar} · {m.mark[mode]}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h3 className="mb-3 text-[15px] font-semibold">Ícone</h3>
          {!product && <AppIcon size={72} label="Ícone da Toski Labs" />}
          {product === 'pethealth' && (
            <div className="flex flex-wrap items-end gap-4">
              {(['light', 'dark', 'tinted'] as const).map((v) => (
                <figure key={v} className="flex flex-col items-center gap-1">
                  <ProductIcon product="pethealth" variant={v} size={72} label={`PetHealthTracker, ícone ${v}`} />
                  <figcaption className="text-[12px] text-muted">{v}</figcaption>
                </figure>
              ))}
            </div>
          )}
          {theme && theme.assets.length === 0 && (
            <div className="rounded-card border border-dashed border-line p-4 text-sm text-muted">
              <p className="font-semibold text-ink">Pendente</p>
              <p>Os arquivos do ícone ainda não foram entregues ao DS:</p>
              <ul className="mt-1 list-disc pl-5">
                {theme.pending.map((f) => (
                  <li key={f}>
                    <code>{f}</code>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section>
          <h3 className="mb-3 text-[15px] font-semibold">Mascotes</h3>
          {!product && (
            <div className="w-40">
              <Mascot ball="still" label="Paçoca, a mascote da Toski Labs" />
            </div>
          )}
          {product === 'pethealth' && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(['pair', 'pair-base', 'pair-error', 'ball-indigo'] as const).map((a) => (
                <figure key={a} className={a === 'ball-indigo' ? 'w-16' : ''}>
                  <ProductMascot product="pethealth" art={a} mode={mode} label={`PetHealthTracker, ${a}`} />
                  <figcaption className="mt-1 text-[12px] text-muted">{a}</figcaption>
                </figure>
              ))}
            </div>
          )}
          {product === 'koti' && <p className="text-sm text-muted">O Koti não tem mascotes definidos.</p>}
        </section>

        {theme && (
          <section>
            <h3 className="mb-2 text-[15px] font-semibold">Contraste</h3>
            <p className="text-sm text-muted">
              {themeContrastReport(theme.id).filter((r) => r.mode === mode && r.pass).length} de{' '}
              {themeContrastReport(theme.id).filter((r) => r.mode === mode).length} pares passam (texto 4,5:1 · grande/ícone 3:1).
            </p>
          </section>
        )}
      </div>
    </ThemeFrame>
  );
}

/** Mostra o produto escolhido na barra (Toski Labs, PetHealthTracker ou Koti), em claro e escuro. */
export function ProductThemes() {
  const product = useProduct();
  const name = product && themeIds.includes(product) ? themes[product as ProductId].name : 'Toski Labs';
  return (
    <div className="sb-unstyled font-sans text-ink">
      <p className="mb-4 text-sm text-muted">
        Produto escolhido na barra: <strong className="text-ink">{name}</strong>. Troque em “Produto” para ver os outros.
      </p>
      <div className="flex flex-col gap-4 lg:flex-row">
        <Panel mode="light" product={product} />
        <Panel mode="dark" product={product} />
      </div>
    </div>
  );
}
