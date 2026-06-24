import React from 'react';
import { Newspaper } from 'lucide-react';

export const NewsImageFallback: React.FC = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-aquabion-oil to-aquabion-deep flex items-center justify-center">
      <div className="text-center">
        <Newspaper className="w-16 h-16 text-aquabion-cyan mx-auto mb-2" />
        <p className="text-aquabion-ice text-sm font-medium">Aquabion News</p>
      </div>
    </div>
  );
};

export default NewsImageFallback;
