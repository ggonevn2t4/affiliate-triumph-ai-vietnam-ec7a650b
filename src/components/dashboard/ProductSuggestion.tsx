
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ExternalLink, ArrowRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  commission: string;
  conversionRate: string;
  potentialScore: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Smartphone Galaxy S23",
    category: "Điện thoại",
    commission: "4.5% (1.350.000đ)",
    conversionRate: "3.2%",
    potentialScore: 95,
    image: "https://placehold.co/100?text=Phone"
  },
  {
    id: 2,
    name: "Laptop Gaming Acer Nitro 5",
    category: "Laptop",
    commission: "2.8% (840.000đ)",
    conversionRate: "2.7%",
    potentialScore: 92,
    image: "https://placehold.co/100?text=Laptop"
  },
  {
    id: 3,
    name: "Robot hút bụi thông minh",
    category: "Điện gia dụng",
    commission: "7.2% (720.000đ)",
    conversionRate: "4.1%",
    potentialScore: 89,
    image: "https://placehold.co/100?text=Robot"
  },
  {
    id: 4,
    name: "Khóa học Digital Marketing",
    category: "Giáo dục",
    commission: "25% (1.250.000đ)",
    conversionRate: "5.8%",
    potentialScore: 94,
    image: "https://placehold.co/100?text=Course"
  },
  {
    id: 5,
    name: "Nước tẩy trang cao cấp",
    category: "Mỹ phẩm",
    commission: "12% (180.000đ)",
    conversionRate: "7.5%",
    potentialScore: 90,
    image: "https://placehold.co/100?text=Beauty"
  }
];

const ProductSuggestion = () => {
  const [displayCount, setDisplayCount] = useState(3);

  const handleShowMore = () => {
    setDisplayCount(Math.min(products.length, displayCount + 3));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Sản phẩm tiềm năng từ AI</h3>
        <div className="flex items-center text-brand-purple text-sm font-medium">
          <Sparkles className="w-4 h-4 mr-2" />
          <span>Được đề xuất dựa trên AI</span>
        </div>
      </div>

      <div className="space-y-4">
        {products.slice(0, displayCount).map((product) => (
          <div key={product.id} className="flex items-center p-3 border border-gray-100 rounded-lg hover:border-gray-200 transition-all duration-300">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="ml-4 flex-grow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h4 className="font-medium">{product.name}</h4>
                <span className="inline-flex items-center bg-green-50 text-green-700 text-xs px-2 py-1 rounded-md">
                  Tiềm năng {product.potentialScore}%
                </span>
              </div>
              <p className="text-gray-500 text-sm">{product.category}</p>
              <div className="flex flex-col sm:flex-row sm:items-center text-sm mt-1 gap-y-1 sm:gap-y-0">
                <span className="sm:mr-4">Hoa hồng: <span className="font-medium">{product.commission}</span></span>
                <span>Tỷ lệ chuyển đổi: <span className="font-medium">{product.conversionRate}</span></span>
              </div>
            </div>
            
            <a href="#" className="ml-2 p-2 rounded-full hover:bg-gray-100">
              <ExternalLink className="w-4 h-4 text-gray-500" />
            </a>
          </div>
        ))}
      </div>

      {displayCount < products.length && (
        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            className="text-brand-blue border-brand-blue hover:bg-brand-blue/5"
            onClick={handleShowMore}
          >
            Xem thêm sản phẩm
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductSuggestion;
