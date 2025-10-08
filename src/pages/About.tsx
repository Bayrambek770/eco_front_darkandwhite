import { Users, Award, Globe, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const stats = [
    { icon: Users, label: t('about.stats.happyCustomers'), value: '50,000+' },
    { icon: Award, label: t('about.stats.yearsInBusiness'), value: '15+' },
    { icon: Globe, label: t('about.stats.countriesServed'), value: '45+' },
    { icon: Zap, label: t('about.stats.productsShipped'), value: '200,000+' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl font-bold mb-6">
              {t('about.heroTitlePrefix')} <span className="text-gradient">Dark & White</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('about.heroTagline')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-8 text-center">{t('about.storyTitle')}</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>{t('about.storyP1')}</p>
              <p>{t('about.storyP2')}</p>
              <p>{t('about.storyP3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="animate-fade-in-up">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4">{t('about.missionTitle')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('about.missionBody')}</p>
              </CardContent>
            </Card>
            <Card className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-4">{t('about.visionTitle')}</h3>
                <p className="text-muted-foreground leading-relaxed">{t('about.visionBody')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center animate-fade-in-up">{t('about.valuesTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {([
              { key: 'quality', title: t('about.values.quality.title'), desc: t('about.values.quality.desc') },
              { key: 'innovation', title: t('about.values.innovation.title'), desc: t('about.values.innovation.desc') },
              { key: 'customer', title: t('about.values.customer.title'), desc: t('about.values.customer.desc') },
            ] as const).map((value, index) => (
              <Card key={value.key} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
