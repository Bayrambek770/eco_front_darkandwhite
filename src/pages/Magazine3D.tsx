import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Magazine3D = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center bg-backish-gradient animate-gradient-x">
      {/* Decorative subtle vignette */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: 'radial-gradient(120% 80% at 50% 10%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%)'
      }} />

      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-gradient-animate drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
          {t('magazine.soon')}
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-base md:text-lg" style={{color:'rgba(255,255,255,0.75)'}}>
          We’re crafting something amazing. Please check back later.
        </p>

        <Link to="/" className="btn-3d-mag inline-grid">
          <span>{t('magazine.backHome')}</span>
        </Link>
      </div>

      {/* Ambient moving shapes (very subtle) */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-20 blur-3xl"
           style={{ background: 'radial-gradient(circle at 30% 30%, #4b6cb7 0%, transparent 60%)' }} />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full opacity-20 blur-3xl"
           style={{ background: 'radial-gradient(circle at 70% 70%, #182848 0%, transparent 60%)' }} />
    </div>
  );
};

export default Magazine3D;
