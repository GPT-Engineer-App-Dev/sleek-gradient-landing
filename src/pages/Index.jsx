import { useEffect, useState } from "react";
import { Container, Text, VStack, Box } from "@chakra-ui/react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

// Countdown component
const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <Text fontSize="xl" color="white">
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
    </Text>
  );
};

// 3D Globe component
const Globe = () => {
  return (
    <Canvas>
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      <Stars />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="white"
          wireframe
          wireframeLinewidth={2}
          emissive="white"
        />
      </mesh>
    </Canvas>
  );
};

const Index = () => {
  return (
    <Container
      centerContent
      maxW="container.md"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-r, gray.300, gray.600)"
    >
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold" color="white">
          teleses.ai, coming soon
        </Text>
        <Box width="100%" height="400px">
          <Globe />
        </Box>
        <Countdown targetDate="2024-07-27T00:00:00" />
        <Text fontSize="xl" color="white">
          countdown to demo day
        </Text>
      </VStack>
    </Container>
  );
};

export default Index;