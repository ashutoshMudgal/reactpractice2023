import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
export default function dashboard(props) {
    const location = useLocation({});
    const [userData, setUserData] = useState({ firstName: '', lastName: '' });
    console.log(location,"askdjasdkjasdsakjdasdkj")
    useEffect(() => {
        if (localStorage.getItem('isAuthenticated')) {
            axios.get(`http://localhost:3006/users/dashboard/${location && location.state && location.state.id || localStorage.getItem('id')}`).then(result => {
                setUserData(result.data)
            })
        }
    }, [])
    if (localStorage.getItem('isAuthenticated')) {
        return <div>hello {userData.firstName} {userData.lastName}. kaise ho chotu</div>
    } else {
        return <div>Not authorized!</div>
    }
}