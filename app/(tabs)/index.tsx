import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styleHome } from "@/stylesheets/home";
import Restaurant from "@/components/Restaurant";
import { RESTAURANTS } from "@/constants/mock";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { getRestaurants } from "@/services/restaurant";
import { RestaurantResponse } from "@/types/restaurant";

const Home = () => {
  const [restaurants, setRestaurants] = useState<RestaurantResponse[]>([]);
  const router = useRouter();

  const fetch = useCallback(async () => {
    const res = await getRestaurants();

    if (res?.status === 200) {
      setRestaurants(res.data);
      return;
    }

    Alert.alert("Error", "Get data failed!");
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <SafeAreaView style={styleHome.container}>
      <View style={styleHome.header}>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Deliver to:</Text>
          <Text>24 Mai Anh Tuan</Text>
        </View>
      </View>
      <View>
        <TextInput placeholder="Search..." style={styleHome.search} />
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Text style={styleHome.popularRestaurant}>Popular Restaurants</Text>
          <TouchableOpacity>
            <Text style={styleHome.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <View>
          {restaurants.map((value) => (
            <Restaurant
              data={value}
              key={value._id}
              onPress={() => {
                router.push({
                  pathname: `/restaurant/[id]`,
                  params: {
                    id: value._id,
                  },
                });
              }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
