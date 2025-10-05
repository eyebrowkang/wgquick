export type Locale = 'en' | 'zh';

interface MessageBlueprint {
  localeName: string;
  hero: {
    headline: string;
    subheadline: string;
    securityPill: string;
    conveniencePill: string;
    auditNote: string;
  };
  actions: {
    generatePair: string;
    generatePreSharedKey: string;
    derivePublicKey: string;
    copy: string;
    copied: string;
    reset: string;
    loading: string;
  };
  labels: {
    privateKey: string;
    publicKey: string;
    preSharedKey: string;
    derivedPublicKey: string;
    manualPrivateKey: string;
  };
  notices: {
    offline: string;
    verification: string;
  };
  features: {
    security: {
      title: string;
      description: string;
    };
    convenience: {
      title: string;
      description: string;
    };
  };
  errors: {
    privateKeyRequired: string;
  };
  footer: {
    openSource: string;
    viewSource: string;
  };
}

export const LOCALE_STORAGE_KEY = 'wgquick-locale';

export const messages: Record<Locale, MessageBlueprint> = {
  en: {
    localeName: 'English',
    hero: {
      headline: 'WireGuard keys, generated locally.',
      subheadline: 'wgquick.com keeps your key material on-device with hardened Go → WASM cryptography. No telemetry, no servers, no surprises.',
      securityPill: 'Security: 100% local, auditable Go + WebAssembly',
      conveniencePill: 'Convenience: zero installs, instant key pairs',
      auditNote: 'Open source & reproducible builds — inspect everything before you trust it.',
    },
    actions: {
      generatePair: 'Generate key pair',
      generatePreSharedKey: 'Generate pre-shared key',
      derivePublicKey: 'Derive public key',
      copy: 'Copy',
      copied: 'Copied!',
      reset: 'Reset',
      loading: 'Working…',
    },
    labels: {
      privateKey: 'Private key',
      publicKey: 'Public key',
      preSharedKey: 'Pre-shared key',
      derivedPublicKey: 'Derived public key',
      manualPrivateKey: 'Bring your own private key',
    },
    notices: {
      offline: 'All features run inside your browser. We never make network requests.',
      verification: 'Prefer to verify? Fetch the source, rebuild the WASM, and compare hashes.',
    },
    features: {
      security: {
        title: 'Local-first security',
        description: 'Keys and secrets are created with audited WireGuard libraries in Go, executed via WebAssembly. Nothing leaves your browser, ever.',
      },
      convenience: {
        title: 'Command line not required',
        description: 'Generate key pairs, derive public keys, and prep pre-shared keys in seconds without installing wg-quick or touching a terminal.',
      },
    },
    errors: {
      privateKeyRequired: 'Private key is required before deriving a public key.',
    },
    footer: {
      openSource: 'Built for wgquick.com — MIT licensed & community friendly.',
      viewSource: 'View source',
    },
  },
  zh: {
    localeName: '简体中文',
    hero: {
      headline: 'WireGuard 密钥，本地即刻生成',
      subheadline: 'wgquick.com 采用强化的 Go → WASM 加密模块，所有密钥仅在本地生成与处理，无遥测、无服务器。',
      securityPill: '安全：100% 本地，可审计的 Go + WebAssembly',
      conveniencePill: '高效：无需安装，瞬间生成密钥',
      auditNote: '完全开源，可复现构建 — 相信之前先自我验证。',
    },
    actions: {
      generatePair: '生成密钥对',
      generatePreSharedKey: '生成预共享密钥',
      derivePublicKey: '推导公钥',
      copy: '复制',
      copied: '已复制！',
      reset: '清空',
      loading: '处理中…',
    },
    labels: {
      privateKey: '私钥',
      publicKey: '公钥',
      preSharedKey: '预共享密钥',
      derivedPublicKey: '推导出的公钥',
      manualPrivateKey: '使用自有私钥',
    },
    notices: {
      offline: '所有功能均在浏览器内完成，我们不会发起任何网络请求。',
      verification: '需要验证？下载源码，自行编译 WASM 并对比哈希。',
    },
    features: {
      security: {
        title: '本地优先的安全性',
        description: '基于 WireGuard 官方 Go 库，通过 WebAssembly 在浏览器中执行，密钥不会离开你的设备。',
      },
      convenience: {
        title: '摆脱命令行',
        description: '几秒生成密钥对、推导公钥、准备预共享密钥，无需安装 wg-quick 或打开终端。',
      },
    },
    errors: {
      privateKeyRequired: '推导公钥前请先输入有效的私钥。',
    },
    footer: {
      openSource: '为 wgquick.com 打造 — MIT 许可，欢迎社区共建。',
      viewSource: '查看源码',
    },
  },
};

export type MessageBundle = (typeof messages)['en'];
