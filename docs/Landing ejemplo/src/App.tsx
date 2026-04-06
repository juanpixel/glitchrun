/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Idea } from './components/Idea';
import { TechStack } from './components/TechStack';
import { Process } from './components/Process';
import { Result } from './components/Result';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-neon-green selection:text-dark-bg">
      <div className="scanline" />
      <Navbar />
      <main className="space-y-12">
        <Hero />
        <Idea />
        <TechStack />
        <Process />
        <Result />
      </main>
      <Footer />
    </div>
  );
}
