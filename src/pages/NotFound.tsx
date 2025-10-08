import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center animate-fade-in">
        <h1 className="mb-4 text-9xl font-bold text-gradient">404</h1>
        <h2 className="mb-4 text-3xl font-bold">{t('notFound.title')}</h2>
        <p className="mb-8 text-xl text-muted-foreground">{t('notFound.desc')}</p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              {t('notFound.backHome')}
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/products">
              <Search className="mr-2 h-5 w-5" />
              {t('notFound.browse')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
