import React from 'react';
import { AboutMG } from './components/AboutMG';
import Faq from './components/Faq';

export default function InfosPage() {
  return (
    <div className="h-fit w-full flex flex-col items-center justify-center mt-32">
      <AboutMG/>
      <Faq/>
    </div>
  );
}
