import React, {
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
} from "react";
import { View, Text } from "react-native";
import firebase from "firebase";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { GiftedChat } from "react-native-gifted-chat";
import { db } from "../firebase";

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
   

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: "Hello developer",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: "React Native",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //   ]);
 
  // }, []);

  useLayoutEffect(() => {
   const unsubscribe = db.collection('chats').orderBy('createdAt', 'desc').onSnapshot(snapshot => setMessages(
      snapshot.docs.map(doc => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text:doc.data().text,
     }))
   ))
    return unsubscribe;
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    
    db.collection("chats")
     
      .add({
        _id,
        createdAt,
        text,
        
       
       
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

    console.log(user);
   
  }, []);




  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Avatar
            rounded
            source={{
              uri: firebase.auth?.currentUser?.photoURL,
            }}
          />
        </View>
      ),

      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 30 }} onPress={signOut}>
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        navigation.replace("login screen");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: firebase.auth?.currentUser?.email,
        name: firebase.auth?.currentUser?.name,
        avatar: firebase.auth?.currentUser?.photoURL,
      }}
    />
  );
};

export default ChatScreen;
