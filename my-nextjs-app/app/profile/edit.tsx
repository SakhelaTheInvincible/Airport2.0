import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface EditProfilePageProps {
  user: User;
  errors: { [key: string]: string } | null;
}

const EditProfilePage = ({ user, errors }: EditProfilePageProps) => {
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessages, setErrorMessages] = useState(errors);
  const [token, setToken] = useState<string | null>(null); // Token state
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setToken(token);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return;

    const formData = {
      first_name: firstName,
      last_name: lastName,
      password: password,
      password_confirmation: passwordConfirmation,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessages(data.errors);
      } else {
        router.push('/profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Profile</h1>

      {errorMessages && Object.keys(errorMessages).length > 0 && (
        <div className="error-messages">
          <ul>
            {Object.values(errorMessages).map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errorMessages?.first_name && <span className="error">{errorMessages.first_name}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errorMessages?.last_name && <span className="error">{errorMessages.last_name}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">New Password (Leave blank if unchanged)</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessages?.password && <span className="error">{errorMessages.password}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="password_confirmation"
            name="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {
      user: {
        first_name: "",
        last_name: "",
        email: "",
      },
      errors: null,
    },
  };
};

export default EditProfilePage;
