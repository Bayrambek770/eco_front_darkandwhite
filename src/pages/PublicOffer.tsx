import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PublicOfferContent from '@/components/PublicOfferContent';
import { PublicOfferService } from '@/api/publicOffer';
import { useTranslation } from 'react-i18next';

const PublicOffer = () => {
  const [content, setContent] = useState<string | null>(null);
  const [errored, setErrored] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await PublicOfferService.get();
        if (mounted && res?.content) setContent(res.content);
      } catch (e) {
        setErrored(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-center animate-fade-in">
            <span className="text-gradient">{t('publicOfferPage.title')}</span>
          </h1>

          <Card className="animate-fade-in-up">
            <CardContent className="pt-6 prose prose-slate dark:prose-invert max-w-none">
              <h2>{t('publicOfferPage.terms')}</h2>
              {content ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                <div>
                  <PublicOfferContent />
                  <p className="text-sm text-muted-foreground mt-8">
                    {t('publicOfferPage.lastUpdated')}: {new Date().toLocaleDateString()}
                  </p>
                  {errored && (
                    <p className="text-sm text-muted-foreground">{t('publicOfferPage.fallbackNote')}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PublicOffer;
