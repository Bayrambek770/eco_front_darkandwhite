import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Headphones, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import { useMostSold, useRecommended } from '@/hooks/useProducts';
import heroImage from '@/assets/hero-cpu.jpg';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  const advantages = [
    {
      icon: Shield,
      title: t('home.advantages.authenticTitle'),
      description: t('home.advantages.authenticDesc'),
    },
    {
      icon: Truck,
      title: t('home.advantages.fastTitle'),
      description: t('home.advantages.fastDesc'),
    },
    {
      icon: Headphones,
      title: t('home.advantages.supportTitle'),
      description: t('home.advantages.supportDesc'),
    },
    {
      icon: Star,
      title: t('home.advantages.pricesTitle'),
      description: t('home.advantages.pricesDesc'),
    },
  ];

  const reviews = [
    {
      name: 'Alex Thompson',
      rating: 5,
      comment: 'Incredible selection and lightning-fast shipping. The RTX 4090 I ordered arrived perfectly packaged.',
      verified: true,
    },
    {
      name: 'Sarah Chen',
      rating: 5,
      comment: 'Best prices I found online. Customer service was extremely helpful with my build questions.',
      verified: true,
    },
    {
      name: 'Marcus Rodriguez',
      rating: 5,
      comment: 'Professional service from start to finish. The product arrived exactly as described.',
      verified: true,
    },
  ];

  const { data: featured, isLoading: loadingFeatured } = useRecommended();
  const { data: popular, isLoading: loadingPopular } = useMostSold();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[100svh] flex items-center overflow-hidden">
        {/* Background image with subtle Ken Burns effect */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={heroImage}
            alt="Hero background"
            className="w-full h-full object-cover animate-kenburns-slow"
          />
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t('home.heroTitle1')}
              <br />
              <span className="text-gradient">{t('home.heroTitle2')}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">{t('home.heroSubtitle')}</p>
            <div className="flex gap-4">
              <Button size="lg" asChild className="smooth-transition">
                <Link to="/products">
                  {t('home.shopNow')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="smooth-transition">
                <Link to="/about">{t('home.learnMore')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4">{t('home.bestSellers')}</h2>
            <p className="text-muted-foreground text-lg">{t('home.bestSellersDesc')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {loadingPopular ? (
              <p className="text-muted-foreground">{t('products.loading')}</p>
            ) : (
              (popular?.results ?? []).slice(0, 6).map((product) => (
                <div key={product.id} className="animate-scale-in">
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4">{t('home.featured')}</h2>
            <p className="text-muted-foreground text-lg">{t('home.featuredDesc')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingFeatured ? (
              <p className="text-muted-foreground">{t('products.loading')}</p>
            ) : (
              (featured?.results ?? []).slice(0, 6).map((product, index) => (
                <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
          <div className="text-center mt-10">
            <Button size="lg" variant="outline" asChild>
              <Link to="/products">{t('home.browseAll')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4">{t('home.whyChoose')}</h2>
            <p className="text-muted-foreground text-lg">{t('home.whyChooseDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <Card key={index} className="text-center smooth-transition hover:shadow-lg animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{advantage.title}</h3>
                    <p className="text-muted-foreground text-sm">{advantage.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-4">{t('home.whatCustomersSay')}</h2>
            <p className="text-muted-foreground text-lg">{t('home.reviewsDesc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{review.comment}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      {review.verified && (
                        <p className="text-xs text-primary">{t('home.verifiedPurchase')}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 text-center animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-4">{t('home.readyToBuild')}</h2>
          <p className="text-lg mb-8 opacity-90">{t('home.featuredDesc')}</p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/products">
              {t('home.browseAll')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
