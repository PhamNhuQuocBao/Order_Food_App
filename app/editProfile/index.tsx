import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { cloudinaryConfig } from "@/services";
import { updateProfile } from "@/services/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarDisplay, setAvatarDisplay] = useState("");
  const [avatarUpload, setAvatarUpload] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePickAvatar = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarDisplay(result.assets[0].uri);
    }
  };

  const uploadToCloudinary = async (uri: string) => {
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`; // Replace YOUR_CLOUD_NAME with your Cloudinary cloud name
    const uploadPreset = cloudinaryConfig.uploadPreset; // Set the upload preset in Cloudinary settings

    const formData = new FormData();
    formData.append("file", {
      uri,
      type: "image/jpeg", // Adjust the mime type based on the image format
      name: uri.split("/").pop(),
    } as any);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(cloudinaryUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Assuming the response includes the URL of the uploaded image
      const imageUrl = response.data.secure_url;

      setAvatarUpload(imageUrl); // Save the image URL for further use
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image to Cloudinary: ", error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    // Handle save action
    try {
      const userString = await AsyncStorage.getItem("user");
      const user = JSON.parse(userString || "{}");
      const userId = user._id;
      if (!name || !phone || !address) {
        Alert.alert("Error", "Please fill all the fields!");
        return;
      }

      const avatar = await uploadToCloudinary(avatarDisplay);

      if (!avatar) {
        Alert.alert("Error", "Cannot upload default avatar!");
        return;
      }

      const res = await updateProfile({
        name,
        phone,
        address,
        avatar,
        userId,
      });

      if (res?.status === 201) {
        Alert.alert("Success", "Profile updated successfully!");
        setTimeout(() => {
          router.push("/(tabs)/profile");
        }, 1500);
      }
      if (res?.status === 400) {
        Alert.alert("Error", res.data.error);
      }
      if (res?.status === 404) {
        Alert.alert("Error", res.data.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const profileStr = await AsyncStorage.getItem("profile");
      const profile = JSON.parse(profileStr || "{}");
      console.log(profile);

      setName(profile.name);
      setPhone(profile.phone);
      setAddress(profile.address);
      setAvatarDisplay(profile.avatarDisplay);
    };
    fetchProfile();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Edit Profile</Text>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={handlePickAvatar}>
            <Image
              source={
                avatarDisplay
                  ? { uri: avatarDisplay }
                  : require("../../assets/images/splash.png")
              }
              style={styles.avatar}
            />
            <Text style={styles.changeAvatarText}>Change Avatar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Street</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your city"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  changeAvatarText: {
    marginTop: 10,
    fontSize: 16,
    color: "#007BFF",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
