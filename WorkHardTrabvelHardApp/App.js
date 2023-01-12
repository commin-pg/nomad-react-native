import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, TextInput, ScrollView } from 'react-native';
import { theme } from './color.js';




export default function App() {
  const [working, setWorking] = useState(true);
  const [toDos, setToDos] = useState({})
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const [text, setText] = useState("");
  const onTextChange = (e) => {
    console.log(e)
    setText(e);
  }
  const addTodo = () => {
    if (text === '') {
      return;
    }

    // const newTodo = Object.assign({}, toDos, { [Date.now()]: { text, work: working, done: false } });
    const newTodo = { ...toDos, [Date.now()]: { text, work: working, done: false } }
    setToDos(newTodo);
    setText("");
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{ ...styles.btnText, color: working ? 'white' : theme.grey }}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{ ...styles.btnText, color: working ? theme.grey : "white" }}>Travel</Text>
        </TouchableOpacity>

      </View>

      <TextInput
        onSubmitEditing={addTodo}
        returnKeyType='done'
        onChangeText={onTextChange}
        value={text} style={styles.input} placeholder={working ? 'Add a To do' : 'Where do you want to go?'}></TextInput>

      <ScrollView >
        {
          Object.keys(toDos).length > 0 &&

          Object.keys(toDos).map(
            (key) => (
              <View style={styles.todo} key={key}>
                <Text style={styles.todoText}> {toDos[key].text} </Text>
              </View>
            )
          )
        }
      </ScrollView>

    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: '600'
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18
  },
  todo: {
    backgroundColor: theme.grey,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 15
  },
  todoText: {
    color: 'white',
    fontSize: 15,
  }
});
