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
      },
      data: [],
      tempDate: ''
    };
  }

  updateDate(temp) {
    this.setState(
      {tempDate: temp}
    )
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        onDayPress={this.onDayPress.bind(this)}
        // loadItemsForMonth={this.loadItems.bind(this)}
        selected={'2017-05-16'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyData={this.renderEmptyData.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}

      />
    );
  }


  onDayPress(day) {
    const temp = day.dateString
    this.updateDate(temp)
  }

  renderItem(item) {
    // console.log(item)
    return (
      <View style={[styles.item, {height: item.height}]}>
        <Text>{item.name}</Text>
        <Button
          title="Update item"
          // onPress={()=> console.log(this.state.tempDate)}
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
          onPress={goToAbout}
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