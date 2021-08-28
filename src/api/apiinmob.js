import firebase from 'firebase/app';

async function pushUserData(userData) {
    let stringUserUid = window.localStorage.getItem('uid') || 'alexei suzdalenko';
    return firebase.database().ref('users/' + stringUserUid).set(userData);
}

export default {
    pushUserData
}