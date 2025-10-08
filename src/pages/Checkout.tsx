import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { CheckoutService } from '@/api/checkout';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { formatUZS } from '@/lib/utils';

const makeSchema = (t: (key: string) => string) =>
  z.object({
    firstName: z.string().trim().min(1, { message: t('checkoutPage.zod.firstName') }).max(50),
    lastName: z.string().trim().min(1, { message: t('checkoutPage.zod.lastName') }).max(50),
    email: z.string().trim().email({ message: t('checkoutPage.zod.email') }).max(255),
    phone: z.string().trim().min(10, { message: t('checkoutPage.zod.phone') }).max(20),
    address: z.string().trim().min(5, { message: t('checkoutPage.zod.address') }).max(200),
    city: z.string().trim().min(1, { message: t('checkoutPage.zod.city') }).max(100),
    zipCode: z.string().trim().min(3, { message: t('checkoutPage.zod.zipCode') }).max(10),
    country: z.string().trim().min(1, { message: t('checkoutPage.zod.country') }).max(100),
  });

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t } = useTranslation();
  const checkoutSchema = makeSchema(t);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      checkoutSchema.parse(formData);
      setErrors({});
      setSubmitting(true);
      const shipping_name = `${formData.firstName} ${formData.lastName}`.trim();
      const shipping_address = `${formData.address}, ${formData.city}, ${formData.country}, ${formData.zipCode}`;
      try {
        if (import.meta.env.VITE_API_BASE_URL) {
          await CheckoutService.placeOrder({ shipping_name, shipping_address });
        }
        toast({
          title: t('checkoutPage.toastOkTitle'),
          description: t('checkoutPage.toastOkDesc'),
        });
        clearCart();
        navigate('/order-complete');
      } catch (apiErr) {
        toast({ title: t('checkoutPage.toastErrTitle'), description: t('checkoutPage.toastErrDesc') });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-8 animate-fade-in">
          <span className="text-gradient">{t('checkoutPage.title')}</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle>{t('checkoutPage.shippingInfo')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                        {t('checkoutPage.labels.firstName')} *
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? 'border-destructive' : ''}
                      />
                      {errors.firstName && (
                        <p className="text-destructive text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                        {t('checkoutPage.labels.lastName')} *
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? 'border-destructive' : ''}
                      />
                      {errors.lastName && (
                        <p className="text-destructive text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        {t('checkoutPage.labels.email')} *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && (
                        <p className="text-destructive text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        {t('checkoutPage.labels.phone')} *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? 'border-destructive' : ''}
                      />
                      {errors.phone && (
                        <p className="text-destructive text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-2">
                      {t('checkoutPage.labels.address')} *
                    </label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={errors.address ? 'border-destructive' : ''}
                    />
                    {errors.address && (
                      <p className="text-destructive text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-2">
                        {t('checkoutPage.labels.city')} *
                      </label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={errors.city ? 'border-destructive' : ''}
                      />
                      {errors.city && (
                        <p className="text-destructive text-sm mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium mb-2">
                        {t('checkoutPage.labels.zipCode')} *
                      </label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={errors.zipCode ? 'border-destructive' : ''}
                      />
                      {errors.zipCode && (
                        <p className="text-destructive text-sm mt-1">{errors.zipCode}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-medium mb-2">
                        {t('checkoutPage.labels.country')} *
                      </label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={errors.country ? 'border-destructive' : ''}
                      />
                      {errors.country && (
                        <p className="text-destructive text-sm mt-1">{errors.country}</p>
                      )}
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                    {submitting ? t('checkoutPage.placing') : t('checkoutPage.place')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 animate-fade-in-up">
              <CardHeader>
                <CardTitle>{t('checkoutPage.summary')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-semibold">
                        {formatUZS(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t('checkoutPage.subtotal')}</span>
                    <span>{formatUZS(total)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t('checkoutPage.shipping')}</span>
                    <span className="text-primary">{t('checkoutPage.free')}</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-lg font-semibold">{t('checkoutPage.total')}</span>
                      <span className="text-2xl font-bold text-gradient">
                        {formatUZS(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
