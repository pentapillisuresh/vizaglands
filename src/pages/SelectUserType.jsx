import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Building2, User, Users } from 'lucide-react';

const SelectUserType = () => {
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, createUserProfile } = useAuth();

  const userTypes = [
    {
      id: 'owner',
      title: 'Owner',
      description: 'I own the property',
      icon: User,
    },
    {
      id: 'agent',
      title: 'Agent',
      description: 'I am a real estate agent',
      icon: Users,
    },
    {
      id: 'builder',
      title: 'Builder',
      description: 'I am a builder/developer',
      icon: Building2,
    },
  ];

  const handleContinue = async () => {
    if (!selectedType) return;

    setLoading(true);
    try {
      const pendingData = JSON.parse(sessionStorage.getItem('pendingRegistration') || '{}');

      await createUserProfile(
        user.id,
        user.email,
        selectedType,
        pendingData.fullName || user.fullName || '',
        pendingData.phone || user.phone || ''
      );

      sessionStorage.removeItem('pendingRegistration');
      navigate('/post-property');
    } catch (error) {
      console.error('Error creating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-blue-900 mb-4">
            Tell us about yourself
          </h1>
          <p className="font-roboto text-xl text-gray-600">
            Select your role to get started
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {userTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
                  selectedType === type.id
                    ? 'border-orange-500 bg-orange-50 shadow-lg scale-105'
                    : 'border-gray-200 bg-white hover:border-orange-300 hover:shadow-md'
                }`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center ${
                      selectedType === type.id
                        ? 'bg-orange-500 text-white'
                        : 'bg-blue-100 text-blue-900'
                    }`}
                  >
                    <Icon className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-blue-900 mb-2">
                      {type.title}
                    </h3>
                    <p className="font-roboto text-gray-600">{type.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedType || loading}
            className="bg-orange-500 hover:bg-orange-600 text-white font-roboto font-medium px-12 py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? 'Please wait...' : 'Continue'}
          </button>
        </div>

        {selectedType && (
          <div className="mt-8 text-center">
            <div className="inline-block bg-blue-50 border border-blue-200 rounded-lg px-6 py-4">
              <p className="font-roboto text-blue-900">
                <span className="font-medium">Selected:</span> {userTypes.find(t => t.id === selectedType)?.title}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectUserType;
