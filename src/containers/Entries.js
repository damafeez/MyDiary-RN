import React, { Component } from "react";
import { 
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import EntryCard from '../components/EntryCard';
import { reusable, padding, colors } from "../styles/base";
import { getEntries } from '../store/actions/entries';

class Entries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeEntry: null,
    };

    this.handleEntryClick = this.handleEntryClick.bind(this);
  }
  componentDidMount() {
    this.props._getEntries();
  }
  handleEntryClick(index = null) {
    this.setState({
      activeEntry: index,
    })
  }
  render() {
    const { entries, loading, error } = this.props;
    const { activeEntry } = this.state;
    return (
      <View style={[reusable.container, {paddingVertical: padding.md}]}>
        <SafeAreaView>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: padding.md}}>
            <Text style={[reusable.headerText, {marginBottom: padding.sm}]}>Entries</Text>
            <TouchableOpacity>
              <Feather name="search" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={{padding: padding.md}}>
            {
              (() => {
                if (entries && entries.length > 0) {
                  return <View style={{marginHorizontal: -padding.sm, paddingBottom: 120}}>
                    {
                      entries.map((entry, index) => (
                        <EntryCard
                          title={entry.title}
                          body={entry.body}
                          date={entry.created}
                          index={index}
                          active={index === activeEntry}
                          handleEntryClick={this.handleEntryClick}
                          key={entry.id}
                        />
                      ))
                    }
                  </View>
                } else {
                  return <View style={{
                    flexGrow: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 500,
                  }}>
                    {!!loading && <ActivityIndicator size="small" color={colors.primary} />}
                    {!loading && <View style={{flexDirection: 'row', alignItems: "center"}}>
                      <Feather style={{
                        color: colors.tertiary,
                        fontSize: 25,
                      marginRight: 10,
                      }} name="zap-off" />
                      <Text style={{color: colors.tertiary, fontSize: 20}}>{error ? error : 'You have not added any entries to your diary, please click \'plus\' button to get started.'}</Text>
                    </View>}
                  </View>
                }
              })()
            }
          </ScrollView>
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
})(Entries);
