import { useTranslation } from 'react-i18next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const PublicOfferContent = () => {
  const { t } = useTranslation();

  const sections = [
    {
      id: 'intro',
      title: t('publicOffer.sections.introduction.title'),
      body: [t('publicOffer.sections.introduction.body')],
    },
    {
      id: 'services',
      title: t('publicOffer.sections.services.title'),
      body: [t('publicOffer.sections.services.body')],
      list: t('publicOffer.sections.services.list', { returnObjects: true }) as string[],
    },
    {
      id: 'userObligations',
      title: t('publicOffer.sections.userObligations.title'),
      body: [t('publicOffer.sections.userObligations.body')],
      list: t('publicOffer.sections.userObligations.list', { returnObjects: true }) as string[],
    },
    {
      id: 'companyRights',
      title: t('publicOffer.sections.companyRights.title'),
      body: [t('publicOffer.sections.companyRights.body')],
      list: t('publicOffer.sections.companyRights.list', { returnObjects: true }) as string[],
    },
    {
      id: 'payments',
      title: t('publicOffer.sections.payments.title'),
      body: [t('publicOffer.sections.payments.body')],
    },
    {
      id: 'liability',
      title: t('publicOffer.sections.liability.title'),
      body: [t('publicOffer.sections.liability.body')],
    },
    {
      id: 'law',
      title: t('publicOffer.sections.governingLaw.title'),
      body: [t('publicOffer.sections.governingLaw.body')],
    },
    {
      id: 'contact',
      title: t('publicOffer.sections.contact.title'),
      body: [t('publicOffer.sections.contact.body')],
    },
  ];

  const company = t('publicOffer.company', { returnObjects: true }) as Record<string, string>;
  const bank = t('publicOffer.bank', { returnObjects: true }) as {
    title: string;
    columns: { currency: string; account: string; opened: string };
    rows: Array<{ currency: string; account: string; opened: string }>;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">{t('publicOffer.title')}</h2>
        <p className="text-muted-foreground">{t('publicOffer.subtitle')}</p>
      </div>

      <Accordion type="single" collapsible className="w-full divide-y rounded-md border">
        {sections.map((s, idx) => (
          <AccordionItem key={s.id} value={s.id}>
            <AccordionTrigger className="text-left text-base px-2.5">
              <span className="font-medium">
                {s.title}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-3">
                {s.body.map((p, i) => (
                  <p key={i} className="leading-relaxed">
                    {p}
                  </p>
                ))}
                {Array.isArray(s.list) && s.list.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1">
                    {s.list.map((li, i) => (
                      <li key={i}>{li}</li>
                    ))}
                  </ul>
                )}
                {s.id === 'contact' && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">{t('publicOffer.labels.companyName')}</div>
                      <div className="font-medium">{company.companyName}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">{t('publicOffer.labels.tin')}</div>
                      <div className="font-medium">{company.tin}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">{t('publicOffer.labels.address')}</div>
                      <div className="font-medium">{company.address}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">{t('publicOffer.labels.tel')}</div>
                      <div className="font-medium">{company.tel}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">{t('publicOffer.labels.whatsapp')}</div>
                      <div className="font-medium">{company.whatsapp}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">{t('publicOffer.labels.email')}</div>
                      <div className="font-medium">{company.email}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">{t('publicOffer.labels.bankName')}</div>
                      <div className="font-medium">{company.bankName}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">{t('publicOffer.labels.mfo')}</div>
                      <div className="font-medium">{company.mfo}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">{t('publicOffer.labels.swift')}</div>
                      <div className="font-medium">{company.swift}</div>
                    </div>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">{bank.title}</h3>
        <div className="w-full overflow-x-auto rounded-md border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50">
              <tr className="border-b">
                <th className="px-4 py-2 font-medium">{bank.columns.currency}</th>
                <th className="px-4 py-2 font-medium">{bank.columns.account}</th>
                <th className="px-4 py-2 font-medium">{bank.columns.opened}</th>
              </tr>
            </thead>
            <tbody>
              {bank.rows.map((row, i) => (
                <tr key={i} className="border-b hover:bg-muted/30">
                  <td className="px-4 py-2 whitespace-nowrap">{row.currency}</td>
                  <td className="px-4 py-2 min-w-[320px]">{row.account}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{row.opened}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PublicOfferContent;
