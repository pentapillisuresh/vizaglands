import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import StepIndicator from '../components/StepIndicator';
import BasicDetails from '../components/property-steps/BasicDetails';
import LocationDetails from '../components/property-steps/LocationDetails';
import PropertyProfile from '../components/property-steps/PropertyProfile';
import PhotosVideos from '../components/property-steps/PhotosVideos';
import PricingOthers from '../components/property-steps/PricingOthers';


const PostProperty = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [propertyData, setPropertyData] = useState({
    listingType: 'sell',
    propertyType: 'residential',
    propertySubtype: '',
    city: '',
    locality: '',
    subLocality: '',
    apartmentSociety: '',
    plotArea: '',
    plotAreaUnit: 'sq yards',
    length: '',
    breadth: '',
    facing: '',
    price: '',
    projectName: '',
    description: '',
    photos: [],
  });

  const navigate = useNavigate();

  const steps = [
    { number: 1, title: 'Basic Details', subtitle: 'Step 1' },
    { number: 2, title: 'Location Details', subtitle: 'Step 2' },
    { number: 3, title: 'Property Profile', subtitle: 'Step 3' },
    { number: 4, title: 'Photos, Videos & Voice-over', subtitle: 'Step 4' },
    { number: 5, title: 'Pricing & Others', subtitle: 'Step 5' },
  ];

  const updatePropertyData = (data) => {
    setPropertyData({ ...propertyData, ...data });
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const calculateScore = () => {
    if (propertyData.property_score) return propertyData.property_score; // use 100 if set
    let score = 0;
    if (propertyData.listingType) score += 10;
    if (propertyData.propertyType) score += 10;
    if (propertyData.propertySubtype) score += 12;
    if (propertyData.city) score += 12;
    if (propertyData.locality) score += 12;
    if (propertyData.plotArea) score += 12;
    if (propertyData.facing) score += 8;
    if (propertyData.price) score += 12;
    if (propertyData.description) score += 8;
    if (propertyData.photos.length > 0) score += 4;
    return score;
  };

  return (
    <>
  {/* <Header /> */}
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     

      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Left Sidebar - Steps */}
          <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
            <StepIndicator steps={steps} currentStep={currentStep} />

            {/* Property Score */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="36"
                      stroke="#f97316"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(calculateScore() / 100) * 226} 226`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-bold text-lg text-blue-900">{calculateScore()}%</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-blue-900">Property Score</h3>
                  <p className="font-roboto text-sm text-gray-600">
                    Better your property score, greater your visibility
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-900 mb-6 font-roboto"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            {currentStep === 1 && (
              <BasicDetails
                data={propertyData}
                updateData={updatePropertyData}
                onNext={handleNext}
              />
            )}
            {currentStep === 2 && (
              <LocationDetails
                data={propertyData}
                updateData={updatePropertyData}
                onNext={handleNext}
              />
            )}
            {currentStep === 3 && (
              <PropertyProfile
                data={propertyData}
                updateData={updatePropertyData}
                onNext={handleNext}
              />
            )}
            {currentStep === 4 && (
              <PhotosVideos
                data={propertyData}
                updateData={updatePropertyData}
                onNext={handleNext}
              />
            )}
            {currentStep === 5 && (
              <PricingOthers
                data={propertyData}
                updateData={updatePropertyData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  {/* <Footer /> */}
      </>
  );
};

export default PostProperty;
