import axios from 'axios';

class DBConnect {

    getUsers(name) {
        axios.get('/api/users/' + name)
        .then((res) => {
            
        })
    }


}