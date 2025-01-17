import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const AmazonCartButton = ({ components, affiliateId = 'your-affiliate-id', marketplaceId = 'com' }) => {
  const generateAmazonCart = (components, affiliateId, marketplaceId) => {
    const baseUrl = `https://www.amazon.${marketplaceId}/gp/aws/cart/add.html`;
    
    const validComponents = Object.values(components).filter(component => component?.asin);
    
    const itemParams = validComponents.map((component, index) => (
      `ASIN.${index + 1}=${component.asin}&Quantity.${index + 1}=1`
    ));
    
    const affiliateParam = `&AssociateTag=${affiliateId}`;
    const queryString = itemParams.join('&') + affiliateParam;
    
    return `${baseUrl}?${queryString}`;
  };

  const handleCreateCart = () => {
    if (!Object.values(components).some(component => component?.asin)) {
      alert('Please select at least one component before creating a cart');
      return;
    }

    const cartUrl = generateAmazonCart(components, affiliateId, marketplaceId);
    window.open(cartUrl, '_blank');
  };

  return (
    <Button
      onClick={handleCreateCart}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
    >
      <ShoppingCart className="w-4 h-4" />
      Add to Amazon Cart
    </Button>
  );
};

export default AmazonCartButton;