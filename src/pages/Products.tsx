import { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CreditCard } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [advance, setAdvance] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') ?? '');
  const filterFromUrl = (searchParams.get('category') as 'CPU' | 'GPU' | 'Monoblock' | 'Monitor' | null) || null;
  const [activeFilter, setActiveFilter] = useState<string>(filterFromUrl || 'All');
  const orderingFromUrl = searchParams.get('ordering') || '';
  const [ordering, setOrdering] = useState<string>(orderingFromUrl);
  const brandFromUrl = searchParams.get('brand') || '';
  const [brand, setBrand] = useState<string>(brandFromUrl);
  const pageFromUrl = Number(searchParams.get('page') || '1');
  const [page, setPage] = useState<number>(pageFromUrl > 0 ? pageFromUrl : 1);

  const { data, isLoading, isError } = useProducts({
    category: activeFilter !== 'All' ? (activeFilter as any) : undefined,
    search: searchQuery || undefined,
    brand: brand || undefined,
    ordering: (ordering || undefined) as any,
    page,
  });
  const categories = ['All', 'CPU', 'GPU', 'Monoblock', 'Monitor'];

  const filteredProducts = useMemo(() => {
  let filtered = data?.results && !isError ? data.results : [];

    if (activeFilter !== 'All') {
      filtered = filtered.filter((p) => p.category === activeFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [data, isError, activeFilter, searchQuery]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setPage(1);
  };

  useEffect(() => {
    const params: Record<string, string> = {};
    if (activeFilter !== 'All') params.category = activeFilter;
    if (searchQuery) params.search = searchQuery;
    if (brand) params.brand = brand;
    if (ordering) params.ordering = ordering;
    if (page && page !== 1) params.page = String(page);
    setSearchParams(params, { replace: true });
  }, [activeFilter, searchQuery, brand, ordering, page, setSearchParams]);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4">
            {t('products.title')}
          </h1>
          <p className="text-xl text-muted-foreground">{t('home.featuredDesc')}</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 animate-fade-in-up">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('products.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? 'default' : 'outline'}
              onClick={() => handleFilterChange(category)}
              className="smooth-transition"
            >
              {category === 'All' ? t('products.allCategories') : category}
            </Button>
          ))}
        </div>

        {/* Brand and Ordering */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in-up">
          <Input
            placeholder={t('products.brand')}
            value={brand}
            onChange={(e) => { setBrand(e.target.value); setPage(1); }}
            className="max-w-xs"
          />
          <select
            className="border rounded-md px-3 py-2 bg-background"
            value={ordering}
            onChange={(e) => { setOrdering(e.target.value); setPage(1); }}
          >
            <option value="">{t('products.ordering')}</option>
            <option value="price">{t('products.priceAsc')}</option>
            <option value="-price">{t('products.priceDesc')}</option>
            <option value="name">{t('products.nameAsc')}</option>
            <option value="-name">{t('products.nameDesc')}</option>
            <option value="created_at">{t('products.newest')}</option>
          </select>
        </div>

        {/* Results Count / Loading */}
        <div className="mb-6 text-muted-foreground">
          {isLoading ? t('products.loading') : (
            <> {t('products.page')}: {page} · {filteredProducts.length}/{data?.count ?? filteredProducts.length} </>
          )}
        </div>

        {/* Products Grid */}
  {!isLoading && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : !isLoading ? (
          <div className="text-center py-20 animate-fade-in">
            <p className="text-2xl text-muted-foreground">{t('products.noResults')}</p>
          </div>
        ) : null}

        {/* Pagination */}
        {(!isLoading && (data?.count ?? filteredProducts.length) > 12) && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <Button variant="outline" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>
              ‹
            </Button>
            <span className="text-sm text-muted-foreground">Page {page}</span>
            <Button
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
              disabled={data?.count ? page * 12 >= (data?.count ?? 0) : filteredProducts.length < 12}
            >
              ›
            </Button>
          </div>
        )}
      </div>
      {/* Payment Notice */}
      <div className="mt-16 animate-fade-in-up">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md smooth-transition">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
              <CreditCard className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold leading-tight">{t('paymentNotice.title')}</h3>
              <p className="text-muted-foreground mt-1">{t('paymentNotice.subtitle')}</p>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <Input
                type="number"
                min={1}
                step="0.01"
                placeholder="1 SUM"
                className="w-36"
                value={advance}
                onChange={(e) => setAdvance(e.target.value)}
              />
              <Button
                variant="default"
                onClick={() => {
                  const amount = Number(advance);
                  if (!amount || amount <= 0) {
                    // naive inline validation; could add toast
                    alert(t('paymentNotice.invalidAmount'));
                    return;
                  }
                  addToCart({
                    id: 'advance-payment',
                    name: t('paymentNotice.title'),
                    category: 'CPU',
                    price: Number(amount.toFixed(2)),
                    image: '',
                    description: t('paymentNotice.subtitle'),
                    specs: [],
                  } as any);
                  navigate('/cart');
                }}
              >
                {t('cartPage.title')}
              </Button>
            </div>
          </div>
          {/* Mobile actions */}
          <div className="sm:hidden mt-3 flex items-center gap-3">
            <Input
              type="number"
              min={1}
              step="0.01"
              placeholder="1 SUM"
              className="flex-1"
              value={advance}
              onChange={(e) => setAdvance(e.target.value)}
            />
            <Button
              variant="default"
              className="flex-shrink-0"
              onClick={() => {
                const amount = Number(advance);
                if (!amount || amount <= 0) {
                  alert(t('paymentNotice.invalidAmount'));
                  return;
                }
                addToCart({
                  id: 'advance-payment',
                  name: t('paymentNotice.title'),
                  category: 'CPU',
                  price: Number(amount.toFixed(2)),
                  image: '',
                  description: t('paymentNotice.subtitle'),
                  specs: [],
                } as any);
                navigate('/cart');
              }}
            >
              {t('cartPage.title')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
