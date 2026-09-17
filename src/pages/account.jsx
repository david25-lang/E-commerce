import { useEffect, useState } from "react";
import { Eye, EyeOff, LockKeyhole, MoveUpRight, Sparkles, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const initialForm = {
  name: "",
  email: "",
  password: "",
};

function Account() {
  const navigate = useNavigate();
  const hasSession = Boolean(localStorage.getItem("authToken"));
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignup = mode === "signup";

  useEffect(() => {
    if (hasSession) {
      navigate("/", { replace: true });
    }
  }, [hasSession, navigate]);

  if (hasSession) {
    return null;
  }

  function switchMode(nextMode) {
    setMode(nextMode);
    setForm(initialForm);
    setStatus({ type: "", message: "" });
  }

  function handleChange(event) {
    setForm((currentForm) => ({ ...currentForm, [event.target.name]: event.target.value }));
    setStatus({ type: "", message: "" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_URL}/auth/${isSignup ? "signup" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(isSignup ? { name: form.name.trim() } : {}),
          email: form.email.trim(),
          password: form.password,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to complete your request");
      }

      if (isSignup) {
        setMode("login");
        setForm({ ...initialForm, email: form.email.trim() });
        setStatus({ type: "success", message: "Account created. Please log in." });
        return;
      }

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authUser", JSON.stringify(data.user));
      window.dispatchEvent(new Event("auth-state-change"));
      navigate("/");
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="account-page">
      <section className="account-panel">
        <div className="account-intro">
          <p className="account-kicker"><Sparkles size={16} /> Your Davis_Gee space</p>
          <h1>Good things are better when they know your name.</h1>
          <p className="account-intro-copy">Keep your favourites close, move through checkout faster, and pick up where your next edit begins.</p>
          <div className="account-note">
            <div className="account-note-icon"><LockKeyhole size={18} /></div>
            <p>Your details stay yours. This demo account flow does not send your information anywhere.</p>
          </div>
        </div>

        <div className="account-form-wrap">
          <div className="account-tabs" role="tablist" aria-label="Account access">
            <button type="button" role="tab" aria-selected={!isSignup} onClick={() => switchMode("login")} className={!isSignup ? "account-tab active" : "account-tab"}>Log in</button>
            <button type="button" role="tab" aria-selected={isSignup} onClick={() => switchMode("signup")} className={isSignup ? "account-tab active" : "account-tab"}>Create account</button>
          </div>

          <div className="account-form-heading">
            <div className="account-avatar" aria-hidden="true"><UserRound size={22} /></div>
            <div>
              <p className="account-form-kicker">{isSignup ? "A little more you" : "Welcome back"}</p>
              <h2>{isSignup ? "Create your account" : "Sign in to your account"}</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="account-form">
            {isSignup && (
              <label>
                Full name
                <input name="name" value={form.name} onChange={handleChange} autoComplete="name" required placeholder="Your name" />
              </label>
            )}
            <label>
              Email address
              <input name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" required placeholder="you@example.com" />
            </label>
            <label>
              Password
              <span className="account-password-field">
                <input name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} autoComplete={isSignup ? "new-password" : "current-password"} minLength="6" required placeholder="At least 6 characters" />
                <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>

            {!isSignup && <button type="button" className="account-forgot">Forgot password?</button>}
            <button type="submit" className="account-submit" disabled={isSubmitting}>{isSubmitting ? "Please wait..." : (isSignup ? "Create account" : "Log in")} <MoveUpRight size={17} /></button>
            {status.message && <p className={status.type === "error" ? "account-error" : "account-success"} role={status.type === "error" ? "alert" : "status"}>{status.message}</p>}
          </form>

          <p className="account-switch">{isSignup ? "Already have an account?" : "New to Davis_Gee?"} <button type="button" onClick={() => switchMode(isSignup ? "login" : "signup")}>{isSignup ? "Log in" : "Create one"}</button></p>
          <p className="account-back"><Link to="/products">Continue browsing the collection</Link></p>
        </div>
      </section>
    </main>
  );
}

export default Account;