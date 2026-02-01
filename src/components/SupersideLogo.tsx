const SupersideLogo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle - Chrome-inspired */}
      <circle cx="24" cy="24" r="22" fill="hsl(var(--primary))" />
      
      {/* Inner white circle */}
      <circle cx="24" cy="24" r="10" fill="white" />
      
      {/* Blue center dot */}
      <circle cx="24" cy="24" r="6" fill="hsl(var(--primary))" />
      
      {/* Colored segments inspired by Chrome */}
      <path
        d="M24 2C13.507 2 4.635 8.982 2 18.5L14 24L24 2Z"
        fill="#EA4335"
        opacity="0.9"
      />
      <path
        d="M2 18.5C0.694 22.9 0.694 27.6 2 32L14 24L2 18.5Z"
        fill="#FBBC05"
        opacity="0.9"
      />
      <path
        d="M2 32C4.635 41.018 13.507 48 24 48L24 36L14 24L2 32Z"
        fill="#34A853"
        opacity="0.9"
      />
    </svg>
  );
};

export default SupersideLogo;
