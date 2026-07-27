import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#2d1b18] text-gray-300 border-t-4 border-[#3e2723] font-sans mt-auto">
      
      {/* 🔝 TOP SECTION: Multi-Column Grid Layout */}
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm border-b border-[#3e2723] pb-10">
        
        {/* Col 1: About */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-[#F5E0C3] font-bold uppercase tracking-wider mb-2 text-xs">About</h3>
          <Link to="/about" className="hover:underline hover:text-white transition-colors">Contact Us</Link>
          <Link to="/about" className="hover:underline hover:text-white transition-colors">About Us</Link>
          <Link to="/careers" className="hover:underline hover:text-white transition-colors">Careers</Link>
          <Link to="/stories" className="hover:underline hover:text-white transition-colors">TechnoMart Stories</Link>
          <Link to="/press" className="hover:underline hover:text-white transition-colors">Press Corporate</Link>
        </div>

        {/* Col 2: Categories (TechnoMart Special) */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-[#F5E0C3] font-bold uppercase tracking-wider mb-2 text-xs">Categories</h3>
          <Link to="/?category=Electronics" className="hover:underline hover:text-white transition-colors">Electronics & Gadgets</Link>
          <Link to="/?category=Hardware" className="hover:underline hover:text-white transition-colors">Hardware Essentials</Link>
          <Link to="/tools" className="hover:underline hover:text-white transition-colors">Power Tools</Link>
          <Link to="/wiring" className="hover:underline hover:text-white transition-colors">Home Electricals</Link>
        </div>

        {/* Col 3: Help */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-[#F5E0C3] font-bold uppercase tracking-wider mb-2 text-xs">Help</h3>
          <Link to="/payments" className="hover:underline hover:text-white transition-colors">Payments</Link>
          <Link to="/shipping" className="hover:underline hover:text-white transition-colors">Shipping</Link>
          <Link to="/returns" className="hover:underline hover:text-white transition-colors">Cancellation & Returns</Link>
          <Link to="/faq" className="hover:underline hover:text-white transition-colors">FAQ</Link>
        </div>

        {/* Col 4: Consumer Policy */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-[#F5E0C3] font-bold uppercase tracking-wider mb-2 text-xs">Consumer Policy</h3>
          <Link to="/policy" className="hover:underline hover:text-white transition-colors">Return Policy</Link>
          <Link to="/terms" className="hover:underline hover:text-white transition-colors">Terms Of Use</Link>
          <Link to="/security" className="hover:underline hover:text-white transition-colors">Security</Link>
          <Link to="/privacy" className="hover:underline hover:text-white transition-colors">Privacy & Sitemap</Link>
        </div>

        {/* Col 5: Mail Us / Office Address */}
        <div className="flex flex-col gap-3 md:col-span-2 lg:col-span-1 border-t lg:border-t-0 lg:border-l border-[#3e2723] pt-6 lg:pt-0 lg:pl-6 text-xs text-gray-400">
          <h3 className="text-[#F5E0C3] font-bold uppercase tracking-wider text-xs">Registered Office:</h3>
          <p className="leading-relaxed">
            TechnoMart Internet Private Limited,<br />
            Bhavana Tower, Tukoganj,<br />
            Indore, Madhya Pradesh, 452001,<br />
            India.
          </p>
          <div className="mt-2">
            <h4 className="text-[#F5E0C3] font-bold mb-2 uppercase tracking-wider text-[10px]">Connect With Us:</h4>
            <div className="flex gap-4 text-lg">
              <a href="#" className="hover:text-blue-400 transition-colors">🌐</a>
              <a href="#" className="hover:text-sky-400 transition-colors">🐦</a>
              <a href="#" className="hover:text-red-500 transition-colors">📺</a>
              <a href="#" className="hover:text-pink-400 transition-colors">📸</a>
            </div>
          </div>
        </div>

      </div>

      {/* ⬇️ BOTTOM SECTION: Merchant Links & Payments */}
      <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-gray-400">
        
        {/* Extra Utility Links */}
        <div className="flex flex-wrap justify-center gap-6 text-[#F5E0C3]/90">
          <a href="#" className="hover:text-white flex items-center gap-1">💼 Become a Seller</a>
          <a href="#" className="hover:text-white flex items-center gap-1">📣 Advertise</a>
          <a href="#" className="hover:text-white flex items-center gap-1">🎁 Gift Cards</a>
          <a href="#" className="hover:text-white flex items-center gap-1">❓ Help Center</a>
        </div>

        {/* Copyright Text */}
        <div className="text-center text-gray-500">
          © 2007-2026 TechnoMart.com. All rights reserved.
        </div>

        {/* Mock Payment Gateways */}
        <div className="flex items-center gap-2 bg-[#1e1210] px-4 py-2 rounded-lg border border-[#3e2723] select-none text-[10px] uppercase tracking-widest text-[#F5E0C3]/60 font-black">
          💳 Visa • Mastercard • Rupay • UPI Secure
        </div>

      </div>

    </footer>
  );
};

export default Footer;