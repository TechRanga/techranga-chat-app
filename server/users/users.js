const users = [];

const addUser = ({id,userName,chatRoom})=>{
    userName = userName.trim().toLowerCase();
    chatRoom = chatRoom.trim().toLowerCase();

    const userExists = users.find(user=>{user.chatRoom===chatRoom && user.userName===userName});
    if(userExists){
        return {message:"UserName is taken"};
    }

    const user = {id,userName,chatRoom};
    users.push(user);

    return {user};
};

const removeUser=(id)=>{
    const index = users.findIndex(
        user=>{
            user.id===id;
        }
    )
    if(index!==-1){
        return users.splice(index,1);
    }
};

const getUser=(id)=>{
  users.find((user)=>{user.id===id});
};

const getUsersInRoom=(chatRoom)=>{
 users.filter((user)=>user.chatRoom===chatRoom);
};


module.exports = {addUser,removeUser,getUser,getUsersInRoom};



