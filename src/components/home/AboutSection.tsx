import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <div className="py-8 sm:py-12 bg-white w-full overflow-hidden">
      <div className="px-4 md:px-8 lg:px-12 max-w-full mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8" data-animate>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-brown">Discover Natural Hair Care</h2>
          <p className="text-brand-orange">Learn more about our brand</p>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"> {/* Змінено відступи між колонками */}
    {/* Ліва колонка */}
    <div className="space-y-6">
      <div className="flex gap-4 items-start">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden flex-shrink-0">
          <img src="/_DSC8533.jpg" alt="Natural ingredients" className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-semibold text-base sm:text-lg text-left">The Benefits of Natural Ingredients</h3>
          <p className="text-gray-600 text-sm sm:text-base text-left">
            Our products are made with organic ingredients to nourish your hair.
          </p>
        </div>
      </div>

      <div className="flex gap-4 items-start">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden flex-shrink-0">
          <img src="/image container.jpg" alt="Key ingredients" className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-semibold text-base sm:text-lg text-left">Key Ingredients for Hair Health</h3>
          <p className="text-gray-600 text-sm sm:text-base text-left">
            Learn about the essential oils and extracts that make our products effective.
          </p>
        </div>
      </div>
    </div>

    {/* Права колонка */}
    <div className="space-y-6 mt-0 md:mt-0"> {/* Видалено зайвий відступ */}
      <div className="flex gap-4 items-start">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden flex-shrink-0">
          <img src="/image 2.jpg" alt="Brand founder" className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-semibold text-base sm:text-lg text-left">Developed by Professionals</h3>
          <p className="text-gray-600 text-sm sm:text-base text-left">
            Find out more about brand founder with 25 years of experience in the industry.
          </p>
        </div>
      </div>

      <div className="flex gap-4 items-start">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden flex-shrink-0">
          <img src="/image 11.jpg" alt="Expert advice" className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="font-semibold text-base sm:text-lg text-left">Expert Advice on Hair Care</h3>
          <p className="text-gray-600 text-sm sm:text-base text-left">
            Free consultation from our professionals on how to maintain healthy hair.
          </p>
          <Link to="/about" className="text-brand-orange hover:underline text-sm sm:text-base mt-1 inline-block">
            Learn more
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
  );
};

export default AboutSection;
