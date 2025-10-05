import { LanguageToggle } from './components/LanguageToggle.tsx';
import { KeyWorkbench } from './components/KeyWorkbench.tsx';
import { useLocale } from './i18n/useLocale.ts';

const REPO_URL = 'https://github.com/eyebrowkang/wgquick';

function App() {
  const { bundle } = useLocale();

  const handleLaunch = () => {
    const area = document.getElementById('generator');
    area?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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

        <main>
          <section className="hero" id="hero">
            <div className="hero-content">
              <div className="pill-row">
                <span className="pill">{bundle.hero.securityPill}</span>
                <span className="pill">{bundle.hero.conveniencePill}</span>
              </div>
              <h1 className="hero-title">{bundle.hero.headline}</h1>
              <p className="hero-subtitle">{bundle.hero.subheadline}</p>
              <ul className="hero-highlights">
                <li>
                  <h3>{bundle.features.security.title}</h3>
                  <p>{bundle.features.security.description}</p>
                </li>
                <li>
                  <h3>{bundle.features.convenience.title}</h3>
                  <p>{bundle.features.convenience.description}</p>
                </li>
              </ul>
              <p className="hero-note">{bundle.hero.auditNote}</p>
              <div className="cta-row">
                <button type="button" className="button button-primary hero-cta" onClick={handleLaunch}>
                  {bundle.hero.ctaPrimary}
                </button>
                <a className="button button-outline hero-secondary" href={REPO_URL} target="_blank" rel="noreferrer">
                  {bundle.hero.ctaSecondary}
                </a>
              </div>
              <div className="hero-arrow" aria-hidden="true">
                <svg width="14" height="64" viewBox="0 0 14 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0v54M7 54l6-6M7 54l-6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </section>

          <section className="generator-section" id="generator">
            <div className="section-heading">
              <h2>{bundle.generator.title}</h2>
              <p>{bundle.generator.lead}</p>
            </div>
            <KeyWorkbench />
          </section>

          <section className="features" aria-labelledby="features-title">
            <div className="section-heading">
              <h2 id="features-title">{bundle.sections.featuresTitle}</h2>
            </div>
            <div className="feature-grid">
              <article className="feature-card">
                <h3>{bundle.features.security.title}</h3>
                <p>{bundle.features.security.description}</p>
              </article>
              <article className="feature-card">
                <h3>{bundle.features.convenience.title}</h3>
                <p>{bundle.features.convenience.description}</p>
              </article>
            </div>
          </section>
        </main>

        <footer className="footer">
          <span>{bundle.footer.openSource}</span>
          <a href={REPO_URL} target="_blank" rel="noreferrer">
            {bundle.footer.viewSource}
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
