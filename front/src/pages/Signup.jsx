import { useState } from "react";
import API from "../services/api";
import ReCAPTCHA from "react-google-recaptcha";
function Signup(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captchaToken, setCaptchaToken] = useState("");


    const handleCaptcha = (value) => {
        setCaptchaToken(value); // Token généré par Google
      };
    

      const handleSignup = async (e) => {
        e.preventDefault();
    
        if (!captchaToken) {
          return alert("Veuillez valider le CAPTCHA");
        }
    
        try {
          await API.post("/api/auth/users", {
            username,
            email,
            password,
            captchaToken, // <<< ON L'ENVOIE AU SERVEUR
          });
    
          alert("Utilisateur créé avec succès !");
          setUsername("");
          setEmail("");
          setPassword("");
          setCaptchaToken("");
        } catch (error) {
          console.error(error);
          alert("Erreur lors de l'inscription");
        }
      };

      return (
        <div>
          <h2>Inscription</h2>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
    
            {/* Google CAPTCHA ici */}
            <ReCAPTCHA
              sitekey="6LfcMygrAAAAAMYOpaSxjMP_ld9_5Dz87WxBZQyY"
              onChange={handleCaptcha}
            />
    
            <button type="submit">S'inscrire</button>
          </form>
        </div>
      );
    }
    
    export default Signup;