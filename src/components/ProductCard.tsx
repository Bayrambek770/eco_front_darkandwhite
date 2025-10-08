import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Product } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useUzsToUsdRate } from '@/hooks/useExchangeRate';
import { formatUZS } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { rate: uzsToUsd } = useUzsToUsdRate();

  return (
    <Card className="group overflow-hidden smooth-transition hover:shadow-lg hover:-translate-y-1">
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden bg-secondary/50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover smooth-transition group-hover:scale-110"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="mb-2">
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
            {product.category}
          </span>
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
          <Link to={`/products/${product.id}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex flex-col gap-0.5">
          <span className="text-2xl font-bold text-gradient">{formatUZS(product.price ?? 0)}</span>
          {(() => {
            const rawPrice = product.price ?? 0;
            const likelyUzs = rawPrice > 1000;
            if (likelyUzs && uzsToUsd) {
              const usd = rawPrice * uzsToUsd;
              return <span className="text-xs text-muted-foreground">≈ ${usd.toFixed(2)} USD</span>;
            }
            return null;
          })()}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => addToCart(product)}
          className="w-full smooth-transition"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
