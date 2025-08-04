// components/Loader.tsx
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const HomeLoader = ({ onFinish }: { onFinish: () => void }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const zoomInOut = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );

    zoomInOut.start();

    const timeout = setTimeout(() => {
      zoomInOut.stop();
      onFinish();
    }, 1500); 
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/images/logo-coinly2.png")}
        style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1F3E", 
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
  },
});

export default HomeLoader;
