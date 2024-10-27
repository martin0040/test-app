import { signIn } from 'next-auth/react';
import { useState } from 'react';

const AuthForm = ({ isSignUp }: { isSignUp: boolean }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
    } else {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        console.log('Sign-in error:', result.error);
      } else {
        console.log('Signed in successfully!');
        // Redirect or perform other actions after sign-in
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </button>
    </form>
  );
};

export default AuthForm;
