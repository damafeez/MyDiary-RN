import React, { Component, Fragment } from "react";
import { 
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import EntryCard from '../components/EntryCard';
import SwipeButtons from '../components/SwipeButtons';
import { reusable, padding, colors } from "../styles/base";
import { getEntries, setCurrentEntry, deleteEntry } from '../store/actions/entries';
import { activateReadModal } from '../store/actions/ui';
import { truncate } from '../utils';
import eventEmitter from '../services/eventEmitter';

class Entries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeEntry: null,
      scrollEnabled: true,
      openSwipeIndex: null,
    };
  }
  componentDidMount() {
    this.props._getEntries();

    // register react-navigation events
    this.subs = [
      this.props.navigation.addListener('didFocus', this.componentDidFocus),
    ];
  }
  componentWillUnmount() {
    // unregister react-navigation events
    this.subs.forEach(sub => sub.remove());
  }

  componentDidFocus = () => {
    // custom react-navigation
    const activeEntry = this.props.navigation.getParam('activeEntry', null);
    if (activeEntry) this.setState({ activeEntry });
  }
  handleEntryClick = (index) => {
    const { _activateReadModal, _setCurrentEntry } = this.props;

    _setCurrentEntry(index);
    _activateReadModal();
  }
  handleSwipeEdit = (index) => {
    const { _setCurrentEntry, navigation } = this.props;

    _setCurrentEntry(index);
    eventEmitter.emit('Action Button Clicked');
    navigation.navigate('AddEntry', { mode: 'edit', showReadModal: false });
  }
  handleSwipeDelete = ({ title, id }, index) => {
    Alert.alert(
      'Delete',
      truncate(title, 30),
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => this.props._deleteEntry(id, index),
        },
      ],
    );
  }
  allowScroll = (notSwiping) => {
    this.setState({ scrollEnabled: notSwiping });
  }
  handleSwipeOut = (index) => {
    this.setState({ openSwipeIndex: index });
  }

  render() {
    const { entries, loading, error } = this.props;
    const { scrollEnabled, openSwipeIndex } = this.state;
    return (
      <View style={[reusable.container, {paddingVertical: padding.md}]}>
        <SafeAreaView>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: padding.md}}>
            <Text style={[reusable.headerText, {marginBottom: padding.sm}]}>Entries</Text>
          </View>
          <View style={{paddingBottom: 120}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              scrollEnabled={scrollEnabled}
              onScroll={() => this.handleSwipeOut(null)}
              style={{marginHorizontal: -padding.sm, height: '100%'}}
              data={entries}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({item: entry, index}) => (
                <Swipeout
                  close={index !== openSwipeIndex}
                  scroll={this.allowScroll}
                  onOpen={() => this.handleSwipeOut(index)}
                  buttonWidth={60}
                  style={{backgroundColor: 'transparent', marginRight: padding.md}}
                  right={[
                    {
                      component: <SwipeButtons icon="edit-2" color={colors.secondary} />,
                      onPress: () => this.handleSwipeEdit(index),
                      backgroundColor: 'transparent'
                    },
                    {
                      component: <SwipeButtons icon="trash" color="#ff5925" />,
                      type: 'delete',
                      onPress: () => this.handleSwipeDelete({ title: entry.title, id: entry.id }, index),
                      backgroundColor: 'transparent'
                    },
                ]}>
                  <EntryCard
                    title={entry.title}
                    body={entry.body}
                    created={entry.created}
                    id={entry.id}
                    handleEntryClick={() => this.handleEntryClick(index)}
                    key={entry.id}
                  />
                </Swipeout>
              )}
              ListEmptyComponent={<View style={{
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
                height: 500,
              }}>
                {!!loading && <ActivityIndicator size="small" color={colors.primary} />}
                {!loading && <Fragment>
                  <Feather style={{
                    color: colors.tertiary,
                    fontSize: 25,
                    marginBottom: 30,
                  }} name="zap-off" />
                  <Text style={{color: colors.tertiary, fontSize: 20, textAlign: "center", paddingHorizontal: padding.md}}>{error ? error : 'You have not added any entries to your diary, please click the \'plus\' button to get started.'}</Text>
                </Fragment>}
              </View>} />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    entries: state.entries.entries,
    loading: state.entries.getEntriesLoading,
    errror: state.entries.getEntriesError,
  }
}

export default connect(mapStateToProps, {
  _getEntries: getEntries,
  _activateReadModal: activateReadModal,
  _setCurrentEntry: setCurrentEntry,
  _deleteEntry: deleteEntry,
})(Entries);
