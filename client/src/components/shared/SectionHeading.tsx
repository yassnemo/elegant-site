import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
}

const SectionHeading = ({ 
  eyebrow, 
  title, 
  description, 
  alignment = 'center',
  className 
}: SectionHeadingProps) => {
  return (
    <div 
      className={cn(
        'mb-16 section-transition', 
        {
          'text-center': alignment === 'center',
          'text-left': alignment === 'left',
          'text-right': alignment === 'right'
        },
        className
      )}
    >
      <span className="text-sm text-primary font-medium uppercase tracking-wider">{eyebrow}</span>
      <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">{title}</h2>
      {description && (
        <p className={cn(
          "text-gray-600",
          alignment === 'center' && "max-w-2xl mx-auto"
        )}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
