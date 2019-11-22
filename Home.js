import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert
} from 'react-native';
import {Agenda} from 'react-native-calendars';

const goToAbout = () => {
  Actions.about()
}

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {
        "2017-06-14": [
          {
            "height": 50,
            "name": "0614",
          }
        ],
        "2017-06-17": [
          {
            "height": 50,
            "name": "0617",
          }
        ]
      }
    };
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        // loadItemsForMonth={this.loadItems.bind(this)}
        selected={'2017-05-16'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyData={this.renderEmptyData.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}

      />
    );
  }

  // loadItems(day) {

  //   setTimeout(() => {
  //     for (let i = -15; i < 85; i++) {
  //       const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //       const strTime = this.timeToString(time);
  //       if (!this.state.items[strTime]) {
  //         this.state.items[strTime] = [];
  //         const numItems = Math.floor(Math.random() * 5);
  //         for (let j = 0; j < numItems; j++) {
  //           this.state.items[strTime].push({
  //             name: 'Item for ' + strTime,
  //             height: Math.max(50, Math.floor(Math.random() * 150))
  //           });
  //         }
  //       }
  //     }
  //     console.log(this.state.items);
  //     const newItems = {};
  //     Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
  //     this.setState({
  //       items: newItems
  //     });
  //   }, 1000);
  //   console.log(`Load Items for ${day.year}-${day.month}`);
  // }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}>
        <Text>{item.name}</Text>
        <Button
          title="Update item"
          onPress={goToAbout}
        />
      </View>
    );
  }

  renderEmptyData() {
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

  // timeToString(time) {
  //   const date = new Date(time);
  //   return date.toISOString().split('T')[0];
  // }
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