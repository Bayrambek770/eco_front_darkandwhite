import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useTranslation } from 'react-i18next';
import { formatUZS } from '@/lib/utils';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const { t } = useTranslation();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
          <h2 className="text-3xl font-bold mb-4">{t('cartPage.emptyTitle')}</h2>
          <p className="text-muted-foreground mb-8">{t('cartPage.emptyDesc')}</p>
          <Button size="lg" asChild>
            <Link to="/products">{t('cartPage.browseProducts')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-8 animate-fade-in">
          <span className="text-gradient">{t('cartPage.title')}</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <Card key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-secondary">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold text-gradient">
                            {formatUZS(item.price * item.quantity)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatUZS(item.price)} {t('cartPage.each')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 animate-fade-in-up">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">{t('cartPage.summary')}</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t('cartPage.subtotal')}</span>
                    <span>{formatUZS(total)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t('cartPage.shipping')}</span>
                    <span className="text-primary">{t('cartPage.free')}</span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-lg font-semibold">{t('cartPage.total')}</span>
                      <span className="text-3xl font-bold text-gradient">
                        {formatUZS(total)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button size="lg" className="w-full mb-3" asChild>
                  <Link to="/checkout">{t('cartPage.proceedCheckout')}</Link>
                </Button>

                <Button variant="outline" className="w-full" asChild>
                  <Link to="/products">{t('cartPage.continueShopping')}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
