import React from "react";
import { 
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import ProtectScreen from '../../hoc/ProtectScreen';
import EntryCard from '../../components/EntryCard';
import { reusable, padding, colors } from "../../styles/base";

const Entries = () => (
  <ProtectScreen  type="redirectOnNoToken">
    <View style={[reusable.container, {paddingVertical: padding.md}]}>
      <SafeAreaView>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: padding.md}}>
          <Text style={[reusable.headerText, {marginBottom: padding.sm}]}>Entries</Text>
          <TouchableOpacity>
            <Feather name="search" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{padding: padding.md}}>
          <View style={{marginHorizontal: -padding.sm, paddingBottom: padding.xl}}>
            <EntryCard />
            <EntryCard />
            <EntryCard liked />
            <EntryCard />
            <EntryCard />
            <EntryCard />
            <EntryCard liked />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  </ProtectScreen>
);
export default Entries;

