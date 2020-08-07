import React,{useState} from 'react';
import NewStatus from './NewStatus';

const Status=()=>{
    const [status_db,store_status]=useState();
    const [storeID,setStoreID]=useState([]);
    const [counter,setCounter]=useState(0)
    const [status,setStatus]=useState("");
    const [allstatus,setAllStatus]=useState([]);
    const handleChange=(e)=>{
        setStatus(e.target.value);
    }
    React.useEffect(()=>{
      fetch('https://facebook-react-backend.herokuapp.com/getstatus')
      .then(res=>res.json())
      .then(data=>{store_status(data);console.log(status_db)})
      .catch(err=>console.log(err));
      setStoreID(data=>data.map((item,idx)=>{
        return status_db[idx]._id;
      }))

    },[allstatus])

    const gen_ID=(arr)=>{
      var min = 1;
        var max = 1000;
        var random = Math.floor(Math.random() * (+max + 1 - +min) + +min);
        if (arr.indexOf(random) == -1) {
          arr.push(random);
          return random;
        } else {
          gen_ID(arr);
        }
    }
    const handleSubmit=()=>{
        console.log(status);
        let temp_json={
          id:gen_ID(storeID),
          stats:status
        }
        console.log("temporary json",temp_json);
        setAllStatus(status);
        fetch("https://facebook-react-backend.herokuapp.com/post",{
          method:"POST",
          /*body:JSON.stringify({
            id:counter,
            stats:status
          }),*/
          body:JSON.stringify(temp_json),
          headers:{
            "Content-type": "application/json; charset=UTF-8"
          }
        }).then(res=>res.json())
        .then(data=>console.log(data.ops))
        .catch(err=>console.log(err))
        setStatus("");
        setCounter(counter+1);
    }
    return (
      <div>
      <div className="card">
        
        <div className="card-body">
          <h5 className="card-title">What's on your mind?</h5>
          <div className="form-group">
            <textarea className="form-control" type="text" value={status} onChange={handleChange} placeholder="Let the world know..:)"></textarea>

          </div>
          
          <button className="btn btn-outline-dark" onClick={handleSubmit}>Add Status</button>
        </div>
      </div>
      <NewStatus newstatus={allstatus}/>
      </div>
    );

}

export default Status;