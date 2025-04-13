
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Smartphone } from 'lucide-react';
import MobileApp from '@/components/mobile/MobileApp';

const MobileAppPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-6">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại Dashboard
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Ứng dụng di động</h1>
          </div>
          <div>
            <Button className="bg-brand-blue hover:bg-brand-blue/90">
              <Download className="h-4 w-4 mr-2" />
              Tải ứng dụng
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <MobileApp />
      </main>
    </div>
  );
};

export default MobileAppPage;
