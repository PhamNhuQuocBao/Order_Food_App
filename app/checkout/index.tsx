import React, { useEffect, useState } from "react";
import { View, Button, Alert } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APIs } from "@/services";
import { createOrder } from "@/services/order";
import { Order } from "@/types/order";

const CheckoutScreen = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const { amount } = useLocalSearchParams();
  const router = useRouter();

  const fetchPaymentSheetParams = async () => {
    const response = await APIs.post(`/create-payment-intent`, {
      amount,
      currency: "usd",
    });
    const { paymentIntent, ephemeralKey, customer } = await response.data;

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const [{ paymentIntent, ephemeralKey, customer }, userData] =
      await Promise.all([
        fetchPaymentSheetParams(),
        AsyncStorage.getItem("user"),
      ]);
    if (!userData) {
      Alert.alert("Warning", "Please login in order to get item");
      return;
    }

    const user = JSON.parse(userData);
    const { phone, name, _id, email } = user;

    const { error } = await initPaymentSheet({
      merchantDisplayName: "BaoPham, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {},
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const res = await presentPaymentSheet();

    const { error } = res;

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      router.back();
    } else {
      const [profile, userData, userCart] = await Promise.all([
        AsyncStorage.getItem("profile"),
        AsyncStorage.getItem("user"),
        AsyncStorage.getItem("cart"),
      ]);
      const { name, phone, address } = JSON.parse(profile || "{}");
      const { _id, email } = JSON.parse(userData || "{}");
      const { products } = JSON.parse(userCart || "{}");

      const order: Order = {
        userId: _id,
        email,
        name,
        phone,
        address,
        amount: Number(amount),
        products,
      };
      const res = await createOrder(order);

      console.log(res);
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View style={{ padding: 16 }}>
      <Button disabled={!loading} title="Checkout" onPress={openPaymentSheet} />
    </View>
  );
};

export default CheckoutScreen;
