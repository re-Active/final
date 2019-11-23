import React, {useState} from 'react'
import {View, TextInput, Button, StyleSheet, Modal} from 'react-native'


const GoalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState('')
    const goalInputHandler = (enteredText) => {
        setEnteredGoal(enteredText)
      }
    const addGoalHandler = () => {
      props.onAddGoal(enteredGoal) // bind할 필요 없음
      setEnteredGoal('') // 글자 없어지게
    }
    return (

      <Modal visible={props.visible} animationType='slide'>
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

          {/* bind때문에 에러 떴었음 - 여기에서 onPress -> onAddGoal 속성을 부모 컴포넌트한테 받음. 이때 입력받은 값을 기존의 배열에 추가하겠다는 것
          -> 여기서 enteredGoal을 입력값으로 받아 value로 넘기는 과정에 필요하니Rk bind필요 : this는 onAddGoal*/}
        </View>

        </View>
      </Modal>


    )}

const styles = StyleSheet.create({
    inputContainer: {
        flex:1,
        justifyContent: 'center', 
        alignItems: "center"
      },
    input: { 
      width:"80%",
      borderColor: 'black', 
      borderWidth: 1, 
      padding: 10 },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '60%'
    },
    button: {
      width: '40%'
    }
})

export default GoalInput