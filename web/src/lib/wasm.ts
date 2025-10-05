export interface KeyPair {
  privateKey: string;
  publicKey: string;
}

export interface WasmBindings {
  generateKeyPair: () => Promise<KeyPair>;
  generatePreSharedKey: () => Promise<string>;
  publicKeyFromPrivate: (privateKey: string) => Promise<string>;
}

declare global {
  interface Window {
    Go: new () => {
      importObject: WebAssembly.Imports;
      run: (instance: WebAssembly.Instance) => Promise<void>;
      resume: () => void;
      exit: (code: number) => void;
    };
    wgquickGenerateKeyPair?: () => { ok: boolean; message?: string; privateKey?: string; publicKey?: string };
    wgquickGeneratePreSharedKey?: () => { ok: boolean; message?: string; psk?: string };
    wgquickPublicKeyFromPrivate?: (privateKey: string) => { ok: boolean; message?: string; publicKey?: string };
  }
}

let bindingsPromise: Promise<WasmBindings> | undefined;

export function initWasm(): Promise<WasmBindings> {
  if (bindingsPromise) {
    return bindingsPromise;
  }

  bindingsPromise = (async () => {
    if (typeof window.Go !== 'function') {
      throw new Error('Go WASM runtime is not loaded. Ensure wasm_exec.js is served.');
    }

    const go = new window.Go();
    const response = await fetch('/main.wasm', {
      cache: 'no-store',
      mode: 'same-origin',
      credentials: 'omit',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch main.wasm');
    }

    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, go.importObject);
    go.run(instance);

    await new Promise<void>((resolve) => queueMicrotask(() => resolve()));

    return {
      async generateKeyPair() {
        const result = window.wgquickGenerateKeyPair?.();
        if (!result || !result.ok || !result.privateKey || !result.publicKey) {
          throw new Error(result?.message ?? 'Unknown error generating key pair');
        }

        return { privateKey: result.privateKey, publicKey: result.publicKey };
      },
      async generatePreSharedKey() {
        const result = window.wgquickGeneratePreSharedKey?.();
        if (!result || !result.ok || !result.psk) {
          throw new Error(result?.message ?? 'Unknown error generating pre-shared key');
        }

        return result.psk;
      },
      async publicKeyFromPrivate(privateKey: string) {
        const result = window.wgquickPublicKeyFromPrivate?.(privateKey);
        if (!result || !result.ok || !result.publicKey) {
          throw new Error(result?.message ?? 'Unable to derive public key');
        }

        return result.publicKey;
      },
    } satisfies WasmBindings;
  })();

  return bindingsPromise;
}
