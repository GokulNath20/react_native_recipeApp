import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const windowWidth = Dimensions.get("window").width;

const HomeScreen = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState("breakfast");
  const [isLoading, setLoading] = useState(true);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logout Successful");
        navigation.navigate("Logout");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
      });
  };

  /* var menus = xmlDoc.getElementsByTagName("menu");
  var steps = xmlDoc.getElementsByTagName("steps");
  for (var i = 0; i < steps.length; i++) {
    var menu = menus[i].childNodes[0].nodeValue;
    var step = steps[i].childNodes[0].nodeValue;
    console.log(menu);
    console.log(step);
  } */

  const recipeTypeImage = {
    breakfast: [
      {
        id: 0,
        image: require("../assets/breakfast_images/cookies.png"),
        name: "Cookies",
      },
      {
        id: 1,
        image: require("../assets/breakfast_images/omelet.jpg"),
        name: "Omelet",
      },
      {
        id: 2,
        image: require("../assets/breakfast_images/waffles.png"),
        name: "Waffles",
      },
      {
        id: 3,
        image: require("../assets/breakfast_images/Sausage_Breakfast_Wrap.png"),
        name: "Sausage Breakfast Wrap",
      },
    ],
    lunch: [
      {
        id: 4,
        image: require("../assets/lunch_images/bananaLeaf_RiceMeal.png"),
        name: "Banana Leaf Rice Meal",
      },
      {
        id: 5,
        image: require("../assets/lunch_images/Mee_Curry.png"),
        name: "Mee Curry",
      },
      {
        id: 6,
        image: require("../assets/lunch_images/Nasi_Lemak.png"),
        name: "Nasi Lemak",
      },
      {
        id: 7,
        image: require("../assets/lunch_images/Rice_GroundChickenChilli.png"),
        name: "Rice Ground Chicken Chilli",
      },
    ],
    dinner: [
      {
        id: 8,
        image: require("../assets/dinner_images/capati_meal.png"),
        name: "Capati",
      },
      {
        id: 9,
        image: require("../assets/dinner_images/maggi_goreng.png"),
        name: "Maggi Goreng",
      },
      {
        id: 10,
        image: require("../assets/dinner_images/nasi_goreng.png"),
        name: "Nasi Goreng",
      },
      {
        id: 11,
        image: require("../assets/dinner_images/tomyam.png"),
        name: "Tomyam",
      },
    ],
  };
  const onImageLoad = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const renderItem = ({ item }) => (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => {
          navigation.navigate("RecipeDetails", {
            itemId: item.id,
            itemName: item.name,
            itemImage: item.image,
          });
        }}
      >
        {isLoading && (
          <ActivityIndicator animating={isLoading} size="large" color="gray" />
        )}
        <Image
          source={item.image}
          style={{
            width: 150,
            height: 150,
            flexWrap: "wrap",
          }}
          onLoad={onImageLoad()}
        />
        <Text>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Recipe App</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/recipe-logo.png")}
          />
        </View>
      </View>
      <Text style={{ paddingTop: 10, paddingLeft: 20, fontWeight: "bold" }}>
        Select the recipe type
      </Text>

      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Breakfast" value="breakfast" />
          <Picker.Item label="Lunch" value="lunch" />
          <Picker.Item label="Dinner" value="dinner" />
        </Picker>
        <View style={{}}>
          <FlatList
            alignItems="center"
            justifyContent="space-around"
            contentContainerStyle={{ justifyContent: "space-between" }}
            numColumns={2}
            data={recipeTypeImage[selectedValue]}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            vertical={true}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            Text="Hi"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  header: {
    height: 60,
    backgroundColor: "#009387",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },
  Button: {
    color: "red",
  },
  logoContainer: {
    paddingTop: 20,
    alignItems: "center",
  },
  logo: {
    width: windowWidth * 0.7,
    height: 110,
  },
  pickerContainer: {
    borderRadius: 15,
    borderWidth: 0,
    padding: 0,
    backgroundColor: "#FFF",
  },
  picker: {
    backgroundColor: "ABB8C3",
    marginLeft: 20,
    marginRight: 20,
  },
});
export default HomeScreen;
