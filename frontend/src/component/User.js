import React, {useState} from 'react'

const User = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `/user/${username}/${password}`;
    fetch(url, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.username) {
          setUser(data.username);
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Movie Recommendation System</h1>
      {error && (
        <p className="mb-4 text-red-700 bg-red-100 border border-red-300 rounded px-4 py-2 text-center font-semibold shadow">
          Wrong Password
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input 
            type="text" 
            id="username"
            value={username}
            placeholder="example@gmail.com"
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1 px-3"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            id="password"
            value={password}
            placeholder="123456"
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1 px-3"
          />
        </div>
        <button 
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign Up / Log In
        </button>
      </form>
    </div>
  )
}

export default User