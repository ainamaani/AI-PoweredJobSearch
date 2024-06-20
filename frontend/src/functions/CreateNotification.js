import axios from "axios";

const handleCreateNotification = async(user, subject, message) =>{
    try {
        const response = await axios.post('http://localhost:5550/api/notifications/create',
                                JSON.stringify({ user, subject, message  }),{
                                    headers:{
                                        'Content-Type':'application/json'
                                    }
                                }
        );
        if(response.status === 200){
            console.log(response.data);
        }
    } catch (e) {
        console.log(e);
    }
}


export default handleCreateNotification;