import { Alert, Text, TextInput, View } from "react-native";
import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import { Link, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import useForm from "@/hooks/useForm";
import { validateEmail } from "@/utils/validate";
import { login, register } from "@/services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
  const { values, onChangeInput } = useForm({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const onRegister = useCallback(async () => {
    if (!values.email || !values.password) {
      Alert.alert("Warning", "Please enter your account!");
      return;
    }

    if (values.password === values.confirmPassword) {
      Alert.alert("Warning", "Password is not same!");
      return;
    }

    const emailValid = validateEmail(values.email);
    if (!emailValid) {
      Alert.alert("Warning", "Email is incorrect!");
      return;
    }

    const res = await register({
      email: values.email,
      password: values.password,
    });

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
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Register</Text>
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
        <TextInput
          placeholder="Confirm password"
          style={{
            borderBottomWidth: 1,
            padding: 12,
            width: "100%",
          }}
          value={values.confirmPassword}
          onChangeText={(text) => onChangeInput("confirmPassword", text)}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text>You already have an account</Text>
          <Link href={"/auth"} style={{ color: Colors.primary.color }}>
            Login
          </Link>
        </View>
        <View style={{ width: "100%" }}>
          <Button title="Register" onPress={onRegister} />
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

export default Register;
