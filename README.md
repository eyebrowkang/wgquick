# wgquick.com

A bilingual (English/简体中文) landing and utility site for wgquick.com that generates WireGuard key pairs, pre-shared keys, and derived public keys entirely inside the browser. Cryptographic operations run through a Go module compiled to WebAssembly; no network requests are made after the page loads.

## Tech stack
- Go 1.24 → WebAssembly (`cmd/wasm`)
- React 19 + TypeScript (strict) + Vite (`web/`)
- Custom handcrafted CSS (`web/public/styles.css`) designed to comply with an inline-free CSP

## Features
- Generate private/public key pairs and pre-shared keys locally via Go’s `wgtypes`
- Derive a public key from a user-supplied private key
- Zero server interaction, reinforced by an explicit Content Security Policy (`default-src 'self'` with WebAssembly support)
- Marketing copy emphasises *security* and *convenience* in English and Chinese, auto-detected on first visit and stored in `localStorage`
- Optional Google Analytics integration controlled via `VITE_GA_MEASUREMENT_ID`

## Getting started
1. **Install dependencies**
   ```bash
   pnpm install --dir web
   ```
2. **Build the Go → WASM binary (reproducible output)**
   ```bash
   make wasm
   # or: GODEBUG=randautoseed=0 GOOS=js GOARCH=wasm go build -trimpath -buildvcs=false -ldflags="-buildid=" -o web/public/main.wasm ./cmd/wasm
   ```
3. **Run the development server**
   ```bash
   make dev
   # (equivalent to `pnpm --dir web dev`)
   ```
   > The strict CSP in `index.html` is production-oriented. If the dev tools you use inject scripts, consider running the dev server in an isolated profile.

## Production build
```bash
make build
# outputs to web/dist with main.wasm + wasm_exec.js alongside the bundle
```

The combination of `GODEBUG=randautoseed=0`, `-trimpath`, `-buildvcs=false`, and `-ldflags="-buildid="` removes non-deterministic metadata so identical sources produce identical `main.wasm` binaries.

### Analytics configuration
- Copy `web/.env.example` to `web/.env.local` (or set the variable in your deployment environment).
- Set `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX` to enable Google Analytics; leave it empty to disable analytics for private deployments.
- When using the provided GitHub Actions workflow, create the `VITE_GA_MEASUREMENT_ID` repository secret so Cloudflare Pages builds include analytics.
  - If you need reproducible artifacts outside the workflow, remember to set `GODEBUG=randautoseed=0` when running `go build`.

Deploy the contents of `web/dist` at https://wgquick.com/. The dist folder already includes `main.wasm` and `wasm_exec.js` under the same CSP rules.

## Project layout
```
├── cmd/wasm/           # Go entrypoint exposing JS bindings
├── web/
│   ├── public/         # static assets (wasm_exec.js, styles.css, main.wasm)
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── i18n/       # locale messages + context
│   │   └── lib/        # WASM loader
│   └── index.html      # Strict CSP + asset bootstrap
├── Makefile            # wasm/dev/build helpers
└── README.md
```

## Verifying the build
- Inspect or edit `cmd/wasm/main.go`, rebuild `main.wasm`, and diff the resulting SHA256 with the deployed artifact.
- Monitor the browser’s network tab: after the initial page load, no additional requests are issued.

## Next steps
- Add automated integrity checks (e.g., Service Worker verifying WASM hash)
- Publish the site to the wgquick.com domain via a static host (Netlify, Cloudflare Pages, etc.)
- Consider publishing reproducible build instructions or CI pipelines for transparency.

## License
- Code is released under the [MIT License](LICENSE) © 2025 eyebrowkang.
- Website icons and branding assets are proprietary to eyebrowkang; please contact the author before reuse.
