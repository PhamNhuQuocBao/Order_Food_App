import React, { useCallback } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import { Link, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import useForm from "@/hooks/useForm";
import { validateEmail } from "@/utils/validate";
import { login } from "@/services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const { values, onChangeInput } = useForm({
    email: "",
    password: "",
  });
  const router = useRouter();

  const onLogin = useCallback(async () => {
    if (!values.email || !values.password) {
      Alert.alert("Warning", "Please enter your account!");
      return;
    }

    const emailValid = validateEmail(values.email);
    if (!emailValid) {
      Alert.alert("Warning", "Email is incorrect!");
      return;
    }

    const res = await login({ email: values.email, password: values.password });

    if (res?.status === 404) {
      Alert.alert("Information", "Account haven't exist!");
      return;
    }

    if (res?.status === 400) {
      Alert.alert("Error", "Login failed, try again!");
      return;
    }

    if (res?.status === 200) {
      const { password, ...dataUserNotPassword } = res.data;
      await AsyncStorage.setItem("user", JSON.stringify(dataUserNotPassword));
      router.push("/(tabs)/");
      return;
    }
  }, [values.email, values.password]);

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          gap: 20,
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Login</Text>
        <TextInput
          placeholder="Email"
          style={{
            borderBottomWidth: 1,
            padding: 12,
            width: "100%",
          }}
          value={values.email}
          onChangeText={(text) => onChangeInput("email", text)}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          style={{
            borderBottomWidth: 1,
            padding: 12,
            width: "100%",
          }}
          value={values.password}
          onChangeText={(text) => onChangeInput("password", text)}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text>Create a new account</Text>
          <Link href={"/auth/register"} style={{ color: Colors.primary.color }}>
            Register
          </Link>
        </View>
        <View style={{ width: "100%" }}>
          <Button title="Login" onPress={onLogin} />
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Link
            href={"/(tabs)/"}
            style={{ color: Colors.primary.color, textAlign: "left" }}
            replace
          >
            Skip to home
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
