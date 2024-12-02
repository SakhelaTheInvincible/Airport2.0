import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app'; // Import AppProps type

const App = ({ Component, pageProps }: AppProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="/">Homepage</a></li>
            {isAuthenticated ? (
              <>
                <li><a href="/profile">Profile</a></li>
                <li><button onClick={handleLogout}>Logout</button></li>
                <li><a href="/admin/tickets">Tickets</a></li>
              </>
            ) : (
              <>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
};

export default App;
