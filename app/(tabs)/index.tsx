import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styleHome } from "@/stylesheets/home";
import Restaurant from "@/components/Restaurant";
import { useRouter } from "expo-router";
import { getRestaurants } from "@/services/restaurant";
import { RestaurantResponse } from "@/types/restaurant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useDebounce from "@/hooks/useDebounce";

const Home = () => {
  const [restaurants, setRestaurants] = useState<RestaurantResponse[]>([]);
  const [address, setAddress] = useState<{ street: string; city: string }>({
    street: "",
    city: "",
  });
  const [filteredRestaurants, setFilteredRestaurants] = useState<
    RestaurantResponse[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const fetch = useCallback(async () => {
    const [res, profileStr] = await Promise.all([
      getRestaurants(),
      AsyncStorage.getItem("profile"),
    ]);

    const profile = JSON.parse(profileStr || "{}");
    if (profile) {
      setAddress(profile.address);
    }

    if (res?.status === 200) {
      setRestaurants(res.data);
      return;
    }

    Alert.alert("Error", "Get data failed!");
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery.trim() === "") {
      setFilteredRestaurants(restaurants); // Reset to all restaurants
    } else {
      const filtered = restaurants.filter((restaurant) =>
        restaurant.name
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  }, [debouncedSearchQuery, restaurants]);

  return (
    <SafeAreaView style={styleHome.container}>
      <View style={styleHome.header}>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Deliver to:</Text>
          {address ? (
            <Text>
              {address.street}, {address.city}
            </Text>
          ) : null}
        </View>
      </View>
      <View>
        <TextInput
          placeholder="Search..."
          style={styleHome.search}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
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
          {filteredRestaurants.map((value) => (
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
