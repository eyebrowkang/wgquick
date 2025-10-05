export type Locale = 'en' | 'zh';

interface MessageBlueprint {
  localeName: string;
  hero: {
    headline: string;
    subheadline: string;
    securityPill: string;
    conveniencePill: string;
    auditNote: string;
    ctaPrimary: string;
    ctaSecondary: string;
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
  placeholders: {
    manualPrivateKey: string;
  };
  generator: {
    title: string;
    lead: string;
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
  sections: {
    featuresTitle: string;
  };
}

export const LOCALE_STORAGE_KEY = 'wgquick-locale';

export const messages: Record<Locale, MessageBlueprint> = {
  en: {
    localeName: 'English',
    hero: {
      headline: 'Secure WireGuard keys, ready in seconds.',
      subheadline:
        'wgquick.com runs Go-powered WebAssembly directly in your browser to create private, public, and pre-shared keys — auditable code, self-host friendly, and always offline.',
      securityPill: 'Security · 100% local WebAssembly',
      conveniencePill: 'Convenience · zero CLI required',
      auditNote: 'Open source forever — fork, self-host, or inspect every line before you trust it.',
      ctaPrimary: 'Launch key generator',
      ctaSecondary: 'View the GitHub repo',
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
    placeholders: {
      manualPrivateKey: 'Base64 private key',
    },
    generator: {
      title: 'Generate WireGuard keys without leaving your browser',
      lead: 'Create fresh key pairs, prep pre-shared keys, or derive public keys from existing secrets — everything stays on-device.',
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
      openSource: 'wgquick.com is MIT licensed, community maintained, and easy to deploy yourself.',
      viewSource: 'Browse the GitHub repository',
    },
    sections: {
      featuresTitle: 'Secure and convenient by design',
    },
  },
  zh: {
    localeName: '简体中文',
    hero: {
      headline: 'WireGuard 密钥，本地安全秒生成',
      subheadline:
        'wgquick.com 使用 Go 编译的 WebAssembly，在浏览器内立即生成私钥、公钥、预共享密钥；源码完全开源，也支持自行部署，全程离线。',
      securityPill: '安全 · 100% 本地 WASM 执行',
      conveniencePill: '便捷 · 无需命令行',
      auditNote: 'MIT 许可开源项目 — 可自由审计、复现与自建。',
      ctaPrimary: '启动密钥生成器',
      ctaSecondary: '查看 GitHub 仓库',
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
    placeholders: {
      manualPrivateKey: 'Base64 私钥',
    },
    generator: {
      title: '无需离开浏览器，即刻生成 WireGuard 密钥',
      lead: '快速生成成对密钥、预共享密钥，或从现有私钥推导公钥；所有操作仅在本地完成。',
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
      openSource: 'wgquick.com 采用 MIT 许可，社区共建，也可按需自行部署。',
      viewSource: '访问 GitHub 仓库',
    },
    sections: {
      featuresTitle: '安全与便捷齐备的设计',
    },
  },
};

export type MessageBundle = (typeof messages)['en'];
