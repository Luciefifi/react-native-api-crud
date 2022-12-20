import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../components/CustomButton";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "../GloabalStylesheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

export default function Dashboard({ navigation, route }) {
  const [items, setItems] = useState([]);
  const [userData, setUserData] = useState({});
  const [selectedItem, setSelectedItem] = useState({});
  const [token, setToken] = useState("");
  let ModalResult = {};

  const getModalContent = (value) => {
    ModalResult = items.filter((item) => item.id === value);
    setSelectedItem(ModalResult[0]);
  };

  const cleanUp = () => {
    setToken("");
    // setItems("");
    setUserData("");
  };

  const handleLogout = () => {
    axios({
      method: "post",
      url: "https://0ab1-105-178-112-73.eu.ngrok.io/api/logout",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          navigation.navigate("Login");
          cleanUp();
        }
      })
      .catch((e) => console.log(e));
  };

  const handleDelete = async (id) => {
    let URL = "https://0ab1-105-178-112-73.eu.ngrok.io/api/items/" + id;
    await axios({
      method: "delete",
      url: URL,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.data === 1) {
          let newItems = items.filter((item) => item.id !== selectedItem.id);
          setItems(newItems);
        }
      })
      .catch((e) => console.log(e));
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchItems = async () => {
      axios({
        method: "get",
        url: "https://0ab1-105-178-112-73.eu.ngrok.io/api/items",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => setItems(response.data))
        .catch((error) => console.log(error));
    };

    const getData = async () => {
      try {
        const JSONvalue = await AsyncStorage.getItem("@user");
        const tokenGenerated = await AsyncStorage.getItem("@token");
        let user = JSONvalue != null ? JSON.parse(JSONvalue) : null;
        setUserData(user);
        setToken(tokenGenerated);
      } catch (e) {
        console.log(e);
      }
    };
    if (isFocused) {
      getData();
      fetchItems();
    }
  }, [isFocused]);

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 40,
        alignItems: "center",
      }}
    >
      <StatusBar backgroundColor="transparent" style="dark" />
      <View style={styles.boxContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>DASHBOARD</Text>
      </View>
      <View style={styles.boxContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          Hi, {userData.name}
        </Text>
        <CustomButton
          bg="black"
          text="LOGOUT"
          width={100}
          iconName="back"
          onPress={handleLogout}
        />
      </View>
      <View style={styles.boxContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>ALL ITEMS</Text>
          <CustomButton
            bg="#00719c"
            iconName="add-to-list"
            text="Add new"
            width={90}
            onPress={() => navigation.navigate("Register")}
          />
        </View>

        <View style={{ marginTop: 10, paddingHorizontal: 5, width: "90%" }}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{
                borderWidth: 0.7,
                padding: 3,
                paddingHorizontal: 25,
                borderRadius: 3,
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
                flexDirection: "row-reverse",
              }}
              onPress={() => {
                getModalContent(item.id);
                setModalVisible(true);
              }}
            >
              <AntDesign name="enter" size={24} color="black" />
              <Text style={{ fontSize: 15 }}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.6)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "100%",
              height: "50%",
              borderTopRightRadius: 35,
              borderTopLeftRadius: 35,
              alignItems: "center",
            }}
          >
            <Text style={{ marginTop: 30, fontWeight: "bold", fontSize: 20 }}>
              {selectedItem.name}
            </Text>
            <View
              style={{
                marginTop: 20,
                borderWidth: 0.4,
                width: "80%",
                borderRadius: 8,
                padding: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ marginBottom: 8, fontSize: 18 }}>
                Color:{" "}
                <Text style={{ fontWeight: "bold" }}>{selectedItem.color}</Text>
              </Text>
              <Text style={{ marginBottom: 8, fontSize: 18 }}>
                Item name:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {selectedItem.firstname} {selectedItem.name}
                </Text>
              </Text>
              <Text style={{ marginBottom: 8, fontSize: 18 }}>
                Weight:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {selectedItem.weight}
                </Text>
              </Text>
              <Text style={{ marginBottom: 8, fontSize: 18 }}>
                Quantity:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {selectedItem.quantity}
                </Text>
              </Text>
            </View>
            <View
              style={{
                padding: 8,
                flexDirection: "row",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <CustomButton
                bg="#cc0000"
                iconName="trash"
                text="DELETE"
                width={120}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  handleDelete(selectedItem.id);
                }}
              />
              <CustomButton
                bg="#6aa84f"
                iconName="arrow-up"
                text="UPDATE"
                width={120}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate("Update", {
                    color: selectedItem.color,
                    name: selectedItem.name,
                    weight: selectedItem.weight,
                    quantity: selectedItem.quantity,
                    id: selectedItem.id,
                    token: token,
                  });
                }}
              />
            </View>
            <CustomButton
              bg="black"
              iconName="circle-with-cross"
              text="CLOSE"
              width={270}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
