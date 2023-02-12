import { ReactNode } from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';

function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="bg-gray-50 w-full min-h-screen">
      <Header />
      {children}
      <Footer />
    </section>
  );
}

export default Layout;
