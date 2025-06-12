import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  LinearProgress,
  Chip,
  Paper,
  Avatar,
  Fade,
  Grow,
  Slide
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
  ChevronRight,
  Shield,
  Visibility,
  Psychology,
  Warning,
  CheckCircle,
  Person,
  Storage,
  Computer
} from '@mui/icons-material';

// Custom animations
const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

// Styled components
const GradientBox = styled(Box)(({ gradient }) => ({
  background: `linear-gradient(135deg, ${gradient})`,
  borderRadius: '16px',
  padding: '32px',
  color: 'white',
  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 25px 50px rgba(0,0,0,0.4)'
  }
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  border: '1px solid #333',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    borderColor: '#9c27b0',
    boxShadow: '0 10px 30px rgba(156, 39, 176, 0.3)'
  }
}));

const PulseAvatar = styled(Avatar)({
  animation: `${pulse} 2s infinite`,
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
});

const FloatingChip = styled(Chip)(({ delay }) => ({
  animation: `${float} 3s ease-in-out infinite`,
  animationDelay: `${delay}s`,
  background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
  color: 'white',
  fontWeight: 'bold',
  '&:hover': {
    background: 'linear-gradient(45deg, #FF8E8E 30%, #6EDDD6 90%)'
  }
}));

const Home = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      id: 'user-interaction',
      title: 'User Interaction',
      description: 'User visits a website and interacts with a login form or protected content',
      icon: <Person sx={{ fontSize: 40 }} />,
      gradient: '#2196F3, #1976D2',
      details: 'The process begins when a user attempts to access protected content or submit a form on a website.'
    },
    {
      id: 'frontend-collection',
      title: 'Frontend Data Collection',
      description: 'React.js frontend collects real-time behavioral data',
      icon: <Visibility sx={{ fontSize: 40 }} />,
      gradient: '#4CAF50, #388E3C',
      details: 'The frontend JavaScript silently monitors user behavior patterns like mouse movements, typing speed, and interaction timing.'
    },
    {
      id: 'feature-extraction',
      title: 'Feature Extraction',
      description: 'System extracts multiple behavioral features',
      icon: <Storage sx={{ fontSize: 40 }} />,
      gradient: '#9C27B0, #7B1FA2',
      details: 'Various metrics are extracted including screen width, browser plugins, timing patterns, and behavioral characteristics.'
    },
    {
      id: 'backend-processing',
      title: 'Backend Analysis',
      description: 'Flask backend receives and processes the collected data',
      icon: <Computer sx={{ fontSize: 40 }} />,
      gradient: '#FF9800, #F57C00',
      details: 'The Flask server receives the behavioral data and forwards it to a trained machine learning model for analysis.'
    },
    {
      id: 'ml-prediction',
      title: 'ML Model Prediction',
      description: 'Trained model analyzes patterns and predicts if user is human or bot',
      icon: <Psychology sx={{ fontSize: 40 }} />,
      gradient: '#E91E63, #C2185B',
      details: 'The machine learning model evaluates all collected features to determine the probability of the user being human or bot.'
    },
    {
      id: 'result-processing',
      title: 'Result Processing',
      description: 'System processes the prediction and determines appropriate action',
      icon: <Shield sx={{ fontSize: 40 }} />,
      gradient: '#3F51B5, #303F9F',
      details: 'Based on the model\'s confidence score, the system decides whether to allow access or show additional verification.'
    }
  ];

  const features = [
    'honeypotFilled', 'screen.width < 800', 'navigator.plugins', 'navigator.webdriver',
    'timeToSubmit', 'idleTime', 'focusSwitchDuration', 'pasteDetected',
    'tabCount', 'backspaceCount', 'avgKeystrokeDelay', 'avgMouseSpeed'
  ];

  const getFeatureDescription = (feature) => {
    if (feature.includes('Time') || feature.includes('Duration') || feature.includes('Delay') || feature.includes('Speed')) {
      return 'Timing-based behavioral pattern';
    } else if (feature.includes('Count')) {
      return 'User interaction frequency metric';
    } else if (feature.includes('navigator') || feature.includes('screen')) {
      return 'Browser environment detection';
    } else {
      return 'Advanced behavioral indicator';
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
        setIsAnimating(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleStepClick = (index) => {
    setCurrentStep(index);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      color: 'white',
      py: 4
    }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={8}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 50%, #E91E63 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
              mb: 3
            }}
          >
            How reCAPTCHA Works
          </Typography>
          <Typography variant="h5" color="rgba(255,255,255,0.8)" maxWidth="800px" mx="auto">
            Discover the intelligent system that protects websites from bots using advanced behavioral analysis and machine learning
          </Typography>
        </Box>

        {/* Main Workflow Visualization */}
        <Box mb={10}>
          <Typography variant="h3" textAlign="center" mb={6} fontWeight="bold">
            Interactive Workflow
          </Typography>
          
          {/* Step Navigation */}
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} mb={6}>
            {steps.map((step, index) => (
              <Button
                key={step.id}
                onClick={() => handleStepClick(index)}
                variant={currentStep === index ? "contained" : "outlined"}
                sx={{
                  borderRadius: '25px',
                  px: 3,
                  py: 1,
                  background: currentStep === index 
                    ? 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)' 
                    : 'transparent',
                  border: currentStep === index ? 'none' : '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  transform: currentStep === index ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    background: currentStep === index 
                      ? 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)' 
                      : 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Step {index + 1}
              </Button>
            ))}
          </Box>

          {/* Current Step Display */}
          <Fade in={!isAnimating} timeout={500}>
            <Box>
              <GradientBox gradient={steps[currentStep].gradient}>
                <Box display="flex" alignItems="center" gap={4} mb={3}>
                  <PulseAvatar sx={{ width: 80, height: 80, bgcolor: 'rgba(255,255,255,0.2)' }}>
                    {steps[currentStep].icon}
                  </PulseAvatar>
                  <Box>
                    <Typography variant="h4" fontWeight="bold" mb={1}>
                      {steps[currentStep].title}
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9 }}>
                      {steps[currentStep].description}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ opacity: 0.8, lineHeight: 1.6 }}>
                  {steps[currentStep].details}
                </Typography>
              </GradientBox>
            </Box>
          </Fade>

          {/* Progress Bar */}
          <Box mt={4}>
            <LinearProgress 
              variant="determinate" 
              value={((currentStep + 1) / steps.length) * 100}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(255,255,255,0.1)',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(45deg, #2196F3 30%, #9C27B0 90%)',
                  borderRadius: 4
                }
              }}
            />
          </Box>
        </Box>

        {/* Feature Detection Section */}
        <Box mb={10}>
          <Typography variant="h3" textAlign="center" mb={6} fontWeight="bold">
            Behavioral Features Analyzed
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={feature}>
                <Grow in={true} timeout={1000 + index * 100}>
                  <FeatureCard>
                    <CardContent>
                      <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <Box 
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: 'linear-gradient(45deg, #4CAF50 30%, #2196F3 90%)',
                            animation: `${pulse} 2s infinite`
                          }}
                        />
                        <Typography variant="h6" fontWeight="bold" color="white">
                          {feature}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="rgba(255,255,255,0.7)">
                        {getFeatureDescription(feature)}
                      </Typography>
                    </CardContent>
                  </FeatureCard>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Decision Tree */}
        <Box mb={10}>
          <Typography variant="h3" textAlign="center" mb={6} fontWeight="bold">
            Decision Process
          </Typography>
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={5}>
              <GradientBox gradient="#4CAF50, #388E3C">
                <Box textAlign="center">
                  <CheckCircle sx={{ fontSize: 60, mb: 2, color: '#C8E6C9' }} />
                  <Typography variant="h5" fontWeight="bold" mb={2}>
                    Human Verified
                  </Typography>
                  <Typography variant="body1" mb={3} sx={{ opacity: 0.9 }}>
                    User shows natural behavioral patterns
                  </Typography>
                  <Chip 
                    icon={<CheckCircle />}
                    label="✓ Access Granted"
                    sx={{ 
                      bgcolor: 'rgba(76, 175, 80, 0.3)',
                      color: '#C8E6C9',
                      fontWeight: 'bold'
                    }}
                  />
                </Box>
              </GradientBox>
            </Grid>
            
            <Grid item xs={12} md={2} textAlign="center">
              <ChevronRight sx={{ fontSize: 40, color: 'rgba(255,255,255,0.5)' }} />
            </Grid>

            <Grid item xs={12} md={5}>
              <GradientBox gradient="#FF9800, #F57C00">
                <Box textAlign="center">
                  <Warning sx={{ fontSize: 60, mb: 2, color: '#FFE0B2' }} />
                  <Typography variant="h5" fontWeight="bold" mb={2}>
                    Bot Detected
                  </Typography>
                  <Typography variant="body1" mb={3} sx={{ opacity: 0.9 }}>
                    Suspicious automated behavior identified
                  </Typography>
                  <Chip 
                    icon={<Warning />}
                    label="⚠ Additional Verification"
                    sx={{ 
                      bgcolor: 'rgba(244, 67, 54, 0.3)',
                      color: '#FFCDD2',
                      fontWeight: 'bold'
                    }}
                  />
                </Box>
              </GradientBox>
            </Grid>
          </Grid>
        </Box>

        {/* Technology Stack */}
        <Box textAlign="center">
          <Typography variant="h3" mb={6} fontWeight="bold">
            Technology Stack
          </Typography>
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
            {[
              { name: 'React.js', gradient: '#61DAFB, #21CBF3' },
              { name: 'Flask', gradient: '#4CAF50, #66BB6A' },
              { name: 'Machine Learning', gradient: '#9C27B0, #BA68C8' },
              { name: 'Behavioral Analysis', gradient: '#FF5722, #FF7043' }
            ].map((tech, index) => (
              <FloatingChip
                key={tech.name}
                label={tech.name}
                delay={index * 0.5}
                sx={{
                  background: `linear-gradient(45deg, ${tech.gradient})`,
                  fontSize: '1.1rem',
                  py: 3,
                  px: 4,
                  '&:hover': {
                    transform: 'scale(1.1) translateY(-5px)'
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;