import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, Clock, Calendar, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { cmsContent, addToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredSalon, setPreferredSalon] = useState('Kuwait City Flagship');
  const [serviceType, setServiceType] = useState('Bespoke Made-to-Measure');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    addToast('Your appointment inquiry has been received. Our senior stylist will reach out within 2 hours.', 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880]">
          ATELIER CONCIERGE & SALON BOOKINGS
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-medium">
          Connect With Our Private Stylists
        </h1>
        <p className="text-xs text-[#7A7870] font-light max-w-md mx-auto">
          Schedule an in-person bespoke fitting, private showroom consultation, or inquire about archival allocations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-6 text-xs">
          <div className="bg-[#FAF9F6] dark:bg-[#121318] p-6 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-4">
            <h3 className="font-mono uppercase tracking-wider font-semibold text-[#C5A880]">
              Global Client Concierge Hotline
            </h3>

            <div className="space-y-3 text-[#5C5E6D] dark:text-[#A8AAB9]">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C5A880]" />
                <span className="font-mono text-black dark:text-white font-medium">
                  {cmsContent.contactPhone}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C5A880]" />
                <span className="text-black dark:text-white">
                  {cmsContent.contactEmail}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C5A880]" />
                <span>24/7 Global White-Glove Support</span>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF9F6] dark:bg-[#121318] p-6 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-3">
            <h3 className="font-mono uppercase tracking-wider font-semibold text-[#C5A880]">
              Flagship Salon Destinations
            </h3>
            <ul className="space-y-2 text-[#5C5E6D] dark:text-[#A8AAB9]">
              <li><strong>Kuwait City:</strong> Al Hamra Luxury Center, Level 2</li>
              <li><strong>London:</strong> 42 New Bond Street, Mayfair</li>
              <li><strong>Paris:</strong> 18 Place Vendôme</li>
              <li><strong>New York:</strong> 680 Madison Avenue</li>
              <li><strong>Tokyo:</strong> 4-12-10 Jingumae, Omotesando</li>
            </ul>
          </div>
        </div>

        {/* Right: Booking Form */}
        <div className="lg:col-span-7 bg-[#FAF9F6] dark:bg-[#121318] p-8 rounded-sm border border-[#E3DFD5] dark:border-[#262832] space-y-6 text-xs">
          <div>
            <h3 className="text-xl font-serif font-medium">
              Request a Private Styling Appointment
            </h3>
            <p className="text-[#7A7870] font-light mt-1">
              Please complete the form below to reserve your private salon suite.
            </p>
          </div>

          {isSent ? (
            <div className="p-6 bg-[#1B6B4A]/10 border border-[#1B6B4A]/30 rounded text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[#1B6B4A] dark:text-[#4ADE80] mx-auto" />
              <h4 className="font-serif text-lg font-medium">Appointment Requested</h4>
              <p className="text-[#6C6E7C] dark:text-[#A8AAB9]">
                Your dedicated stylist concierge will contact you shortly to confirm timing and prepare custom fabric swatches.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[#7A7870] block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    required
                    className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2.5 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="font-mono text-[#7A7870] block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="eleanor@example.com"
                    required
                    className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2.5 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[#7A7870] block mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+965 9988 7766"
                    required
                    className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2.5 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div>
                  <label className="font-mono text-[#7A7870] block mb-1">Preferred Flagship Salon</label>
                  <select
                    value={preferredSalon}
                    onChange={(e) => setPreferredSalon(e.target.value)}
                    className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2.5 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="Kuwait City Flagship">Kuwait City — Al Hamra Pavilion</option>
                    <option value="London Mayfair Maison">London — New Bond Street</option>
                    <option value="Paris Place Vendôme">Paris — Place Vendôme</option>
                    <option value="New York Madison">New York — Madison Avenue</option>
                    <option value="Tokyo Omotesando">Tokyo — Omotesando</option>
                    <option value="Virtual Concierge Fitting">Virtual High-Definition Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-mono text-[#7A7870] block mb-1">Service Required</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2.5 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="Bespoke Made-to-Measure">Bespoke Made-to-Measure Tailoring</option>
                  <option value="Haute Couture Eveningwear">Haute Couture Eveningwear Fitting</option>
                  <option value="Seasonal Wardrobe Styling">Seasonal Capsule Wardrobe Styling</option>
                  <option value="Archival Sourcing Request">Archival Piece Sourcing</option>
                </select>
              </div>

              <div>
                <label className="font-mono text-[#7A7870] block mb-1">Specific Styling Notes or Fit Desires</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details about the occasion, preferred silhouettes, or specific runway pieces..."
                  className="w-full bg-[#EFECE5] dark:bg-[#1A1C24] px-3 py-2.5 rounded border border-[#DDD8CE] dark:border-[#2C2E38] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#121316] hover:bg-[#C5A880] text-white hover:text-black py-3.5 rounded text-xs font-mono uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Confirm Private Appointment Request</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
