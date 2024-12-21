import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import {
  CardField,
  useConfirmPayment,
  useStripe,
} from "@stripe/stripe-react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Details } from "@stripe/stripe-react-native/lib/typescript/src/types/components/CardFieldInput";
import { APIs } from "@/services";
import { logger } from "react-native-reanimated/lib/typescript/logger";

const CheckoutScreen = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const { amount } = useLocalSearchParams();

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

    const user = JSON.parse(userData).email;

    const { error } = await initPaymentSheet({
      merchantDisplayName: "BaoPham, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: user,
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
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
