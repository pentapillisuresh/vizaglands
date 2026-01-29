const StepIndicator = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="relative">
      {steps.map((step, index) => (
        <div key={step.number} className="relative pb-8 last:pb-0">
          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`absolute left-4 top-10 w-0.5 h-full ${
                currentStep > step.number ? 'bg-orange-500' : 'bg-gray-300'
              }`}
            />
          )}

          {/* Step Item - Make it clickable */}
          <div className="relative flex items-start space-x-4">
            {/* Step Number/Circle */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep === step.number
                  ? 'bg-orange-500 border-orange-500 text-white'
                  : currentStep > step.number
                  ? 'bg-orange-500 border-orange-500 text-white'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}
            >
              {currentStep > step.number ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className="text-sm font-medium">{step.number}</span>
              )}
            </div>

            {/* Step Content - Make the entire area clickable */}
            <button
              onClick={() => onStepClick(step.number)}
              disabled={currentStep < step.number}
              className={`text-left flex-1 min-w-0 focus:outline-none ${
                currentStep < step.number ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50 p-2 -ml-2 -mt-2 rounded-lg transition-colors'
              }`}
            >
              <h4
                className={`font-serif text-base font-semibold ${
                  currentStep === step.number ? 'text-blue-900' : 'text-gray-600'
                }`}
              >
                {step.title}
              </h4>
              <p className="font-roboto text-sm text-gray-500">{step.subtitle}</p>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;