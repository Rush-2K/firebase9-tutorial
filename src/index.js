import { initializeApp } from 'firebase/app'
import { 
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
 } from 'firebase/firestore'
 import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword
 } from 'firebase/auth'

//  const firebaseConfig = //your firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_toIKwWTplKQCWGce5f7TiqwUfgBmGls",
    authDomain: "fir-9-rush-2452a.firebaseapp.com",
    projectId: "fir-9-rush-2452a",
    storageBucket: "fir-9-rush-2452a.appspot.com",
    messagingSenderId: "1052320398643",
    appId: "1:1052320398643:web:fab76dc1edf5e860185246"
  };

  // init firebase
initializeApp(firebaseConfig)

// initialize firestore services
const db = getFirestore()
const auth = getAuth()

//collection ref
const colRef = collection(db, 'books')

// queries
const q = query(colRef, orderBy('createdAt'))

// real time collection data
onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
})

// adding docs
// add the add form to the const
const addBookForm = document.querySelector('.add')
// attach eventlistener to the form
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
  .then(() => {
    addBookForm.reset()
  })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})

//get a single document
const docRef = doc(db, 'books', '2jHieXdbe30N3QdeP1nE')

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

// updating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', updateForm.id.value)

    updateDoc(docRef, {
        title: 'updated title'
    })
    .then(() => {
        updateForm.reset()
    })
})

// sign up user
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user created:', cred.user)
            signupForm.reset()
        })
        .catch((err) => {
            console.log(err.message)
        })
})

// logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log('user has logged out')
        })
        .catch((err) => {
            console.log(err.message)
        })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
     .then((cred) => {
        console.log('user logged in:', cred.user)
     })
     .catch((err) => {
        console.log(err.message)
     })
  
})

