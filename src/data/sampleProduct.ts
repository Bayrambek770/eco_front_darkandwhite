import cpu from '@/assets/public-cpu.jpeg';
import gpu from '@/assets/product-gpu.jpg';
import monitor from '@/assets/product-monitor.jpg';

export const sampleProduct = {
  id: 'sample-1',
  name: 'Ultimate Gaming CPU Bundle',
  category: 'CPU' as const,
  price: 1299,
  image: cpu,
  images: [cpu, gpu, monitor],
  description:
    'A premium CPU bundle designed for enthusiasts. Includes high-performance processor and compatible cooler. Perfect for gaming and content creation.',
  specs: [
    'Architecture: Next‑gen multi-core',
    'Base Clock: 4.2 GHz',
    'Boost Clock: up to 5.8 GHz',
    'TDP: 125W',
    'Socket: AM5 / LGA1700 (variant-based)',
  ],
  brand: 'YourBrand',
};

export const similarSampleProducts = [
  {
    id: 'sample-2',
    name: 'Pro Liquid Cooler',
    category: 'Monoblock' as const,
    price: 249,
    image: monitor,
    description: 'High-efficiency liquid cooling for maximum stability and lower temps.',
    specs: [],
  },
  {
    id: 'sample-3',
    name: 'Next-Gen GPU',
    category: 'GPU' as const,
    price: 1799,
    image: gpu,
    description: 'Experience ultra performance with ray tracing and AI acceleration.',
    specs: [],
  },
  {
    id: 'sample-4',
    name: '4K Gaming Monitor',
    category: 'Monitor' as const,
    price: 699,
    image: monitor,
    description: 'Crisp visuals, high refresh rate, and vibrant colors for gaming.',
    specs: [],
  },
];
