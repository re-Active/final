// import React from 'react'
// import { View } from 'react-native'

// import Books from './src/Books'
// import rootReducer from './src/reducers'

// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import { Agenda } from 'react-native-calendars'

// // const store = createStore(rootReducer)

// export default class App extends React.Component {
//   render() {
//     return (
//       // <Provider store={store} >
//       //   <Books />
//       // </Provider>

//       <Agenda
//         // the list of items that have to be displayed in agenda. If you want to render item as empty date
//         // the value of date key kas to be an empty array []. If there exists no value for date key it is
//         // considered that the date in question is not yet loaded
//         items={{
//           '2019-11-16': [{text: 'item 1 - any js object'}],
//           '2019-11-17': [{text: 'item 2 - any js object'}],
//           '2019-11-18': [],
//           '2019-11-19': [{text: 'item 3 - any js object'},{text: 'any js object'}]
//         }}
//         // callback that gets called when items for a certain month should be loaded (month became visible)
//         loadItemsForMonth={(month) => {console.log('trigger items loading')}}
//         // callback that fires when the calendar is opened or closed
//         onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
//         // callback that gets called on day press
//         onDayPress={(day)=>{console.log('day pressed')}}
//         // callback that gets called when day changes while scrolling agenda list
//         onDayChange={(day)=>{console.log('day changed')}}
//         // initially selected day
//         selected={'2019-11-16'}
//         // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
//         minDate={'2019-11-10'}
//         // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
//         maxDate={'2020-05-30'}
//         // Max amount of months allowed to scroll to the past. Default = 50
//         pastScrollRange={50}
//         // Max amount of months allowed to scroll to the future. Default = 50
//         futureScrollRange={50}
//         // specify how each item should be rendered in agenda
//         renderItem={(item, firstItemInDay) => {return (<View />);}}
//         // specify how each date should be rendered. day can be undefined if the item is not first in that day.
//         renderDay={(day, item) => {return (<View />);}}
//         // specify how empty date content with no items should be rendered
//         renderEmptyDate={() => {return (<View />);}}
//         // specify how agenda knob should look like
//         renderKnob={() => {return (<View />);}}
//         // specify what should be rendered instead of ActivityIndicator
//         renderEmptyData = {() => {return (<View />);}}
//         // specify your item comparison function for increased performance
//         rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
//         // Hide knob button. Default = false
//         hideKnob={true}
//         // By default, agenda dates are marked if they have at least one item, but you can override this if needed
//         markedDates={{
//           '2019-11-11': {selected: true, marked: true},
//           '2019-11-23': {marked: true},
//           '2019-12-11': {disabled: true}
//         }}
//         // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
//         onRefresh={() => console.log('refreshing...')}
//         // Set this true while waiting for new data from a refresh
//         refreshing={false}
//         // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
//         refreshControl={null}
//         // agenda theme
//         // theme={{
//         //   ...calendarTheme,
//         //   agendaDayTextColor: 'yellow',
//         //   agendaDayNumColor: 'green',
//         //   agendaTodayColor: 'red',
//         //   agendaKnobColor: 'blue'
//         // }}
//         // agenda container style
//         style={{}}
//       />
//     )
//   }
// }


import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert
} from 'react-native';
import {Agenda} from 'react-native-calendars';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={'2017-05-16'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#666'},
        //    '2017-05-09': {textColor: '#666'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
    );
  }

  loadItems(day) {
    // const newItems = {};
    // // Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
    // this.setState({
    //   items: newItems
    // })
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}>
        <Text>{item.name}</Text>
        <Button
          title="Update item"
          onPress={() => Alert.alert('Update')}
        />
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Button
          title="Add item"
          onPress={() => Alert.alert('Add')}
        /> 
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});