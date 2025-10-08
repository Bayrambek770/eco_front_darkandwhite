import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useInView } from '@/hooks/useInView';

const PlaceholderImage = ({ side }: { side: 'left' | 'right' }) => (
  <div
    className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-teal-200 via-teal-100 to-amber-100 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900"
    aria-hidden
  >
    <div className="absolute inset-0 opacity-30 [background:radial-gradient(600px_200px_at_10%_10%,theme(colors.teal.400/.4),transparent_40%)]" />
    <div className="absolute inset-0 opacity-20 [background:radial-gradient(400px_160px_at_90%_80%,theme(colors.amber.400/.5),transparent_40%)]" />
    <div className="absolute inset-0">
      <div className="w-[140%] h-[140%] -rotate-6 translate-x-[-10%] translate-y-[-10%] opacity-30 bg-[conic-gradient(at_50%_50%,theme(colors.teal.300/.15),theme(colors.amber.300/.15),theme(colors.teal.300/.15))]" />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
  </div>
);

const TextBlock = ({
  eyebrow,
  title,
  body,
  cta,
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  align?: 'left' | 'right';
}) => (
  <div className={`max-w-xl ${align === 'right' ? 'ml-auto text-right' : ''}`}>
    <p className="uppercase tracking-wide text-xs text-muted-foreground mb-2">{eyebrow}</p>
    <h3 className="text-2xl sm:text-3xl font-semibold mb-3 text-foreground">{title}</h3>
    <p className="text-muted-foreground mb-6">{body}</p>
    <Button asChild>
      <Link to="/products">{cta}</Link>
    </Button>
  </div>
);

const SectionRow = ({ reverse = false }: { reverse?: boolean }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const imageFirst = reverse;
  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } transition-all duration-700 ease-out`}
    >
      {imageFirst ? (
        <>
          <div className={`${inView ? 'animate-fade-in' : ''}`}>
            <PlaceholderImage side="left" />
          </div>
          <div className={`${inView ? 'lg:translate-x-0 opacity-100' : 'lg:translate-x-6 opacity-0'} transition-all duration-700 ease-out`}> 
            <TextBlock
              eyebrow="Collection"
              title="Minimal, Sophisticated, Elegant"
              body="A clean alternating composition that feels balanced and refined. Perfect for product storytelling or feature highlights."
              cta="Explore"
              align="left"
            />
          </div>
        </>
      ) : (
        <>
          <div className={`${inView ? 'lg:-translate-x-0 opacity-100' : 'lg:-translate-x-6 opacity-0'} transition-all duration-700 ease-out`}>
            <TextBlock
              eyebrow="Feature"
              title="Alternating Zig-Zag Layout"
              body="Each block slides into view as you scroll, with images fading gracefully and text drifting from the side for a polished experience."
              cta="See More"
              align="right"
            />
          </div>
          <div className={`${inView ? 'animate-fade-in' : ''}`}>
            <PlaceholderImage side="right" />
          </div>
        </>
      )}
    </div>
  );
};

const ZigZagDemo = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-neutral-950">
      <header className="container mx-auto px-4 sm:px-6 lg:px-12 pt-14 pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Zig-Zag Layout</h1>
        <p className="text-muted-foreground mt-2">A modern alternating composition with subtle scroll cues.</p>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-12 pb-24">
        <div className="space-y-20">
          {/* Block 1: text left, image right */}
          <SectionRow reverse={false} />
          {/* Block 2: image left, text right */}
          <SectionRow reverse />
          {/* Block 3: text left, image right */}
          <SectionRow reverse={false} />
        </div>

        {/* visual cue of more content below */}
        <div className="mt-20 h-12 rounded-xl bg-gradient-to-b from-zinc-100 to-transparent dark:from-neutral-900" />
      </main>
    </div>
  );
};

export default ZigZagDemo;
