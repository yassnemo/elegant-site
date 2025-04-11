interface ZigZagLineProps {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
}

const ZigZagLine = ({ className = '', stroke = 'white', strokeWidth = 2 }: ZigZagLineProps) => {
  return (
    <svg 
      className={className}
      width="100%" 
      height="100%" 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M0,50 L25,25 L50,75 L75,25 L100,50" 
        stroke={stroke} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ZigZagLine;