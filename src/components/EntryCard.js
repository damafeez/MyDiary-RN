import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import moment from 'moment';
import { padding, colors } from "../styles/base";
import { truncate } from '../utils';

const EntryCard = ({ title, body, created, handleEntryClick }) => (
  <TouchableOpacity onPress={handleEntryClick} activeOpacity={1} style={styles.card}>
    <View style={{
      flexDirection: 'row',
      marginBottom: padding.sm,
      alignItems: 'flex-start',
    }}>
      <Text style={
        {
          flex: 1,
          fontWeight: '600',
          fontSize: 17,
          color: 'rgba(0, 0, 0, 0.8)',
        }}>{truncate(title, 30)}</Text>
        <Text style={{
          fontSize: 15,
          color: colors.secondary,
        }}>{moment(created).date()} {moment(created).format('MMM').toUpperCase()}</Text>
    </View>
    <Text style={
      {
        color: 'gray',
      }
    }>
    {truncate(body, 95)}
    </Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  card: {
    padding: padding.sm,
    marginLeft: padding.md,
    marginBottom: padding.sm,
  },
});

export default EntryCard;
