import { LoginForm } from '@/components/login-form';
import './App.css';

function App() {
  const handleLogin = async (username: string, password: string) => {
    // TODO: 接入真实登录接口
    console.log('登录:', { username, password });
    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  return (
    <main className="flex min-h-[320px] w-[360px] items-center justify-center bg-background p-4">
      <LoginForm onLogin={handleLogin} />
    </main>
  );
}

export default App;
