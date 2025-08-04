import React, { FC, ReactNode, useEffect, useState } from 'react';

interface AnimatedContainerProps {
  children: ReactNode;
  delay?: number;
}

const AnimatedContainer: FC<AnimatedContainerProps> = ({
  children,
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedContainer;
