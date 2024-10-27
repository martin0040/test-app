import AuthForm from '../components/AuthForm';

const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl">Dashboard</h1>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl mb-4">Sign In</h1>
        <AuthForm isSignUp={false} />
        <h1 className="text-2xl mb-4">Sign Up</h1>
        <AuthForm isSignUp={true} />
      </div>
    </div>
  );
};

export default Home;

