import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const company = t('publicOffer.company', { returnObjects: true }) as any;
  return (
    <footer className="bg-secondary/50 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-gradient">Dark & White</span>
            </h3>
            <p className="text-muted-foreground mb-4">{t('footer.brandTagline')}</p>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="hover:text-primary smooth-transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Telegram" className="hover:text-primary smooth-transition">
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary smooth-transition">
                  {t('footer.links.allProducts')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary smooth-transition">
                  {t('footer.links.aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-muted-foreground hover:text-primary smooth-transition">
                  {t('footer.links.newsUpdates')}
                </Link>
              </li>
              <li>
                <Link to="/public-offer" className="text-muted-foreground hover:text-primary smooth-transition">
                  {t('footer.links.publicOffer')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.categories')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products?filter=CPU" className="text-muted-foreground hover:text-primary smooth-transition">
                  {t('footer.categoriesList.cpu')}
                </Link>
              </li>
              <li>
                <Link to="/products?filter=GPU" className="text-muted-foreground hover:text-primary smooth-transition">
                  {t('footer.categoriesList.gpu')}
                </Link>
              </li>
              <li>
                <Link to="/products?filter=Monoblock" className="text-muted-foreground hover:text-primary smooth-transition">
                  {t('footer.categoriesList.monoblock')}
                </Link>
              </li>
              <li>
                <Link to="/products?filter=Monitor" className="text-muted-foreground hover:text-primary smooth-transition">
                  {t('footer.categoriesList.monitor')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.contactUs')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>{company?.address || ''}</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>{company?.tel || ''}</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>{company?.email || ''}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Dark & White. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
