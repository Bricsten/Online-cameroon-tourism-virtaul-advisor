import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SignInForm from '../components/auth/SignInForm';
import SignUpForm from '../components/auth/SignUpForm';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-xl p-8"
          >
            <Link to="/" className="block mb-8">
              <h1 className="text-2xl font-bold text-center">
                <span className="text-primary-500">Cam</span>
                <span className="text-secondary-500">TourVisor</span>
              </h1>
            </Link>

            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-lg bg-neutral-100 p-1">
                <button
                  onClick={() => setMode('signin')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    mode === 'signin'
                      ? 'bg-white text-primary-500 shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setMode('signup')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    mode === 'signup'
                      ? 'bg-white text-primary-500 shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {mode === 'signin' ? <SignInForm /> : <SignUpForm />}

            <p className="mt-6 text-center text-sm text-neutral-600">
              {mode === 'signin' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setMode('signup')}
                    className="text-primary-500 hover:text-primary-600 font-medium"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    onClick={() => setMode('signin')}
                    className="text-primary-500 hover:text-primary-600 font-medium"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;