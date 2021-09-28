import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchCount } from './counterAPI'

// state数据的初始值
const initialState = {
  value: 0,
  status: 'idle',
}

/**
 * 下面的函数称为 thunk，它允许我们执行异步逻辑。 
 * 它可以像常规操作一样调度：`dispatch(incrementAsync(10))`。 
 * 这个将使用 `dispatch` 函数作为第一个参数调用 thunk。 
 * 异步然后可以执行代码并可以调度其他操作。 thunk 是通常用于发出异步请求。
*/
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount)
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
)

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  //`reducers` 字段让我们可以定义 reducer 并生成相关的操作
  reducers: {
    increment: (state) => {
      /**
       * Redux Toolkit 允许我们在 reducer 中编写“变异”逻辑。 
       * 它实际上不会改变状态，因为它使用了 Immer 库，
       * 它检测到“草稿状态”的变化并产生一个全新的基于这些变化的不可变状态
      */
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // 使用 PayloadAction 类型声明 `action.payload` 的内容
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
  // extraReducers 字段处理在别处定义的动作
  // 包括由 createAsyncThunk 或其他的操作
  extraReducers: (builder) => {
    console.log('builder :>> ', builder)
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value += action.payload
      })
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

/**
 * 下面的函数称为选择器，它允许我们从中选择一个值状态。 
 * 也可以在使用它们的地方内联定义选择器而不是
 * 在切片文件中。 
 * 例如：`useSelector((state: RootState) => state.counter.value)`
 * */ 
export const selectCount = (state) => state.counter.value

/**
 * 我们也可以手工编写 thunk，它可能包含同步和异步逻辑。
 * 下面是一个基于当前状态有条件地分派动作的例子。
*/
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState())
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount))
  }
}

export default counterSlice.reducer
