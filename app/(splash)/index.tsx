import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styleSplash } from "@/stylesheets/splash";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

const Splash = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styleSplash.container}>
      <View style={styleSplash.view}>
        <Image
          source={require("@/assets/images/splash.png")}
          style={styleSplash.image}
        />
        <Text style={styleSplash.title}>Food to blow your mind!</Text>
        <Text style={styleSplash.description}>
          Whether you're craving pizza, sushi, or something in between, we have
          got your back.
        </Text>
        <Button title="Get Started" onPress={() => router.push("/auth")} />
      </View>
    </SafeAreaView>
  );
};

export default Splash;
