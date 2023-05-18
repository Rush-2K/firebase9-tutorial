import { initializeApp } from 'firebase/app'
import { 
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp
 } from 'firebase/firestore'

 const firebaseConfig = //your firebase configuration

  // init firebase
initializeApp(firebaseConfig)

// initialize firestore services
const db = getFirestore()

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