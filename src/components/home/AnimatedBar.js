import React, { Component } from "react";
import { 
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  ScrollView,
  Dimensions,
  BackHandler,
} from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { padding, dimensions } from "../../styles/base";
import { getEntries } from '../../store/actions/entries';
import { activateReadModal } from '../../store/actions/ui';
import AddEntryButton from '../AddEntryButton';
import eventEmitter from '../../services/eventEmitter';

const tabBarHeight = dimensions.fullHeight < 812 ? 60 : 95;

class Entries extends Component {
  constructor(props) {
    super(props);

    this.handleAddButtonPress = this.handleAddButtonPress.bind(this);
    this.handleBackButtonAndroid = this.handleBackButtonAndroid.bind(this);
    this.yTranslate = new Animated.Value(0);
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonAndroid);
  }
  componentDidUpdate(prevProps) {
    const { active } = this.props;
    if (prevProps.active !== active) {
      if (active) {
        // animate the showing of the modal
        this.yTranslate.setValue(0); // reset the animated value
        Animated.spring(this.yTranslate, {
          toValue: 1,
          friction: 5,
        }).start();
      } else {
        // animate the hiding of the modal
        Animated.timing(this.yTranslate, {
          toValue: 0,
          duration: 250,
          easing: Easing.linear
        }).start();
      }
    }
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');
  }
  handleAddButtonPress() {
    const { navigation, active, _activateReadModal } = this.props;
    eventEmitter.emit('Action Button Clicked');
    navigation.navigate('AddEntry', { mode: active ? 'edit' : 'create' });
    _activateReadModal(false);
  }
  handleAddButtonLongPress() {
    eventEmitter.emit('Action Button Long Clicked');
  }
  handleBackButtonAndroid() {
    const { active, _activateReadModal } = this.props;
    if (active) {
      _activateReadModal(false);
      return true;
    }
  }
  render() {
    const {
      navigation,
      entries,
      index,
      active,
      activeTintColor,
      inactiveTintColor,
    } = this.props;
    const { title, body } = entries[index] || {};
    const {height: SCREEN_HEIGHT} = Dimensions.get('window');
    const fullHeight = SCREEN_HEIGHT - 40;
    const modalMoveY = this.yTranslate.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [fullHeight - tabBarHeight, 500, 0]
    });
    const textOpacity = this.yTranslate.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1]
    });
    const textOpacityInverse = this.yTranslate.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
    const buttonRotate = this.yTranslate.interpolate({
      inputRange: [0, 0.2, 1],
      outputRange: ['0deg', '200deg', '360deg']
    });

    const cardStyle = { ...styles.card,
      height: fullHeight,
      transform: [{translateY: modalMoveY}]
    };
    return (
      <View>
        <Animated.View style={cardStyle}>
          {title && body && 
            (
              <Animated.View style={{
                paddingTop: padding.md,
                paddingHorizontal: 15,
                opacity: textOpacity
              }}>
                <View style={{
                  flexDirection: 'row',
                  marginBottom: padding.sm,
                  marginRight: -15,
                  alignItems: 'flex-start',
                }}>
                  <Text style={[
                    {
                      flex: 1,
                      fontWeight: '600',
                      fontSize: 22,
                      color: 'rgba(0, 0, 0, 0.8)',
                      marginBottom: padding.md
                    }
                  ]}>{title}</Text>
                  <TouchableOpacity
                    onPress={() => this.props._activateReadModal(false)}
                    style={{padding: padding.md, paddingTop: padding.sm,}}>
                    <View style={{width: 7, height: 7, backgroundColor: '#ff5925', borderRadius: 5,}} />
                  </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={[
                    {
                      color: 'gray',
                      fontSize: 17,
                      lineHeight: 20,
                      textAlign: "justify",
                      marginBottom: 200,
                    }
                  ]}
                  >{body}
                  </Text>
                </ScrollView>
              </Animated.View>
            )
          }
        </Animated.View>
        <SafeAreaView style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 15,
          elevation: 150,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          height: tabBarHeight,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: padding.sm,
          }}>
            <TouchableOpacity
              style={{
                paddingVertical: padding.sm,
                paddingHorizontal: padding.lg,
              }}
              disabled={active}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Entries')}>
              <Animated.View style={{opacity: textOpacityInverse}}>
                <Feather style={{fontSize: 25}} name='align-center' color={navigation.state.index === 0 ? activeTintColor : inactiveTintColor } />
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}
              onLongPress={this.handleAddButtonLongPress}
              onPress={this.handleAddButtonPress}
            >
              <Animated.View style={{transform: [{rotate: buttonRotate}]}}>
                  <AddEntryButton focused={navigation.state.index === 1} entry={active} />
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: padding.sm,
                paddingHorizontal: padding.lg,
              }}
              disabled={active}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Profile')}>
              <Animated.View style={{opacity: textOpacityInverse}}>
                <Feather style={{fontSize: 25}} name='user' color={navigation.state.index === 2 ? activeTintColor : inactiveTintColor } />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowOffset: { width: 5, height: -5 },
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
    zIndex: 10,
  }
});
const mapStateToProps = (state) => {
  return {
    entries: state.entries.entries,
    index: state.entries.currentEntry,
    active: state.ui.readModalActive,
  }
}

export default connect(mapStateToProps, {
  _getEntries: getEntries,
  _activateReadModal: activateReadModal,
})(Entries);
