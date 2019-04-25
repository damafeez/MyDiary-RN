import React from "react";
import { 
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { padding, colors } from "../styles/base";

const EntryCard = ({liked}) => (
  <View style={[styles.card, liked && styles.liked]}>
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: padding.sm
    }}>
      <TouchableOpacity>
        <Feather style={[{color: colors.secondary}, liked && styles.likedIcon]} name="heart" />
      </TouchableOpacity>
      <Text style={{
        flex: 1,
        fontWeight: '600',
        fontSize: 17,
        color: colors.secondary,
        marginHorizontal: padding.sm,
      }}>This is the header you want...</Text>
      <Text style={{
        fontSize: 15,
        color: colors.secondary,
      }}>22 FEB</Text>
    </View>
    <Text style={{
      color: '#95999D',
    }}>This is the word I told you I would type when your mum gets home the last time I was awake....</Text>
  </View>
);
export default EntryCard;
const styles = StyleSheet.create({
  card: {
    padding: padding.sm,
    marginBottom: padding.sm,
    borderRadius: 5,
  },
  likedIcon: {
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 15,
    shadowOpacity: 0.6,
    shadowColor: '#ff5925',
    color: '#ff5925',
  },
  liked: {
    backgroundColor: 'white',
    shadowOffset: { width: 3, height: 3 },
    shadowColor: '#50555ac2',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  }
})
