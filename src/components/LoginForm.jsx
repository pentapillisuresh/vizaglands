import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const LoginForm = ({ onSwitchToRegister, onClose }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) throw error;

      onClose();
      navigate('/select-user-type'); // ✅ Redirect after login
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-blue-900 mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-600">
          Sign in to continue to your account
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
        <p className="font-semibold mb-2">Demo Credentials:</p>
        <p>Owner: owner@vizaglands.com / owner123</p>
        <p>Buyer: buyer@vizaglands.com / buyer123</p>
      </div>

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
            <input type="checkbox" className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500" />
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
          onClick={onSwitchToRegister}
          className="text-orange-500 hover:text-orange-600 font-medium"
        >
          Register now
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
