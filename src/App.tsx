import React from 'react';
import Calculator from './components/Calculator';
import { Calculator as CalcIcon } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-3">
            <CalcIcon className="h-12 w-12 text-[#00C16A]" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Business Margin Calculator</h1>
          </div>
          <p className="text-xl text-gray-600">Make informed decisions about your business finances</p>
        </header>
        <Calculator />
      </div>
    </div>
  );
}

export default App;