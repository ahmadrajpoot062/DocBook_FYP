import React, { useEffect } from 'react';
import Hero from '../Components/Hero';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when Home page loads
  }, []);

  return (
    <div>
      <Hero />
    </div>
  );
}
