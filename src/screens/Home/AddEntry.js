import React from "react";
import {
  View,
  ImageBackground,
  TextInput,
  ScrollView,
  StatusBar,
} from "react-native";
import ProtectScreen from '../../hoc/ProtectScreen';
import { reusable, padding, colors } from "../../styles/base";

const AddEntry = (props) => (
  <ProtectScreen  type="redirectOnNoToken" {...props}>
    <View style={reusable.container}>
      <StatusBar
        barStyle="light-content"
      />
      <ScrollView
        keyboardShouldPersistTaps='handled'>
        <ImageBackground
          source={require('../../assets/intro3.jpeg')}
          style={{
            height: 150,
            tintColor: 'black'
          }}
        >
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: padding.md,
            backgroundColor: 'rgba(0, 0, 0, .3)',
            
          }}>
            <TextInput 
              multiline
              placeholder="Enter title here"
              placeholderTextColor="lightgray"
              selectionColor="white"
              autoFocus
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }} />

          </View>
        </ImageBackground>
        <View style={{
          flex: 1,
        }}>
          <TextInput 
            multiline
            placeholder="What's on your mind?"
            placeholderTextColor="gray"
            selectionColor={colors.secondary}
            style={{
              color: colors.secondary,
              fontSize: 17,
              textAlign: 'justify',
              padding: padding.md,
              paddingTop: padding.md,
            }} />
        </View>
      </ScrollView>
    </View>
  </ProtectScreen>
);
export default AddEntry;
