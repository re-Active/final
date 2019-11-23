import React, {useState} from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Button, FlatList, Modal } from 'react-native'
import { Actions } from 'react-native-router-flux'
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'
import ToggleSwitch from 'toggle-switch-react-native'
// Push notification 구현을 위해서 필요 
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'


const About = () => {
   const goToHome = () => {
      Actions.home()
   }
   //
   let modalon = false
   const [courseGoals, setCourseGoals] = useState([])
   const [isAddMode, setIsAddMode] = useState(false)

   const addGoalHandler = goalTitle => {
      setCourseGoals(currentGoals => [
        ...currentGoals, 
        { id: Math.random().toString(), value: goalTitle }
      ])
      setIsAddMode(false)
    }
    const removeGoalHandler = goalId => {
      setCourseGoals(currentGoals => {
        return currentGoals.filter((goal) => goal.id !== goalId )
      })
    }
  
    const cancelGoalAdditionHandler = () => {
      setIsAddMode(false)
    }

    // Push 알람 받을건지 묻는 함수 
    askPermissions = async () => {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        return false;
      }
      return true;
    };
  
    // 바로 Push 알람 보내는 함수 
    sendNotificationImmediately = async () => {
      let notificationId = await Notifications.presentLocalNotificationAsync({
        title: "This is crazy",
        body: "Your mind will blow after reading this"
      });
      console.log(notificationId); // can be saved in AsyncStorage or send to server
    };

   return (
      <View>
         {/* <TouchableOpacity style = {{ margin: 128 }} onPress = {goToHome}>
         <Text>달라짐?</Text>
         </TouchableOpacity> */}
         <View style={styles.screen} >
          <View >
          <Text style={styles.main}>Add your Plan, here!</Text>
          </View>
         <GoalInput 
         onAddGoal={addGoalHandler} 
         onCancel={cancelGoalAdditionHandler}
         onChange={(modalon) => !modalon}
         />
         <View style={styles.card}>
           {
             this.modalon ? <Text>(무)신한스포츠/레저보장보험</Text> : null
           }
           
         </View>
         <ToggleSwitch
          
          isOn={false}
          onColor="green"
          offColor="red"
          label="Example label"
          labelStyle={{ color: "black", fontWeight: "900" }}
          size="large"
          onToggle={isOn => !isOn}
        />
        {/* Push 알람 설정 동의 확인 창이 나오는 함수 */}
        {/* 한번만 누르면 됨 */}
        <Button
          title="Please accept Notifications Permissions"
          onPress={() => this.askPermissions()}
        />
        {/* 버튼 누르면 바로 Push 알람 옵니다. */}
        <Button
          title="Send Notification immediately"
          onPress={() => this.sendNotificationImmediately()}
        />
        {/* 일단은 무시 */}
        <Button
          title="Dismiss All Notifications"
          onPress={() => Notifications.dismissAllNotificationsAsync()}
        />
         <FlatList 
         keyExtractor={(item,  index) => item.id}
         data={courseGoals} 
         renderItem={itemData => <GoalItem id={itemData.item.id} onDelete={removeGoalHandler} title={itemData.item.value}/>}
         />
         </View>
         <TouchableOpacity style = {{ margin: 128 }}>
         <Button title='[뒤로가기]' onPress = {goToHome}/>
         </TouchableOpacity>

      </View>

   )
}


const styles = StyleSheet.create({
   screen: {
     padding: 50
   },
   main: {
     alignContent: 'center',
     fontSize: 20,
   },
   insuranceItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1
  },
  card: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
    elevation: 8,//andriod에는 shadow안되므로
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
 })
 
export default About