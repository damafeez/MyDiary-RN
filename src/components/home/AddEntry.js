import React from "react";
import {
  View,
  ImageBackground,
  TextInput,
  ScrollView,
} from "react-native";
import { reusable, padding, colors } from "../../styles/base";

const Entry = ({ title, body, trimInput, handleTextChange, mode }) => (
  <View style={reusable.container}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps='handled'>
      <ImageBackground
        source={mode === 'edit' ?
          require('../../assets/intro2.jpeg')
          : require('../../assets/intro3.jpeg')}
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
          paddingBottom: padding.sm,
          backgroundColor: 'rgba(0, 0, 0, .3)',
          
        }}>
          <TextInput 
            onBlur={() => trimInput('title')}
            value={title}
            onChangeText={(value) => handleTextChange('title', value)}
            multiline
            placeholder="Enter title here"
            placeholderTextColor="lightgray"
            selectionColor="white"
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
              padding: padding.md,
              width: '100%',
            }} />

        </View>
      </ImageBackground>
      <View style={{
        flex: 1,
      }}>
        <TextInput 
          onBlur={() => trimInput('body')}
          value={body}
          onChangeText={(value) => handleTextChange('body', value)}
          multiline
          placeholder="WHAT'S ON YOUR MIND?&#10;Tap check button at the bottom to save,&#10;Long press to cancel."
          placeholderTextColor={colors.tertiary}
          selectionColor={colors.secondary}
          style={{
            color: colors.secondary,
            fontSize: 17,
            textAlign: 'justify',
            marginHorizontal: padding.md,
            paddingTop: padding.md,
            paddingBottom: padding.xl,
            marginBottom: 220
          }} />
      </View>
    </ScrollView>
  </View>
);

export default Entry;
