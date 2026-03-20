import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import StepIndicator from '../components/StepIndicator';
import BasicDetails from '../components/property-steps/BasicDetails';
import LocationDetails from '../components/property-steps/LocationDetails';
import PropertyProfile from '../components/property-steps/PropertyProfile';
import PhotosVideos from '../components/property-steps/PhotosVideos';
import PricingOthers from '../components/property-steps/PricingOthers';

const PostProperty = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Detect edit mode and get listing data
  const listing = location.state?.listing || null;
  const isEditMode = Boolean(listing);
  
  // ✅ State to track visited steps (for allowing navigation to previous steps)
  const [visitedSteps, setVisitedSteps] = useState([1]);
  
  const steps = [
    { number: 1, title: 'Basic Details', subtitle: 'Step 1' },
    { number: 2, title: 'Location Details', subtitle: 'Step 2' },
    { number: 3, title: 'Property Profile', subtitle: 'Step 3' },
    { number: 4, title: 'Photos, Videos & Voice-over', subtitle: 'Step 4' },
    { number: 5, title: 'Amenities', subtitle: 'Step 5' },
  ];

  // ✅ Updated structure to match backend model
  const [propertyData, setPropertyData] = useState({
    categoryId: '',
    propertyName: '',
    title: '',
    description: '', 
    propertySubtype:'',
    marketType: 'sale',
    propertyKind: 'residential',
    catType: 'Residential',
    price: '',
    photos: [],
    videos: "",
    audio: "",
    availableStatus:'Ready to Move',
    ageOfProperty:'',
    youtubeUrl: '',
    approvedBy:'',
    amenities: [],
    privateNotes: '', // ✅ Add this field
    projectName: '', // ✅ Add this field
    address: {
      city: '',
      locality: '',
      subLocality: '',
      apartmentDoorNo: '',
      near_by: [],
      road_facing: '',
      lat: '',
      lon: '',
    },
    propertyProfile: {
      type: "",
      bedrooms: 0,
      units:0,
      landArea: 0,
      plotArea: 0,
      poojaRooms: 0,
      bathrooms: 0,
      length: 0,
      breath: 0,
      balconies: 0,
      roadFacing: 0,
      plotAvailable: 0,
      facing: "East",
      carpetArea: 0,
      closedParking: 0,
      openParking: 0,
      parkingType: "",
      status: "",
      areaUnit: "sqft",
      buildArea: 0,
      superBuildArea: 0,
      shopNumber: "",
      frontage: "",
      roadWidth: "",
      pantryAvailable: false,
      washroomAvailable: false,
      cornerShop: false,
      powerBackup: false,
      waterSupply: "24x7",
      officeNumber: "",
      floorNumber: "",
      totalFloors: "",
      workstations: 0,
      cabins: 0,
      conferenceRooms: 0,
      furnishedStatus: "furnished",
      acAvailable: false,
      liftAvailable: false,
      parkingSpaces: 0,
      securityAvailable: false
    },
  });

  // ✅ If editing, prefill property data and mark all steps as visited
  useEffect(() => {
    if (isEditMode && listing) {
      setPropertyData((prev) => ({
        ...prev,
        ...listing,
        address: {
          ...prev.address,
          ...listing.address,
        },
        propertyProfile: {
          ...prev.propertyProfile,
          ...listing.profile,
        },
      }));
      
      // ✅ In edit mode, mark all steps as visited to allow free navigation
      setVisitedSteps([1, 2, 3, 4, 5]);
    }
  }, [isEditMode, listing]);

  // ✅ Track visited steps when currentStep changes (only for new property mode)
  useEffect(() => {
    // Only track visited steps in new property mode
    if (!isEditMode && !visitedSteps.includes(currentStep)) {
      setVisitedSteps([...visitedSteps, currentStep]);
    }
  }, [currentStep, isEditMode]);

  // ✅ Handle step navigation from StepIndicator
  const handleStepClick = (stepNumber) => {
    // Different behavior for edit mode vs new property mode
    let isStepClickable = false;
    
    if (isEditMode) {
      // ✅ In edit mode, ALL steps are clickable (no restrictions)
      isStepClickable = true;
    } else {
      // ✅ In new property mode, enforce sequential flow
      isStepClickable = (
        stepNumber <= currentStep || // Allow going back to any previous step
        visitedSteps.includes(stepNumber) || // Allow going to any visited step
        stepNumber === currentStep + 1 // Allow going to next step from current
      );
    }

    if (isStepClickable) {
      setCurrentStep(stepNumber);
      
      // In new property mode, add step to visited if not already
      if (!isEditMode && !visitedSteps.includes(stepNumber)) {
        setVisitedSteps([...visitedSteps, stepNumber]);
      }
    }
  };

  // ✅ Merge partial updates from child components
  const updatePropertyData = (data) => {
    setPropertyData((prev) => ({
      ...prev,
      ...data,
      address: {
        ...prev.address,
        ...(data.address || {}),
      },
      propertyProfile: {
        ...prev.propertyProfile,
        ...(data.propertyProfile || {}),
      },
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      // Add next step to visited steps when moving forward (only for new property mode)
      if (!isEditMode && !visitedSteps.includes(nextStep)) {
        setVisitedSteps([...visitedSteps, nextStep]);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  // ✅ COMPLETELY REWRITTEN: Enhanced property completeness score to reach 100%
  const calculateScore = () => {
    const p = propertyData;
    let score = 0;
    
    // ========== STEP 1: Basic Details (20 points) ==========
    // Property title (5 points)
    if (p.title && p.title.trim().length >= 5) score += 5;
    else if (p.title && p.title.trim().length > 0) score += 2;
    
    // Market type (5 points)
    if (p.marketType && p.marketType !== '') score += 5;
    
    // Property kind (5 points)
    if (p.propertyKind && p.propertyKind !== '') score += 5;
    
    // Property subtype (5 points)
    if (p.propertySubtype && p.propertySubtype !== '') score += 5;
    
    // ========== STEP 2: Location Details (20 points) ==========
    // City (8 points)
    if (p.address.city && p.address.city.trim() !== '') score += 8;
    
    // Locality (8 points)
    if (p.address.locality && p.address.locality.trim() !== '') score += 8;
    
    // Road facing (4 points)
    if (p.address.road_facing && p.address.road_facing !== '' && parseInt(p.address.road_facing) > 0) score += 4;
    
    // ========== STEP 3: Property Profile (25 points) ==========
    const isPlotOrLand = p.propertySubtype === 'Plot' || p.propertySubtype === 'Land';
    
    if (isPlotOrLand) {
      // Price (8 points)
      if (p.price && p.price !== '' && parseFloat(p.price) > 0) score += 8;
      
      // Area (Plot Area or Land Area) (7 points)
      if ((p.propertyProfile.plotArea > 0) || (p.propertyProfile.landArea > 0)) score += 7;
      
      // Facing or Frontage (5 points)
      if (p.propertyProfile.facing && p.propertyProfile.facing !== '') score += 5;
      else if (p.propertyProfile.frontage && p.propertyProfile.frontage !== '') score += 5;
      
      // Length & Breadth (5 points)
      if (p.propertyProfile.length > 0 && p.propertyProfile.breath > 0) score += 5;
    } else {
      // Price (6 points)
      if (p.price && p.price !== '' && parseFloat(p.price) > 0) score += 6;
      
      // Bedrooms (4 points)
      if (p.propertyProfile.bedrooms > 0) score += 4;
      
      // Bathrooms (4 points)
      if (p.propertyProfile.bathrooms > 0) score += 4;
      
      // Area (Carpet/Built/Super Built) (6 points)
      if (p.propertyProfile.carpetArea > 0 || p.propertyProfile.buildArea > 0 || p.propertyProfile.superBuildArea > 0) score += 6;
      
      // Parking (3 points)
      if (p.propertyProfile.closedParking > 0 || p.propertyProfile.openParking > 0) score += 3;
      
      // Status (2 points)
      if (p.availableStatus && p.availableStatus !== '') score += 2;
    }
    
    // ========== STEP 4: Photos & Videos (15 points) ==========
    // Photos (10 points)
    if (p.photos && p.photos.length > 0) {
      score += 8;
      // Bonus for multiple photos
      if (p.photos.length >= 3) score += 2;
    }
    
    // Videos (3 points)
    if (p.videos && p.videos.trim() !== '') score += 3;
    
    // Audio (2 points)
    if (p.audio && p.audio.trim() !== '') score += 2;
    
    // ========== STEP 5: Amenities & Other Details (20 points) ==========
    // Description (8 points)
    if (p.description && p.description.trim().length >= 10) {
      score += 8;
    } else if (p.description && p.description.trim().length > 0) {
      score += 3;
    }
    
    // Amenities (6 points)
    if (p.amenities && p.amenities.length > 0) {
      score += 4;
      // Bonus for multiple amenities
      if (p.amenities.length >= 3) score += 2;
    }
    
    // Approved By (3 points)
    if (p.approvedBy && p.approvedBy.trim() !== '' && p.approvedBy !== 'null') {
      score += 3;
    }
    
    // Private Notes (2 points)
    if (p.privateNotes && p.privateNotes.trim().length > 0) {
      score += 1;
    }
    
    // Project Name (1 point)
    if (p.projectName && p.projectName.trim().length > 0) {
      score += 1;
    }
    
    // Ensure score doesn't exceed 100 and round to nearest integer
    const finalScore = Math.min(Math.round(score), 100);
    
    // Debug log to see what's missing
    if (finalScore < 100) {
      console.log('=== SCORE BREAKDOWN ===');
      console.log('Step 1 - Title:', p.title?.length >= 5 ? 5 : (p.title?.length > 0 ? 2 : 0));
      console.log('Step 1 - Market Type:', p.marketType ? 5 : 0);
      console.log('Step 1 - Property Kind:', p.propertyKind ? 5 : 0);
      console.log('Step 1 - Subtype:', p.propertySubtype ? 5 : 0);
      console.log('Step 2 - City:', p.address.city ? 8 : 0);
      console.log('Step 2 - Locality:', p.address.locality ? 8 : 0);
      console.log('Step 2 - Road Facing:', p.address.road_facing ? 4 : 0);
      console.log('Step 3 - Price:', p.price ? (isPlotOrLand ? 8 : 6) : 0);
      console.log('Step 3 - Area:', isPlotOrLand ? 
        ((p.propertyProfile.plotArea > 0 || p.propertyProfile.landArea > 0) ? 7 : 0) :
        ((p.propertyProfile.carpetArea > 0 || p.propertyProfile.buildArea > 0 || p.propertyProfile.superBuildArea > 0) ? 6 : 0));
      console.log('Step 4 - Photos:', p.photos?.length > 0 ? (p.photos.length >= 3 ? 10 : 8) : 0);
      console.log('Step 4 - Videos:', p.videos ? 3 : 0);
      console.log('Step 5 - Description:', p.description?.length >= 10 ? 8 : (p.description?.length > 0 ? 3 : 0));
      console.log('Step 5 - Amenities:', p.amenities?.length > 0 ? (p.amenities.length >= 3 ? 6 : 4) : 0);
      console.log('Step 5 - Approved By:', p.approvedBy && p.approvedBy !== 'null' && p.approvedBy !== '' ? 3 : 0);
      console.log('Step 5 - Private Notes:', p.privateNotes ? 1 : 0);
      console.log('Step 5 - Project Name:', p.projectName ? 1 : 0);
      console.log('Total Score:', finalScore);
      console.log('Missing fields to reach 100%');
    }
    
    return finalScore;
  };

  // ✅ Add effect to auto-mark step 5 as visited when description is complete
  useEffect(() => {
    // Auto-mark step 5 as visited when description meets requirements (for new property mode)
    if (!isEditMode && propertyData.description && propertyData.description.trim().length >= 10) {
      if (!visitedSteps.includes(5)) {
        setVisitedSteps(prev => [...prev, 5]);
      }
    }
  }, [propertyData.description, isEditMode, visitedSteps]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Left Sidebar */}
          <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
            {/* Pass onStepClick handler to StepIndicator */}
            <StepIndicator 
              steps={steps} 
              currentStep={currentStep} 
              onStepClick={handleStepClick}
              visitedSteps={visitedSteps}
              isEditMode={isEditMode} // Pass edit mode to StepIndicator
            />

            {/* Property Score */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="8" fill="none" />
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
                isEditMode={isEditMode} 
              />
            )}
            {currentStep === 2 && (
              <LocationDetails 
                data={propertyData} 
                updateData={updatePropertyData} 
                onNext={handleNext} 
                isEditMode={isEditMode} 
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
                isEditMode={isEditMode}
              />
            )}
            {currentStep === 5 && (
              <PricingOthers 
                data={propertyData} 
                updateData={updatePropertyData} 
                isEditMode={isEditMode} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostProperty;