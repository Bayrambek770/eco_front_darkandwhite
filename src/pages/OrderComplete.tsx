import { Link } from 'react-router-dom';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

const OrderComplete = () => {
  const { t } = useTranslation();
  const orderNumber = `DW${Date.now().toString().slice(-8)}`;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8 animate-scale-in">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
              <CheckCircle className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-gradient">{t('orderComplete.confirmed')}</span>
            </h1>
            <p className="text-xl text-muted-foreground">{t('orderComplete.thankYou')}</p>
          </div>

          {/* Order Details */}
          <Card className="mb-8 animate-fade-in-up">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('orderComplete.orderNumber')}</p>
                  <p className="text-2xl font-bold text-gradient">{orderNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">{t('orderComplete.orderDate')}</p>
                  <p className="font-semibold">{new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('orderComplete.emailTitle')}</h3>
                    <p className="text-sm text-muted-foreground">{t('orderComplete.emailDesc')}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t('orderComplete.deliveryTitle')}</h3>
                    <p className="text-sm text-muted-foreground">{t('orderComplete.deliveryDesc')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">{t('orderComplete.nextTitle')}</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">1</span>
                  </span>
                  <span>{t('orderComplete.next1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">2</span>
                  </span>
                  <span>{t('orderComplete.next2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">3</span>
                  </span>
                  <span>{t('orderComplete.next3')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Button size="lg" asChild className="flex-1">
              <Link to="/products">
                {t('orderComplete.continue')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="flex-1">
              <Link to="/">{t('orderComplete.backHome')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
