import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Moon, Sun, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const { cart } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.products'), path: '/products' },
    { name: t('nav.publicOffer'), path: '/public-offer' },
    { name: t('nav.news'), path: '/news' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            {/* Full name on screens wider than 435px */}
            <span className="text-gradient max-[435px]:hidden">Dark & White</span>
            {/* Short name at 435px and below */}
            <span className="text-gradient hidden max-[435px]:inline">DW</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`smooth-transition hover:text-primary ${
                  isActive(link.path) ? 'text-primary font-semibold' : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* 3D Magazine Button */}
            <Link to="/magazine" className="btn-3d-mag hidden md:inline-grid" aria-label="3D Magazine">
              <span>3D Magazine</span>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="smooth-transition"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <LanguageSwitcher />

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative smooth-transition">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 animate-fade-in-up">
            <div className="pb-2">
              <Link to="/magazine" className="btn-3d-mag inline-grid" aria-label="3D Magazine">
                <span>3D Magazine</span>
              </Link>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 smooth-transition hover:text-primary ${
                  isActive(link.path) ? 'text-primary font-semibold' : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
