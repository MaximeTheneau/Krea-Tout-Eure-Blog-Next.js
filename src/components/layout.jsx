// components/layout.js

import Navbar from './navbar';
import Footer from './footer';
import Background from './background';



export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
}
