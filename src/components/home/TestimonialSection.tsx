
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "AffiliateVN đã giúp tôi tăng doanh thu gấp 3 lần chỉ sau 2 tháng. Công cụ AI giúp tôi tạo nội dung phù hợp và tự động điều chỉnh chiến dịch để tối ưu kết quả.",
    author: "Nguyễn Văn A",
    role: "Tiếp thị liên kết toàn thời gian",
    avatar: "https://placehold.co/100x100?text=A",
    rating: 5,
  },
  {
    id: 2,
    content: "Tôi đặc biệt ấn tượng với công cụ phân tích xu hướng AI. Nó giúp tôi biết trước sản phẩm nào sẽ bán chạy trong mùa mua sắm, giúp tôi chuẩn bị chiến dịch sớm hơn đối thủ.",
    author: "Trần Thị B",
    role: "Affiliate Marketer & Blogger",
    avatar: "https://placehold.co/100x100?text=B",
    rating: 5,
  },
  {
    id: 3,
    content: "Ban đầu tôi hoài nghi về AI trong tiếp thị liên kết, nhưng AffiliateVN đã chứng minh tôi sai. Công nghệ của họ thực sự hiểu thị trường Việt Nam và tạo ra nội dung phù hợp.",
    author: "Lê Văn C",
    role: "YouTuber & Affiliate Marketer",
    avatar: "https://placehold.co/100x100?text=C",
    rating: 4,
  },
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Câu Chuyện <span className="text-brand-purple">Thành Công</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hơn 10,000 Affiliate Marketer đã gia tăng doanh thu với nền tảng của chúng tôi. Đây là những gì họ nói.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="absolute top-0 left-0 -mt-4 -ml-4">
              <svg width="40" height="40" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.5 22.5H4.5V4.5H22.5V22.5ZM49.5 22.5H31.5V4.5H49.5V22.5ZM22.5 49.5H4.5V31.5H22.5V49.5ZM49.5 49.5H31.5V31.5H49.5V49.5Z" fill="#8B5CF6" fillOpacity="0.1"/>
              </svg>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={testimonials[activeIndex].avatar} 
                  alt={testimonials[activeIndex].author} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonials[activeIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>

                <blockquote className="text-lg md:text-xl mb-6 italic text-gray-700">
                  "{testimonials[activeIndex].content}"
                </blockquote>

                <div>
                  <h4 className="font-semibold">{testimonials[activeIndex].author}</h4>
                  <p className="text-gray-600 text-sm">{testimonials[activeIndex].role}</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 flex gap-2">
              <button 
                onClick={prevTestimonial}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full mx-1 ${
                  index === activeIndex ? 'bg-brand-purple' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
