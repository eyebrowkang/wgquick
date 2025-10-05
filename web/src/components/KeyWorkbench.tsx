import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocale } from '../i18n/useLocale.ts';
import type { KeyPair, WasmBindings } from '../lib/wasm.ts';
import { initWasm } from '../lib/wasm.ts';
import { CopyButton } from './CopyButton.tsx';

interface PendingState {
  action: 'pair' | 'psk' | 'derive' | 'init' | null;
  message: string | null;
}

export function KeyWorkbench() {
  const { bundle } = useLocale();
  const [bindings, setBindings] = useState<WasmBindings | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<PendingState>({ action: 'init', message: null });
  const [pair, setPair] = useState<KeyPair | null>(null);
  const [psk, setPsk] = useState<string>('');
  const [manualPrivateKey, setManualPrivateKey] = useState<string>('');
  const [derivedPublicKey, setDerivedPublicKey] = useState<string>('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const loaded = await initWasm();
        if (!mounted) {
          return;
        }
        setBindings(loaded);
        setPending({ action: null, message: null });
      } catch (err) {
        if (!mounted) {
          return;
        }
        setError((err as Error).message);
        setPending({ action: null, message: null });
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const busy = useMemo(() => pending.action !== null, [pending.action]);

  const ensureBindings = useCallback(async () => {
    if (bindings) {
      return bindings;
    }
    const loaded = await initWasm();
    setBindings(loaded);
    return loaded;
  }, [bindings]);

  const runAction = useCallback(
    async (action: PendingState['action'], handler: (resolvedBindings: WasmBindings) => Promise<void>) => {
      try {
        setPending({ action, message: null });
        setError(null);
        const resolved = await ensureBindings();
        await handler(resolved);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setPending({ action: null, message: null });
      }
    },
    [ensureBindings],
  );

  const handleGeneratePair = useCallback(() => {
    void runAction('pair', async (resolved) => {
      const generated = await resolved.generateKeyPair();
      setPair(generated);
    });
  }, [runAction]);

  const handleGeneratePreSharedKey = useCallback(() => {
    void runAction('psk', async (resolved) => {
      const generated = await resolved.generatePreSharedKey();
      setPsk(generated);
    });
  }, [runAction]);

  const handleDerivePublicKey = useCallback(() => {
    if (!manualPrivateKey.trim()) {
      setError(bundle.errors.privateKeyRequired);
      return;
    }
    void runAction('derive', async (resolved) => {
      const key = await resolved.publicKeyFromPrivate(manualPrivateKey.trim());
      setDerivedPublicKey(key);
    });
  }, [bundle.errors.privateKeyRequired, manualPrivateKey, runAction]);

  const handleReset = useCallback(() => {
    setPair(null);
    setPsk('');
    setManualPrivateKey('');
    setDerivedPublicKey('');
    setError(null);
  }, []);

  const pendingLabel = useMemo(() => {
    if (!pending.action) {
      return null;
    }
    return bundle.actions.loading;
  }, [pending.action, bundle.actions.loading]);

  return (
    <section className="workbench-panels">
      <div className="panel">
        <header className="panel-header">
          <h2 className="panel-title">{bundle.actions.generatePair}</h2>
          <button type="button" onClick={handleReset} className="reset-link">
            {bundle.actions.reset}
          </button>
        </header>
        <div className="panel-body">
          <button type="button" onClick={handleGeneratePair} className="button button-primary" disabled={busy}>
            {bundle.actions.generatePair}
          </button>
          <label className="label">
            <span>{bundle.labels.privateKey}</span>
            <textarea rows={3} value={pair?.privateKey ?? ''} readOnly className="textarea" />
            <CopyButton
              value={pair?.privateKey ?? ''}
              label={bundle.actions.copy}
              copiedLabel={bundle.actions.copied}
              disabled={!pair?.privateKey}
            />
          </label>
          <label className="label">
            <span>{bundle.labels.publicKey}</span>
            <textarea rows={3} value={pair?.publicKey ?? ''} readOnly className="textarea" />
            <CopyButton
              value={pair?.publicKey ?? ''}
              label={bundle.actions.copy}
              copiedLabel={bundle.actions.copied}
              disabled={!pair?.publicKey}
            />
          </label>
          <button
            type="button"
            onClick={handleGeneratePreSharedKey}
            className="button button-outline"
            disabled={busy}
          >
            {bundle.actions.generatePreSharedKey}
          </button>
          <label className="label">
            <span>{bundle.labels.preSharedKey}</span>
            <textarea rows={3} value={psk} readOnly className="textarea" />
            <CopyButton value={psk} label={bundle.actions.copy} copiedLabel={bundle.actions.copied} disabled={!psk} />
          </label>
        </div>
      </div>

      <div className="panel alt">
        <header>
          <h2 className="panel-title">{bundle.labels.manualPrivateKey}</h2>
        </header>
        <div className="panel-body">
          <label className="label">
            <span>{bundle.labels.privateKey}</span>
            <textarea
              rows={5}
              value={manualPrivateKey}
              onChange={(event) => setManualPrivateKey(event.target.value)}
              className="textarea"
              placeholder="base64 private key"
            />
          </label>
          <button type="button" onClick={handleDerivePublicKey} className="button button-subtle" disabled={busy}>
            {bundle.actions.derivePublicKey}
          </button>
          <label className="label">
            <span>{bundle.labels.derivedPublicKey}</span>
            <textarea rows={3} value={derivedPublicKey} readOnly className="textarea" />
            <CopyButton
              value={derivedPublicKey}
              label={bundle.actions.copy}
              copiedLabel={bundle.actions.copied}
              disabled={!derivedPublicKey}
            />
          </label>
          <p className="notice">{bundle.notices.offline}</p>
          <p className="notice">{bundle.notices.verification}</p>
        </div>
      </div>
      {error ? (
        <div className="error-banner" role="alert">
          {error}
        </div>
      ) : null}
      {pendingLabel ? <div className="status">{pendingLabel}</div> : null}
    </section>
  );
}
