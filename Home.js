  
import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import { Text, View, StyleSheet, Alert, Button } from "react-native";
import { Agenda } from "react-native-calendars";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button as Btn,
  Icon,
  Badge,
  Left,
  Right,
} from "native-base";
import Drawer from 'react-native-drawer'

class Application extends Component {  
  closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };
  render () {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={<ControlPanel />}
        >
        <MainView />
      </Drawer>
    )
  }
}
const goToAbout = () => {
  Actions.about();
};

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {
        "2017-06-14": [
          {
            height: 50,
            name: "0614"
          }
        ],
        "2017-06-17": [
          {
            height: 50,
            name: "0617"
          }
        ]
      },
      data: [],
      tempDate: ""
    };
  }

  updateDate(temp) {
    this.setState({ tempDate: temp });
  }

  render() {
    return (
      <Container>
        <Header>
        <Left><Btn><Icon name="settings" /></Btn></Left>
          <Text>전체 일정보기</Text>
          <Right>
            <Btn><Icon name="search" /></Btn>
            <Btn><Icon name="menu" /></Btn>
            </Right>
        </Header>
       {/* <Content> */}
          <Agenda
            items={this.state.items}
            onDayPress={this.onDayPress.bind(this)}
            // loadItemsForMonth={this.loadItems.bind(this)}
            selected={"2017-06-16"}
            renderItem={this.renderItem.bind(this)}
            renderEmptyData={this.renderEmptyData.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
          />
        {/* </Content> */}
        <Footer class="footer" backgroundColor="blue">
        <FooterTab>
            <Btn badge vertical>
              <Badge><Text>2</Text></Badge>
              <Icon name="home" />
              <Text>Apps</Text>
            </Btn>
            <Btn active vertical>
              <Icon name="home"/>
              <Text>홈</Text>
            </Btn>
            <Btn vertical>
              <Icon name="people" />
              <Text>커뮤니티</Text>
            </Btn>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

  onDayPress(day) {
    const temp = day.dateString;
    this.updateDate(temp);
  }

  renderItem(item) {
    // console.log(item)
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text>{item.name}</Text>
        <Button title="일정 수정" onPress={goToAbout} />
      </View>
    );
  }

  renderEmptyData() {
    return (
      <View style={styles.emptyDate}>
        <Button title="일정 추가" onPress={goToAbout} />
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "lightgray",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  Container: {
    backgroundColor: 'red',
  }

})