import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import './styles.css'
import Comments from './Comments';
import Spinner from './Spinner';
const NewStatus=(props)=>{
    const [counterComment,setCounterComment]=React.useState(0);
    const [refresh,setRefresh]=useState(0);
    const [loading,setLoading]=useState(true);
    const [likes,setLikes]=useState([]);
    const [every,setEvery]=useState([]);
    const [input,setInput]=useState([]);
    const [commentForSend,setCommentForSend]=useState("");
    const handleLike=(e)=>{
      setRefresh(refresh+1);
        let temp=+e.target.id;
        setLikes(data=>data.map((count,idx)=>{
            return idx==temp?count+1:count
        }));
        fetch(`https://facebook-react-backend.herokuapp.com/likes/${temp}`)
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(err=>console.log(err));

        
    }
    const handleComment=(e)=>{
        console.log(`checking if comment ${e.target.id}`,e.target.value);
        let temp=+e.target.id;
        let c=e.target.value;
        setInput(data=>data.map((item,idx)=>{
            return temp===idx ? c:item
        }));
        
    }
    const sendComment=(e,idxx)=>{
        let i=idxx;
        let statusname=`status${e.target.id}`
        console.log("for sending",input[i],"id ",i)
        setCommentForSend(input[i]);
        setInput(input.map((item,idx)=>{
            return idx==i? "":item;
        }));
        fetch("https://facebook-react-backend.herokuapp.com/postcomment",{
          method:"POST",
          body:JSON.stringify({
            id:statusname,
            comment:input[i]
          }),
          headers:{
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(res=>res.json())
        .then(data=>{console.log(data);setCounterComment(counterComment+1)})
        .catch(err=>console.log(err))
    }
    React.useEffect(()=>{
           
              setLikes(prev=>prev.concat([0]));
             
             setInput(prev=>prev.concat([""]));
             fetch('https://facebook-react-backend.herokuapp.com/getstatus')
             .then(res=>res.json())
             .then(data=>{setEvery(data);setLoading(false)})
             .catch(err=>console.log(err))
              
    },[props.newstatus,refresh,counterComment]);
    return(
    <div>
      {loading===true?<Spinner/>:""}
    <div>
        {every.map((item,index)=>{
            return (
              <div className="card" style={{marginTop:"10px"}} >
                <div className="card-body">
                     
                    <h6 className="card-subtitle mb-2 text-muted">Status {index+1}</h6>
                  <p className="card-text">
                    {item.status}
                  </p>
                  <div>
                    <span><button className="btn btn-outline-info btn-sm" id={item._id} onClick={handleLike}>Like&nbsp;<FontAwesomeIcon icon={faThumbsUp} /></button></span>
                </div>
                    <p className="style-likes">{item.likes} Likes</p>
                    <div><Comments statusNo={item._id} check={counterComment}/></div>
                </div>
                <div className="form-row" style={{marginTop:"10px"}}>
                    <div className="col-8" style={{marginLeft:"20px",marginBottom:"10px"}}><input id={index} className="form-control form-control-sm" value={input[index]} onChange={handleComment} type="text"></input></div>
                    <div className="col"style={{marginLeft:"5px"}}><button id={item._id} className="btn btn-outline-success btn-sm" onClick={(e)=>sendComment(e,index)}>Comment</button></div>
                </div>
              </div>
            );
        })}
    </div>
    </div>
    );


}

export default NewStatus;