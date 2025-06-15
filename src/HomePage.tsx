import { db } from './firebase';
import { ref, push, onValue } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Facebook, 
  Instagram, 
  Youtube,
  Star,
  ChevronDown,
  Menu,
  X,
  Play,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const galleryImages = [
  { src: '/gallery/gallery3.png', caption: '' },
  { src: '/gallery/gallery4.png', caption: '' },
];

const faqData = [
  {
    question: "What is Samarthya Dhol Tasha Pathak?",
    answer: "It is a traditional Dhol Tasha group promoting cultural heritage through music and performances."
  },
  {
    question: "How can I join the group?",
    answer: "Click on the Admission link in the menu to apply. We welcome enthusiasts of all ages."
  },
  {
    question: "Where are the practice sessions held?",
    answer: "Practice sessions are held in Dombivli every weekend from 6 AM to 8 AM."
  }
];

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [reviews, setReviews] = useState([
    { name: "Rahul Patil", rating: 5, comment: "Amazing experience! The energy and passion is infectious." },
    { name: "Priya Sharma", rating: 5, comment: "Beautiful cultural preservation. My kids love the performances." },
    { name: "Amit Kumar", rating: 4, comment: "Great community involvement and traditional music." }
  ]);
  const [newReview, setNewReview] = useState({ name: '', rating: '', comment: '' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Carousel auto-slide effect
  useEffect(() => {
  const reviewsRef = ref(db, 'reviews');
  onValue(reviewsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const all = Object.values(data);
      setReviews(all.reverse());  // newest first
    }
  });
  }, []);


  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleSubmit = () => {
   if (newReview.name && newReview.rating && newReview.comment) {
     const review = { 
       ...newReview, 
       rating: parseInt(newReview.rating) 
     };
    
     push(ref(db, 'reviews'), review);
    
     setNewReview({ 
       name: '', 
       rating: '', 
       comment: '' 
     });
    }
  };



  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 text-red-900 font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg border-b-4 border-orange-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
             <img src="/logo.png" alt="Samarthya Logo" className="h-16 md:h-18" />
            
            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-8 text-lg font-medium">
              <li><a href="#home" className="hover:text-orange-600 transition-colors">Home</a></li>
              <li><a href="https://www.youtube.com/watch?v=tsOZfSIPkFU&list=PLvM5NEYt_7qIR8pC6MLA-8WVOVYKfXJO3" target="_blank" className="hover:text-orange-600 transition-colors">Videos</a></li>
              <li><a href="#about" className="hover:text-orange-600 transition-colors">About us</a></li>
              <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSfAvzvcJLkDq_qr-ThM_DQ5i6JGoUX1yFr0ipMDfh9a2COJrA/viewform" target="_blank" className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition-colors">Admission</a></li>
              <li><a href="#contact" className="hover:text-orange-600 transition-colors">Contact us</a></li>
            </ul>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4">
              <ul className="space-y-3 text-lg">
                <li><a href="#home" className="block hover:text-orange-600 transition-colors">Home</a></li>
                <li><a href="https://www.youtube.com/watch?v=tsOZfSIPkFU&list=PLvM5NEYt_7qIR8pC6MLA-8WVOVYKfXJO3" target="_blank" className="block hover:text-orange-600 transition-colors">Videos</a></li>
                <li><a href="#about" className="block hover:text-orange-600 transition-colors">About us</a></li>
                <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSfAvzvcJLkDq_qr-ThM_DQ5i6JGoUX1yFr0ipMDfh9a2COJrA/viewform" target="_blank" className="block bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition-colors text-center">Admission</a></li>
                <li><a href="#contact" className="block hover:text-orange-600 transition-colors">Contact us</a></li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-red-600/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200')"
          }}
        ></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-4 animate-pulse">
              ॥ सामर्थ्य ॥
            </h2>
            <h3 className="text-2xl md:text-4xl font-semibold text-red-800 mb-6">
              ढोल ताशा ध्वज पथक
            </h3>
            <p className="text-lg md:text-xl text-red-700 max-w-2xl mx-auto leading-relaxed">
              Preserving the rich cultural heritage of Maharashtra through the rhythmic beats of traditional Dhol Tasha
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://www.youtube.com/watch?v=tsOZfSIPkFU&list=PLvM5NEYt_7qIR8pC6MLA-8WVOVYKfXJO3" 
              target="_blank"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Play className="w-5 h-5" />
              Watch Performances
            </a>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSfAvzvcJLkDq_qr-ThM_DQ5i6JGoUX1yFr0ipMDfh9a2COJrA/viewform" 
              target="_blank"
              className="inline-flex items-center bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Join Our Group
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Carousel Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-red-800">Our Gallery</h3>
          
          {/* Main Carousel */}
          <div className="relative max-w-4xl mx-auto mb-8">
            <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                >
                  <img 
                    src={img.src} 
                    alt={img.caption} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                    <div className="absolute bottom-8 left-8 right-8">
                      <h4 className="text-white text-2xl md:text-3xl font-bold mb-2">
                        {img.caption}
                      </h4>
                      <div className="w-20 h-1 bg-orange-500 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
              {galleryImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentSlide 
                      ? 'bg-orange-500 scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex justify-center gap-4 px-4 overflow-x-auto">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                  idx === currentSlide 
                    ? 'ring-4 ring-orange-500 scale-110' 
                    : 'opacity-70 hover:opacity-100 hover:scale-105'
                }`}
              >
                <img 
                  src={img.src} 
                  alt={img.caption} 
                  className="w-full h-full object-cover" 
                />
              </button>
            ))}
          </div>
        </div>
      </section>
      <div className="text-center mt-12">
        <a 
          href="https://drive.google.com/drive/folders/18uRLOWRtoJk-Q7o5-WYMGiM-Lszf4Z_g" 
          target="_blank"
          className="inline-block bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-700 transition-colors duration-300"
        >
         See More Photos
        </a>
      </div>


      {/* About Us Section */}
      <section id="about" className="py-16 px-4 bg-white text-red-900">
        <div className="max-w-5xl mx-auto text-center"
         data-aos="fade-up">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-red-800">About Us</h3>
          <p className="text-lg md:text-xl leading-relaxed">
            <strong>Samarthya Dhol Tasha Pathak</strong> is a passionate group of artists from Dombivli
            dedicated to preserving Maharashtra's cultural heritage through the powerful rhythms of 
            <em> Dhol, Tasha, and Dhwaj</em>. Our performances celebrate festivals, lead rallies, and bring people together.
            We believe in fostering unity, discipline, and pride in tradition for all age groups.
          </p>
        </div>
      </section>


      {/* Reviews Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">Community Reviews</h3>
          
          {/* Review Form */}
          <div className="mb-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8">
            <h4 className="text-xl font-semibold mb-6 text-center">Share Your Experience</h4>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input 
                className="bg-white/20 border border-white/30 px-4 py-3 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50" 
                type="text" 
                placeholder="Your name" 
                value={newReview.name} 
                onChange={e => setNewReview({ ...newReview, name: e.target.value })} 
              />
              <select 
                className="bg-white/20 border border-white/30 px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50" 
                value={newReview.rating} 
                onChange={e => setNewReview({ ...newReview, rating: e.target.value })}
              >
                <option value="" className="text-black">Select Rating</option>
                <option value="5" className="text-black">⭐⭐⭐⭐⭐ Excellent</option>
                <option value="4" className="text-black">⭐⭐⭐⭐ Good</option>
                <option value="3" className="text-black">⭐⭐⭐ Average</option>
                <option value="2" className="text-black">⭐⭐ Below Average</option>
                <option value="1" className="text-black">⭐ Poor</option>
              </select>
            </div>
            <textarea 
              className="bg-white/20 border border-white/30 px-4 py-3 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 w-full mb-4" 
              rows="4"
              placeholder="Your comment" 
              value={newReview.comment} 
              onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
            ></textarea>
            <button 
              className="w-full bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors" 
              onClick={handleSubmit}
            >
              Submit Review
            </button>
          </div>

          {/* Reviews Display */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-lg">{review.name}</h4>
                  <div className="flex gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-white/90 text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-red-800">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button 
                  onClick={() => toggleFAQ(index)} 
                  className="w-full text-left p-6 font-semibold text-lg flex justify-between items-center hover:bg-orange-50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                  <p className="px-6 pb-6 text-red-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gradient-to-r from-red-800 to-red-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-2xl font-bold mb-6">Follow Us</h4>
              <div className="flex gap-6 text-2xl mb-6">
                <a href="https://www.facebook.com/samarthyadombivli" target="_blank" className="hover:text-orange-300 transition-colors transform hover:scale-110">
                  <Facebook />
                </a>
                <a href="https://www.instagram.com/samarthya_vadyapathak" target="_blank" className="hover:text-orange-300 transition-colors transform hover:scale-110">
                  <Instagram />
                </a>
                <a href="https://www.youtube.com/@SamarthyaVadyaPathak" target="_blank" className="hover:text-orange-300 transition-colors transform hover:scale-110">
                  <Youtube />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-2xl font-bold mb-6">Contact Information</h4>
              <div className="space-y-3">
                <p className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-orange-300" />
                  Dombivli, Maharashtra
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-300" />
                  contact@samarthya.com
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-300" />
                  +91 98765 43210
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-red-700 pt-8 text-center">
            <p className="text-red-200">© 2024 Samarthya Dhol Tasha Pathak. Preserving traditions, creating memories.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}