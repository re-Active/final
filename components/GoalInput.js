import React, {useState} from 'react'
import {View, TextInput, Button, StyleSheet, Modal} from 'react-native'


const GoalInput = props => {

    id = 0
    state = {
      information : [{
        id:1,
        name: '신지영'
      }]
    }
    const handleState = (data) => {
      const {information} = this.state
      this.setState({
        information: information.concat({id:this.id++, ...data})
      })
      console.log(this.state)
    } 

    const [enteredGoal, setEnteredGoal] = useState('')
    const goalInputHandler = (enteredText) => {
        setEnteredGoal(enteredText)
      }
    const addGoalHandler = () => {
      props.onAddGoal(enteredGoal) // bind할 필요 없음
      setEnteredGoal('') // 글자 없어지게
      // handleTemp(enteredGoal)
      handleState(enteredGoal)
      console.log(enteredGoal)
      console.log(temp)
    }
    return (

        <View style={styles.inputContainer}> 
        {/* 이게 아니었으면 열단위로 나왔을 것 */}
        <TextInput 
        placeholder="Course Goal" 
        style={styles.input}  
        // 이벤트 발생 이야기 하는 듯
        onChangeText={goalInputHandler} 
        value={enteredGoal}/>
        {/* 함수여도 () 안붙이는 것 주의 */}

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="CANCEL" color="red" onPress={props.onCancel}/>
          </View>
          <View style={styles.button}>
            <Button title="ADD" onPress={addGoalHandler} />
          </View>
        </View>
        </View>


    )}

const styles = StyleSheet.create({

    input: { 
      borderColor: 'black', 
      borderWidth: 1, 
      padding: 10 },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%'
    },
    button: {
      alignContent: 'center',
      marginTop: 10,
      width: '40%'
    }
})

export default GoalInput