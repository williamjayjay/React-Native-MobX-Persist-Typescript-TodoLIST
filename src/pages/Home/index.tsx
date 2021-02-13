import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Keyboard,
  Alert,
} from 'react-native';
import {observer, inject} from 'mobx-react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import useStore, { Todo } from '../../store/TodoList';

function Home() {
  const [newTask, setNewTask] = useState('');
  // const {total, todoStore, adicionarTodo, removerTodo} = TodoStore;

  const store = useStore()


  async function removeTask(item) {
    Alert.alert(
      'Deletar Task',
      'Tem certeza que deseja remover esta anotação?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => store.removerTodo(item),
        },
      ],
      {cancelable: false},
    );
  }

  async function addTask() {
    const search = store.todoStore.filter((task) => task.textTask === newTask);

    if (newTask != '') {
      if (search.length !== 0) {
        Alert.alert('Atenção', 'Nome da tarefa repetido!');
        return;
      }

      store.adicionarTodo({
        id: store.total,
        textTask: newTask,
      });

      setNewTask('');

      Keyboard.dismiss();
    } else {
      Alert.alert('Atenção', 'Digite alguma tarefa!');
    }
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.Body}>
          <FlatList
            data={store.todoStore}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            style={styles.FlatList}
            renderItem={({item }) => (
              <View style={styles.ContainerView}>
                <Text style={styles.Texto}>{item.textTask}</Text>
                <TouchableOpacity onPress={() => removeTask(item)}>
                  <Icon2
                    name="delete-forever"
                    size={28}
                    style={{color: '#f64c75'}}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <View style={styles.Form}>
          <TextInput
            style={styles.Input}
            placeholderTextColor="#999"
            autoCorrect={true}
            value={newTask}
            placeholder="Adicione uma tarefa"
            maxLength={25}
            onChangeText={(text) => setNewTask(text)}
          />
          <TouchableOpacity style={styles.Button} onPress={() => addTask()}>
            <Icon name="send" size={28} style={{color: 'white'}} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default (observer(Home));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
    backgroundColor: '#FFF',
  },
  Body: {
    flex: 1,
  },
  Form: {
    padding: 0,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingTop: 13,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  Input: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#888',
  },
  Button: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c6cce',
    borderRadius: 4,
    marginLeft: 10,
  },
  FlatList: {
    flex: 1,
    marginTop: 5,
  },
  Texto: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
  },
  ContainerView: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 4,
    backgroundColor: '#eee',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#eee',
  },
});
