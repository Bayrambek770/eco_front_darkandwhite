import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useProductDetail, useProductReviews, useAddReview } from '@/hooks/useProductDetail';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { ProductsService } from '@/api/products';
import { tokenStore } from '@/api/tokenStore';
import { useCart } from '@/contexts/CartContext';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUzsToUsdRate } from '@/hooks/useExchangeRate';
import { formatUZS } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProductDetail(id!);
  const { t } = useTranslation();
  const { rate: uzsToUsd, loading: rateLoading } = useUzsToUsdRate();
  const [page] = useState(1);
  const { data: reviews, isLoading: loadingReviews } = useProductReviews(id!, page);
  const [allReviews, setAllReviews] = useState<Array<{ id: string | number; user?: string; rating?: number; content: string; created_at: string }>>([]);
  const [reviewsCount, setReviewsCount] = useState<number | undefined>(undefined);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [loadingAllReviews, setLoadingAllReviews] = useState(false);
  const addReview = useAddReview(id!);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [descExpanded, setDescExpanded] = useState(false);
  const { addToCart } = useCart();
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const [fitToScreen, setFitToScreen] = useState(true);
  const [lastTap, setLastTap] = useState<number | null>(null);

  const restoreOriginal = () => {
    setFitToScreen(true);
    // scroll container back to origin
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  const detailed = useMemo(() => {
    if (product) {
      const images = (product as any).images as string[] | undefined;
      return {
        ...product,
        images: images && images.length ? images : [product.image],
      } as any;
    }
    return null;
  }, [product]);

  const [similar, setSimilar] = useState<any[]>([]);
  // Reset when product changes
  useEffect(() => {
    setAllReviews([]);
    setReviewsCount(undefined);
    setShowAllReviews(false);
  }, [id]);

  // Seed reviews from first page
  useEffect(() => {
    if (reviews?.results) {
      setAllReviews((prev) => {
        const map = new Map<string | number, any>();
        prev.forEach((r) => map.set(r.id, r));
        reviews.results.forEach((r) => map.set(r.id, r));
        return Array.from(map.values());
      });
      setReviewsCount(reviews.count);
    }
  }, [reviews]);

  const sortedReviews = allReviews
    .slice()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const displayedReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 5);

  const handleToggleAllReviews = async () => {
    if (showAllReviews) {
      setShowAllReviews(false);
      return;
    }
    // Fetch and append remaining pages
    const count = reviewsCount ?? allReviews.length;
    const firstPageSize = reviews?.results?.length ?? 0;
    if (!firstPageSize || count <= allReviews.length) {
      setShowAllReviews(true);
      return;
    }
    setLoadingAllReviews(true);
    const totalPages = reviewsCount ? Math.ceil(count / firstPageSize) : Number.POSITIVE_INFINITY;
    for (let p = 2; p <= totalPages; p++) {
      try {
        const res = await ProductsService.listReviews(id!, p);
        setAllReviews((prev) => {
          const map = new Map<string | number, any>();
          prev.forEach((r) => map.set(r.id, r));
          res.results.forEach((r) => map.set(r.id, r));
          return Array.from(map.values());
        });
        // If we don't know total count, stop when the returned page is shorter than the first page size
        if (!reviewsCount && (!res.results || res.results.length < firstPageSize)) {
          break;
        }
      } catch {
        break;
      }
    }
    setShowAllReviews(true);
    setLoadingAllReviews(false);
  };
  useEffect(() => {
    (async () => {
      try {
        if (product) {
          const res = await ProductsService.list({ category: product.category });
          const items = (res.results || []).filter((p) => String(p.id) !== String(product.id)).slice(0, 4);
          setSimilar(items);
          return;
        }
        setSimilar([]);
      } catch (e) {
        setSimilar([]);
      }
    })();
  }, [product]);

  if (isLoading && !detailed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">{t('productDetail.loading')}</p>
      </div>
    );
  }
  if (!isLoading && !detailed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">{t('notFound.title')}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 animate-fade-in">
          <Card className="overflow-hidden">
            {/* Gallery */}
            {detailed && (
              <div className="p-4">
                <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
                  <DialogTrigger asChild>
                    <div className="aspect-square bg-secondary/50 overflow-hidden rounded-md cursor-zoom-in group">
                      <img
                        src={detailed.images[activeIdx]}
                        alt={detailed.name}
                        className="w-full h-full object-cover smooth-transition group-hover:scale-105"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[100vw] sm:max-w-5xl">
                    {/* Mobile-friendly close button */}
                    <DialogClose asChild>
                      <button
                        aria-label="Close"
                        className="absolute right-2 top-2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-md bg-background/70 backdrop-blur text-foreground hover:bg-background/90 focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </DialogClose>
                    <div ref={imageContainerRef} className="overflow-auto max-h-[85vh]">
                      <img
                        src={detailed.images[activeIdx]}
                        alt={detailed.name}
                        className={fitToScreen ? 'max-w-full h-auto' : 'w-auto max-w-none h-auto'}
                        onDoubleClick={restoreOriginal}
                        onClick={() => {
                          const now = Date.now();
                          if (lastTap && now - lastTap < 300) {
                            restoreOriginal();
                            setLastTap(null);
                          } else {
                            setLastTap(now);
                          }
                        }}
                      />
                    </div>
                  </DialogContent>
                </Dialog>

                {detailed.images.length > 1 && (
                  <div className="mt-4">
                    <Carousel opts={{ align: 'start' }}>
                      <CarouselContent>
                        {detailed.images.map((img: string, idx: number) => (
                          <CarouselItem key={idx} className="basis-1/4">
                            <button
                              className={`aspect-square w-full overflow-hidden rounded-md border ${activeIdx === idx ? 'ring-2 ring-primary' : ''}`}
                              onClick={() => setActiveIdx(idx)}
                            >
                              <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                            </button>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </div>
                )}
              </div>
            )}
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{detailed?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Overview / Description */}
              {(() => {
                const desc = (detailed?.description || '').trim();
                if (!desc) return null;
                const isHtml = /<[^>]+>/.test(desc);
                return (
                  <div className="mt-1">
                    <h3 className="font-semibold text-lg mb-2">{t('productDetail.overview')}</h3>
                    <div
                      className={
                        `relative rounded-md border bg-secondary/30 p-4 smooth-transition ` +
                        (descExpanded ? '' : 'max-h-48 overflow-hidden')
                      }
                    >
                      {isHtml ? (
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                          <div dangerouslySetInnerHTML={{ __html: desc }} />
                        </div>
                      ) : (
                        <div className="text-base lg:text-lg leading-7 whitespace-pre-wrap text-foreground/90">{desc}</div>
                      )}
                      {!descExpanded && desc.length > 220 && (
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
                      )}
                    </div>
                    {desc.length > 220 && (
                      <Button variant="ghost" size="sm" className="mt-2" onClick={() => setDescExpanded((v) => !v)}>
                        {descExpanded ? t('productDetail.showLess') : t('productDetail.readMore')}
                      </Button>
                    )}
                  </div>
                );
              })()}

              <div className="text-2xl font-bold mt-6 mb-2">{formatUZS(detailed?.price ?? 0)}</div>
              {(() => {
                // If price appears to be in UZS (very large number), show USD equivalent
                const rawPrice = detailed?.price ?? 0;
                const likelyUzs = rawPrice > 1000; // heuristic threshold
                if (likelyUzs && uzsToUsd) {
                  const usd = rawPrice * uzsToUsd;
                  return (
                    <div className="text-sm text-muted-foreground mb-2">
                      ≈ ${usd.toFixed(2)} USD
                    </div>
                  );
                }
                return null;
              })()}
              <Button onClick={() => detailed && addToCart(detailed)} disabled={!detailed}>
                {t('productDetail.addToCart')}
              </Button>
              {Array.isArray(detailed?.specs) && detailed!.specs.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">{t('productDetail.specifications')}</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                    {detailed!.specs.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-10">
          <Card>
            <CardHeader>
              <CardTitle>{t('productDetail.reviews')}</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingReviews && displayedReviews.length === 0 ? (
                <p className="text-muted-foreground">{t('productDetail.loadingReviews')}</p>
              ) : displayedReviews.length > 0 ? (
                <div className="space-y-4">
                  {displayedReviews.map((r) => (
                    <div key={String(r.id)} className="border-b border-border pb-4">
                      <div className="text-sm text-muted-foreground mb-1">{new Date(r.created_at).toLocaleDateString()}</div>
                      {r.rating != null && <div className="text-sm">{t('productDetail.ratingLabel')}: {r.rating}/5</div>}
                      <div className="whitespace-pre-line">{r.content}</div>
                    </div>
                  ))}
                  {(reviewsCount ?? displayedReviews.length) > 5 && (
                    <div className="flex items-center justify-center">
                      <Button variant="outline" onClick={handleToggleAllReviews} disabled={loadingAllReviews}>
                        {loadingAllReviews ? t('productDetail.loadingDots') : showAllReviews ? t('productDetail.showLessReviews') : t('productDetail.seeAll')}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">{t('productDetail.noReviews')}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('productDetail.writeReview')}</CardTitle>
            </CardHeader>
            <CardContent>
              {tokenStore.getAccessToken() ? (
                <div className="space-y-3">
                  <Input type="number" placeholder={t('productDetail.ratingPlaceholder')} min={1} max={5} value={rating ?? ''} onChange={(e) => setRating(e.target.value ? Number(e.target.value) : undefined)} />
                  <Textarea placeholder={t('productDetail.yourReview')} rows={5} value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
                  <Button
                    onClick={() => addReview.mutate({ rating, content: reviewText })}
                    disabled={addReview.isPending || !reviewText.trim()}
                  >
                    {addReview.isPending ? t('productDetail.submitting') : t('productDetail.submitReview')}
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-3">
                  <p className="text-muted-foreground">{t('productDetail.pleaseLogin')}</p>
                  <Button asChild>
                    <Link to={`/login?next=/products/${id}`}>{t('productDetail.goToLogin')}</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Similar products */}
        {similar.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">{t('productDetail.similar')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similar.map((p) => (
                <Card key={String(p.id)} className="overflow-hidden">
                  <Link to={`/products/${p.id}`}>
                    <div className="aspect-square bg-secondary/50 overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                  </Link>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold line-clamp-1">{p.name}</h3>
                    <div className="text-sm text-muted-foreground mb-2">{p.category}</div>
                    <div className="font-bold">{formatUZS(p.price ?? 0)}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
