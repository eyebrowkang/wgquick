import { LanguageToggle } from './components/LanguageToggle.tsx';
import { KeyWorkbench } from './components/KeyWorkbench.tsx';
import { useLocale } from './i18n/useLocale.ts';

function App() {
  const { bundle } = useLocale();

  return (
    <div className="app-shell">
      <div className="app-container">
        <header className="header">
          <a href="/" className="branding" aria-label="wgquick.com">
            <span className="muted">wg</span>
            <span className="accent">quick</span>
            <span className="muted">.com</span>
          </a>
          <LanguageToggle />
        </header>

        <main className="workbench" id="workbench">
          <section className="hero">
            <div className="pill-row">
              <span className="pill">{bundle.hero.securityPill}</span>
              <span className="pill">{bundle.hero.conveniencePill}</span>
            </div>
            <h1 className="hero-title">{bundle.hero.headline}</h1>
            <p className="hero-subtitle">{bundle.hero.subheadline}</p>
            <p className="hero-note">{bundle.hero.auditNote}</p>
          </section>
          <KeyWorkbench />
        </main>

        <section className="features">
          <article className="feature-card">
            <h3>{bundle.features.security.title}</h3>
            <p>{bundle.features.security.description}</p>
          </article>
          <article className="feature-card">
            <h3>{bundle.features.convenience.title}</h3>
            <p>{bundle.features.convenience.description}</p>
          </article>
        </section>

        <footer className="footer">
          <span>{bundle.footer.openSource}</span>
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            {bundle.footer.viewSource}
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
