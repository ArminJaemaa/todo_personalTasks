import { FormEvent, useState } from "react"
import BackButton from "../components/Tagasi"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {login} = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5265/api/Auth/login',{
        username, password
      });
      const recivedToken = response.data.token;
      localStorage.setItem('JwtToken', recivedToken);
      login(recivedToken); // update context
      navigate('/dashboard');
      
    } catch (err){
      setError('Invalid username or password')
      alert('Wrong username or password')
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
    </>
  )
}

export default Login