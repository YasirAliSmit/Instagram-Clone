import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SignInStack,SignOutStack } from '../stackNavigater/stack'
import { firebase } from '@react-native-firebase/auth'
const AuthNavigation = () => {
    const [currentUser,setCurrentUser] = useState(null)
    const userHandler = (user) => {
        user?setCurrentUser(user):setCurrentUser(null)
    }
    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user=>userHandler(user))
    },[])
  return (<>{currentUser?<SignInStack/>:<SignOutStack/>}</>)
}

export default AuthNavigation

const styles = StyleSheet.create({})