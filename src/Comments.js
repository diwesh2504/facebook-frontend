import React,{useState} from 'react';

const Comments=(props)=>{
    const [count,setCount]=React.useState(0);
    const [comments,getComments]=useState([]);
    React.useEffect(()=>{
        fetch(`https://facebook-react-backend.herokuapp.com/getcomments/status${props.statusNo}`)
        .then(res=>res.json())
        .then(response=>{getComments(response);setCount(count+1)})
        .catch(err=>console.log(err))
    },[props.statusNo,count])
    return(
        <div className="card" >
        <ul class="list-group list-group-flush">
            {comments.map((comm)=>{
                return (<li className="list-group-item">{comm.data}</li>)
            })}
        </ul>
            
        </div>
    )
}

export default Comments;