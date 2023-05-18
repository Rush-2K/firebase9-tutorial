import { initializeApp } from 'firebase/app'
import { 
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc
 } from 'firebase/firestore'

 const firebaseConfig = //your firebase configuration

  // init firebase
initializeApp(firebaseConfig)

// initialize firestore services
const db = getFirestore()

//collection ref
const colRef = collection(db, 'books')

// get collection data
getDocs(colRef)
    .then((snapshot) => {
        let books = []
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id })
        })
        console.log(books)
    })
    .catch(err => {
        console.log(err.message)
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