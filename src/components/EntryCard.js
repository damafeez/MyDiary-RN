import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import moment from 'moment';
import { padding, colors } from "../styles/base";

const truncate = (string, length) => {
  const _string = string.replace(/\n/g, " ");
  const truncated = `${_string.substring(0, length).trim()}...`;
  return _string.length <= truncated.length ? _string : truncated;
}

const EntryCard = ({ active, title, body, created, id, handleEntryClick }) => (
  <TouchableOpacity onPress={() => handleEntryClick(id)} activeOpacity={1} style={[styles.card, active && styles.active]}>
    <View style={{
      flexDirection: 'row',
      marginBottom: padding.sm,
      alignItems: 'flex-start',
    }}>
      <Text style={[
        {
          flex: 1,
          fontWeight: '600',
          fontSize: 17,
          color: 'rgba(0, 0, 0, 0.8)',
        },
        active && { fontSize: 18, marginBottom: padding.md }
      ]}>{active ? title : truncate(title, 30)}</Text>
      {!!active &&
        <TouchableOpacity
          onPress={() => handleEntryClick()}
          style={{padding: padding.sm}}>
          <View style={{width: 7, height: 7, backgroundColor: '#ff5925', borderRadius: 5,}} />
        </TouchableOpacity>}
      {!active && <Text style={{
        fontSize: 15,
        color: colors.secondary,
      }}>{moment(created).date()} {moment(created).format('MMM').toUpperCase()}</Text>}
    </View>
    <Text style={[
      {
        color: 'gray',
      },
      active && { fontSize: 15, lineHeight: 20 }]}
    >
      {active ? body : truncate(body, 95)}
    </Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  card: {
    padding: padding.sm,
    marginBottom: padding.sm,
  },
  active: {
    backgroundColor: 'white',
    padding: padding.md,
    borderRadius: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 3,
  }
});

export default EntryCard;
