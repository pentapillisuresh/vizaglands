import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onClose }) => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = await signIn(email, password);

      if (error) {
        setError(error.message);
      } else if (data?.user) {
        // ✅ successful login
        if (onClose) onClose();
        navigate('/select-user-type'); // ✅ navigate after login
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side Image */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/hand-is-holding-phone-with-blue-key-middle-screen_783884-278760.jpg?w=1060')",
        }}
      >
        <div className="bg-black bg-opacity-40 flex flex-col justify-center items-center w-full h-full text-white text-center p-10">
          <h2 className="text-4xl font-bold mb-4">Welcome to VizagLands</h2>
          <p className="text-lg text-gray-200 max-w-md">
            Find your dream property with the most trusted real estate platform in Vizag.
          </p>
        </div>
      </div>

      {/* Right Side Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6 md:p-16">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-blue-900 mb-2 text-center">Welcome Back</h2>
          <p className="text-gray-600 text-center">
            Sign in to continue to your VizagLands account
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/select-user-type')}
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              Register now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
