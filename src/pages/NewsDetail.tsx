import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NewsService, type NewsDTO } from '@/api/news';
import monitorImage from '@/assets/product-monitor.jpg';
import { useTranslation } from 'react-i18next';

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [data, setData] = useState<NewsDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!id) return;
        const res = await NewsService.get(id);
        if (mounted) setData(res);
      } catch (e) {
        // fallback to a simple local article based on id === '1'
        if (id === '1') {
          if (mounted)
            setData({ id: '1', title: 'AMD Announces Next-Gen Ryzen Processors', content: 'Discover the latest innovations in processor technology…', image: monitorImage, created_at: new Date().toISOString() });
        } else {
          setError('Failed to load news.');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const date = useMemo(() => (data?.created_at ? new Date(data.created_at).toLocaleDateString() : ''), [data]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
  <p className="text-muted-foreground">{t('news.loading')}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">{t('news.notFound')}</p>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" /> {t('news.goBack')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/news"><ArrowLeft className="h-4 w-4 mr-2" /> {t('news.backToNews')}</Link>
        </Button>

        <div className="grid lg:grid-cols-5 gap-8 items-start animate-fade-in">
          {/* Hero Image */}
          <div className="lg:col-span-3 overflow-hidden rounded-xl border bg-secondary/40 group">
            <div className="aspect-video overflow-hidden">
              <img src={data.image || monitorImage} alt={data.title} className="w-full h-full object-cover smooth-transition group-hover:scale-105" />
            </div>
          </div>

          {/* Meta Card */}
          <Card className="lg:col-span-2 animate-fade-in-up">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{date}</span>
              </div>
              <h1 className="text-3xl font-bold leading-tight">{data.title}</h1>
              <p className="text-muted-foreground">{(data.content || '').slice(0, 220)}{(data.content || '').length > 220 ? '…' : ''}</p>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto mt-10 animate-fade-in-up">
          <article className="prose prose-slate dark:prose-invert max-w-none">
            <p>{data.content}</p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
