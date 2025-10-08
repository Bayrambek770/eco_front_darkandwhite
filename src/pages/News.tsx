import { useMemo, useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNews } from '@/hooks/useNews';
import { useTranslation } from 'react-i18next';

const News = () => {
  const [page] = useState(1);
  const { t } = useTranslation();
  const { data, isLoading } = useNews(page);
  const newsArticles = useMemo(() => {
    const apiResults = data?.results?.map((n) => ({
      id: n.id,
      title: n.title,
      date: n.created_at,
      category: 'News',
      image: n.image || '',
      preview: n.content?.slice(0, 160) + (n.content && n.content.length > 160 ? '…' : ''),
    })) ?? [];
    return apiResults;
  }, [data]);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4">{t('news.title')}</h1>
          <p className="text-xl text-muted-foreground">{t('news.subtitle')}</p>
        </div>

        {/* News Grid */}
        {isLoading ? (
          <p className="text-muted-foreground">{t('news.loading')}</p>
        ) : newsArticles.length === 0 ? (
          <p className="text-muted-foreground">{t('news.notFound')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => (
            <Card key={article.id} className="overflow-hidden group smooth-transition hover:shadow-lg animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="aspect-video overflow-hidden bg-secondary">
                  {article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover smooth-transition group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      {t('news.title')}
                    </div>
                  )}
              </div>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                  <span className="text-primary font-semibold">{article.category}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 line-clamp-2">{article.title}</h3>
                <p className="text-muted-foreground line-clamp-3">{article.preview}</p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="w-full group/btn" disabled={isLoading}>
                  <a href={`/news/${article.id}`}>
                    {isLoading ? t('news.loading') : t('news.readMore')}
                    <ArrowRight className="ml-2 h-4 w-4 smooth-transition group-hover/btn:translate-x-1" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
