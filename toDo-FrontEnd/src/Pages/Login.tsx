import { FormEvent, useState } from "react"
import BackButton from "../Components/Tagasi"
import axios from "axios";

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5265/api/Auth/login',{
        username, password
      });
      const recivedToken = response.data.token;
      setToken(recivedToken);
      localStorage.setItem('JwtToken', recivedToken);
      alert('Login successful');
    } catch (err){
      setError('Invalid username or password')
      console.log(err);
    }
  };



  return (
    <>
      <BackButton/>
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Login</button>
      </form>
      {token && (
        <div className="mt-3 alert alert-success">
          Token received. You are logged in!
        </div>
      )}
    </>
  )
}

export default Login