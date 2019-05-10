import React, { Component, Fragment } from "react";
import { 
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import EntryCard from '../components/EntryCard';
import { reusable, padding, colors } from "../styles/base";
import { getEntries, readEntry } from '../store/actions/entries';
import { activateReadModal } from '../store/actions/ui';

class Entries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeEntry: null,
    };

    this.handleEntryClick = this.handleEntryClick.bind(this);
    this.componentDidFocus = this.componentDidFocus.bind(this);
  }
  componentDidMount() {
    this.props._getEntries();

    // register react-navigation events
    this.subs = [
      this.props.navigation.addListener('didFocus', this.componentDidFocus),
    ];
  }
  // custom react-navigation events
  componentDidFocus() {
    const activeEntry = this.props.navigation.getParam('activeEntry', null);
    if (activeEntry) this.setState({ activeEntry });
  }
  // 
  componentWillUnmount() {
    // unregister react-navigation events
    this.subs.forEach(sub => sub.remove());
  }
  handleEntryClick(index) {
    const { _activateReadModal, _readEntry } = this.props;

    _readEntry(index);
    _activateReadModal();
  }
  render() {
    const { entries, loading, error } = this.props;
    return (
      <View style={[reusable.container, {paddingVertical: padding.md}]}>
        <SafeAreaView>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: padding.md}}>
            <Text style={[reusable.headerText, {marginBottom: padding.sm}]}>Entries</Text>
            {/* <TouchableOpacity>
              <Feather name="search" size={20} color={colors.primary} />
            </TouchableOpacity> */}
          </View>
          <View style={{paddingBottom: 120}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{marginHorizontal: -padding.sm, height: '100%'}}
              data={entries}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({item: entry, index}) => (<EntryCard
                title={entry.title}
                body={entry.body}
                date={entry.created}
                id={entry.id}
                handleEntryClick={() => this.handleEntryClick(index)}
                key={entry.id}
              />)}
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
  _readEntry: readEntry,
})(Entries);
