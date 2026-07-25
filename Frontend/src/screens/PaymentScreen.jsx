import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext'; 
import { useNavigate } from 'react-router-dom';
 

const PaymentScreen = () => {

const { savePaymentMethod } = useContext(CartContext);
const navigate = useNavigate(); 

  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Processing payment via ${paymentMethod.toUpperCase()}`);

    savePaymentMethod(paymentMethod);
     navigate('/placeorder');
   
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        
        {/* Left Side: Payment Form */}
        <form onSubmit={handleSubmit} className="md:col-span-2 p-8 sm:p-12 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#5d4037] tracking-tight">Payment Method</h2>
            <p className="mt-1 text-sm text-gray-500">Select a payment method and enter your details.</p>

            {/* Method Toggle Buttons (Visibility Enhanced) */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center justify-center py-4 px-4 border rounded-xl font-bold text-sm transition-all shadow-sm ${
                  paymentMethod === 'card'
                    ? 'border-[#5d4037] bg-orange-50 text-[#5d4037] ring-2 ring-[#5d4037] scale-102 shadow-md'
                    : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                💳 Credit Card
              </button>
              
              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`flex items-center justify-center py-4 px-4 border rounded-xl font-bold text-sm transition-all shadow-sm ${
                  paymentMethod === 'paypal'
                    ? 'border-[#5d4037] bg-orange-50 text-[#5d4037] ring-2 ring-[#5d4037] scale-102 shadow-md'
                    : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                🅿️ PayPal
              </button>
            </div>

            {/* Conditional Form Inputs */}
            {paymentMethod === 'card' ? (
              <div className="mt-8 space-y-5">
                <div>
                  <label htmlFor="cardName" className="block text-xs font-bold text-[#5d4037] uppercase tracking-wider">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    id="cardName"
                    required
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#5d4037] focus:bg-white focus:ring-1 focus:ring-[#5d4037] transition-all text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="cardNumber" className="block text-xs font-bold text-[#5d4037] uppercase tracking-wider">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    required
                    maxLength="19"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 1234 5678"
                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#5d4037] focus:bg-white focus:ring-1 focus:ring-[#5d4037] transition-all text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-xs font-bold text-[#5d4037] uppercase tracking-wider">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      id="expiry"
                      required
                      placeholder="MM/YY"
                      maxLength="5"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#5d4037] focus:bg-white focus:ring-1 focus:ring-[#5d4037] transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-xs font-bold text-[#5d4037] uppercase tracking-wider">
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      name="cvv"
                      id="cvv"
                      required
                      maxLength="4"
                      placeholder="•••"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#5d4037] focus:bg-white focus:ring-1 focus:ring-[#5d4037] transition-all text-sm"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8 p-6 bg-orange-50/50 border border-dashed border-[#5d4037]/30 rounded-2xl text-center">
                <p className="text-sm text-gray-600">
                  You will be redirected to PayPal to complete your purchase securely.
                </p>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-[#5d4037] hover:bg-[#3e2723] text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all text-sm focus:outline-none transform active:scale-95"
            >
              {paymentMethod === 'card' ? 'Pay ₹89.00 Securely' : 'Proceed to PayPal'}
            </button>
            <p className="mt-3 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
              🔒 Your payment data is encrypted and secure.
            </p>
          </div>
        </form>

        {/* Right Side: Order Summary Sidebar (Matched to Navbar) */}
        <div className="bg-[#5d4037] p-8 sm:p-12 text-white flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-orange-100">Order Summary</h3>
            <div className="mt-6 space-y-4 border-b border-[#3e2723] pb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-orange-200">Pro Subscription (Annual)</span>
                <span className="font-medium">₹79.00</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-orange-200">Tax / VAT</span>
                <span className="font-medium">₹10.00</span>
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-0 pt-6">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-sm text-orange-200">Total amount due</span>
              <span className="text-3xl font-extrabold text-white">₹89.00</span>
            </div>
            <div className="text-xs text-orange-200 leading-relaxed bg-[#3e2723]/40 p-3 rounded-xl border border-[#3e2723]/60">
              Need help? Contact our support team for alternative options like corporate wire transfers.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PaymentScreen;