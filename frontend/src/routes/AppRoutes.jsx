import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LoginPage from '../components/login/login-page';
import RegisterPage from '../components/register/register-page';
import HomePage from '../components/home/home-page';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: 'easeInOut',
                  opacity: { duration: 0.3 }, // Percepat fade
                  x: { duration: 0.5 }, // Geser lebih lambat
                }}
                className="absolute inset-0" // Posisi absolut selama transisi
              >
                <LoginPage />
              </motion.div>
            }
          />
          <Route
            path="/register"
            element={
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: 'easeInOut',
                  opacity: { duration: 0.3 },
                  x: { duration: 0.5 },
                }}
                className="absolute inset-0"
              >
                <RegisterPage />
              </motion.div>
            }
          />
          <Route
            path="/home"
            element={
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: 'easeInOut',
                  opacity: { duration: 0.3 },
                  x: { duration: 0.5 },
                }}
                className="absolute inset-0"
              >
                <HomePage />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
