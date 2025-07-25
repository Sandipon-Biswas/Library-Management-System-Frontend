import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, incrementByAmount } from '../redux/CounterSlice'

const Counter = () => {
    const count = useSelector((state)=>state.counter.value);
 const dispatch = useDispatch()
  return (
    <div>
     
          </div>
  )
}

export default Counter
