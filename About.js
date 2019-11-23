import React, {useState} from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Button, FlatList } from 'react-native'
import { Actions } from 'react-native-router-flux'
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'
import ToggleSwitch from 'toggle-switch-react-native'


const About = () => {
   const goToHome = () => {
      Actions.home()
   }
   //
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
         />
         <ToggleSwitch
         
          isOn={false}
          onColor="green"
          offColor="red"
          label="Example label"
          labelStyle={{ color: "black", fontWeight: "900" }}
          size="large"
          onToggle={isOn => !isOn}
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
   }
 })
 
export default About