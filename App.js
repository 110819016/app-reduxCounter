import React from "react";
import {Provider, useDispatch, useSelector} from "react-redux";
import {configureStore, createSlice} from "@reduxjs/toolkit";
import {NativeBaseProvider, Text, HStack, Button, Center} from "native-base";

//Part1 Define Slice (including reducers and actions)
const initialState = { counterValue: 0};

const counterSlice = createSlice({
  name: 'counter',
  initialState,

  reducers:{
    setCounter: (state, action) =>{
      state.counterValue = action.payload;
    }
  }
})

const selectCounter = (state) => state.counter.counterValue;
const { setCounter } = counterSlice.actions;

//Part2 Combine Reducers and Create a Store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})



const Screen = () =>{

  //Get states from store
  const { counter } = useSelector((state)=> state.counter);

  //Define a dispatch to send actions
  const dispatch = useDispatch();

  return(
    <NativeBaseProvider>
      <Center flex={1} bg="white">
        <HStack space={20}>
          <Button borderRadius={0} width={70}
            onPress={()=>dispatch(setCounter(counter+1))}>
            <Text fontSize={40} color="white">+</Text>
          </Button>
          <Button borderRadius={0} width={70}
            onPress={()=>dispatch(setCounter(counter-1))}>
            <Text fontSize={40} color="white">-</Text>
          </Button>
        </HStack>
        <HStack>
          <Text fontSize={40} mt={20} color="black">
            {counter}
          </Text>
        </HStack>
      </Center>
    </NativeBaseProvider>
  )
}

//Wrap whole screen in a provider
const App = () =>{
  return(
    <Provider store={store}>
      <Screen/>
    </Provider>
  )
}

export default App;




