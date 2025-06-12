import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Add this

const App = () => {
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  // Bot detection state
  const [mouseData, setMouseData] = useState([]);
  const [keyDelays, setKeyDelays] = useState([]);
  const [lastKeyTime, setLastKeyTime] = useState(null);
  const [startTime] = useState(Date.now());
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [tabCount, setTabCount] = useState(0);
  const [pasteDetected, setPasteDetected] = useState(0);
  const [focusSwitches, setFocusSwitches] = useState([]);
  const [idleTime, setIdleTime] = useState(0);
  const [honeypotFilled, setHoneypotFilled] = useState(0);
  const navigate = useNavigate(); // 👈 Hook to redirect


  // Bot detection logic (unchanged)
  useEffect(() => {
    let lastMouse = null;
    let totalDistance = 0;
    let idleStart = Date.now();

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (lastMouse) {
        const dx = e.clientX - lastMouse.x;
        const dy = e.clientY - lastMouse.y;
        const dt = now - lastMouse.time;
        const dist = Math.sqrt(dx * dx + dy * dy);
        totalDistance += dist;

        setMouseData((prev) => [...prev, dist / dt || 0]);
      }
      lastMouse = { x: e.clientX, y: e.clientY, time: now };
      idleStart = now;
    };

    const handleKeyDown = (e) => {
      const now = Date.now();
      if (lastKeyTime) setKeyDelays((prev) => [...prev, now - lastKeyTime]);
      setLastKeyTime(now);

      if (e.key === "Backspace") setBackspaceCount((prev) => prev + 1);
      if (e.key === "Tab") setTabCount((prev) => prev + 1);
    };

    const handlePaste = () => setPasteDetected(1);
    const handleFocus = () => setFocusSwitches((prev) => [...prev, Date.now()]);
    const handleBlur = () => {
      const now = Date.now();
      const idle = now - idleStart;
      if (idle > 1000) setIdleTime((prev) => prev + idle);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("paste", handlePaste);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("paste", handlePaste);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [lastKeyTime]);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!password.trim()) {
      newErrors.password = "Please enter your password";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    const timeToSubmit = Date.now() - startTime;

    const avgMouseSpeed =
      mouseData.length > 0
        ? mouseData.reduce((a, b) => a + b, 0) / mouseData.length
        : 0;

    const avgKeystrokeDelay =
      keyDelays.length > 0
        ? keyDelays.reduce((a, b) => a + b, 0) / keyDelays.length
        : 0;

    const features = [
      avgMouseSpeed, // mouse_avg_speed
      0.05, // mouse_path_deviation
      500, // hover_time_ms
      0, 0, // click_offset_x, click_offset_y
      mouseData.length > 3 ? 1 : 0, // moved_before_submit
      avgKeystrokeDelay, // avg_keystroke_delay_ms
      backspaceCount,
      tabCount,
      pasteDetected,
      focusSwitches.length > 1
        ? focusSwitches[1] - focusSwitches[0]
        : 0, // focus_switch_delay_avg_ms
      idleTime,
      timeToSubmit,
      navigator.webdriver ? 1 : 0, // is_webdriver
      navigator.plugins.length > 0 ? 1 : 0, // has_plugins
      screen.width < 800 ? 1 : 0, // screen_res_mismatch
      0, // missing_headers_score
      honeypotFilled,
      0, // unnatural_field_sequence
      0, // geo_ip_mismatch
      timeToSubmit < 300 ? 1 : 0, // request_too_fast
    ];

    try {
      // Simulate API call (replace with actual endpoint)
      const mockResponse = Math.random() > 0.7 ? { result: 1 } : { result: 0 };
      
      if (mockResponse.result === 1) {
        showAlert("Bot detected! Access denied.", "warning");
      } else {
        showAlert("Login successful! Welcome back.", "success");
        setTimeout(() => navigate("/home"), 1000);
      }
    } catch (err) {
      showAlert("Server error. Please try again.", "error");
      console.error(err);
    }
  };

  return (
    <>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
            background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .login-container {
            background: rgba(255, 255, 255, 0.95);
            padding: 2.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            width: 100%;
            max-width: 400px;
          }

          .login-title {
            text-align: center;
            margin-bottom: 2rem;
            color: #333;
            font-size: 1.5rem;
            font-weight: 600;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .form-input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #e1e5e9;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
            background: white;
          }

          .form-input:focus {
            outline: none;
            border-color: #667eea;
          }

          .form-input.error {
            border-color: #e74c3c;
          }

          .error-message {
            color: #e74c3c;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: block;
          }

          .login-button {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .login-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          }

          .login-button:active {
            transform: translateY(0);
          }

          .honeypot {
            position: absolute !important;
            left: -9999px !important;
            width: 1px !important;
            height: 1px !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }

          .detection-info {
            margin-top: 1.5rem;
            padding: 12px;
            background: rgba(102, 126, 234, 0.1);
            border-radius: 6px;
            font-size: 0.875rem;
            color: #555;
            text-align: center;
          }

          .alert {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 6px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            animation: slideIn 0.3s ease;
          }

          .alert.success {
            background: #27ae60;
          }

          .alert.error {
            background: #e74c3c;
          }

          .alert.warning {
            background: #f39c12;
          }

          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>

      <div className="login-container">
        <h2 className="login-title">Sign In</h2>
        
        <div className="form-group">
          <input
            type="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <input
            type="password"
            className={`form-input ${errors.password ? 'error' : ''}`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        {/* Honeypot field for bot detection */}
        <input
          type="text"
          className="honeypot"
          tabIndex="-1"
          autoComplete="off"
          onChange={() => setHoneypotFilled(1)}
        />

        <button className="login-button" onClick={handleLogin}>
          Sign In
        </button>

        <div className="detection-info">
          Passive bot detection system active
        </div>
      </div>

      {alert && (
        <div className={`alert ${alert.type}`}>
          {alert.message}
        </div>
      )}
    </>
  );
};

export default App;