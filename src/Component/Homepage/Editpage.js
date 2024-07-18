import React, { useState, useEffect } from "react";
import axios from "axios";
import moduleCss from './Editpage.module.css'


function Editpage() {
  // var temp = {};
  var datatoedit ={};
  const [data, setData] = useState([]);
  const  [newData,SetNewData] = useState({});
  const [index,setIndex] = useState();
  const [isEditMode,setEditmode] = useState();
  
  function getData(id,i) {

    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        SetNewData(response.data);
        setIndex(i);
        setEditmode()
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handelDelte = (id) => {
    // axios
    //   .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    //   .then((res) => {
    //     const updatedPosts = data.filter((post) => post.id !== id);
    //     setData(updatedPosts);
    //   })
    //   .then(() => alert("Post Deleted!"))
    //   .catch((err) => console.log(err));
  };

  const handleChange = (e) =>{
     const name = e.target.name;
     const value = e.target.value;

     SetNewData({...newData, [name]:value});
     //console.log(name+' '+value+' '+newData.title+' '+newData.body)
  };
  


  const handelSubmmit = (e)=>{
    e.preventDefault();
    const id = newData.id;
    // POST => url,newData
     axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,newData)
    .then(res=>{
      // push newData to data(state object)
        //arr.push(newdata);
        const newDataArr = [...data];
         newDataArr = index
        newDataArr.push(res.data);
        setData(newDataArr)

    })
    // .catch(err=>console.log(err));
    // e.preventDefault();
    // console.log(newData);
    
  }

    const handleUpdate =(id)=>{
      //  axios.put(`https://jsonplaceholder.typicode.com/posts ${id}`)
      //  .then(res=>{
          
      //  })
    }
  
   
  return (
    <>
       {/* {
         editodata =temp
       } */}
      <div className="text-center">
        <form onSubmit={handelSubmmit} className="table">
          <br />
          <br />
          <input type="text" placeholder="Title" name="title" onChange={handleChange} defaultValue={newData.title || ''}/>
          <br/>
          <br/>
          <input type="text" placeholder="Description" name="body" onChange={handleChange} defaultValue={newData.body || ''}/>
            <br/>
            <br/>
          <input type="submit" value="submit" className="btn btn-outline-primary" /> <button className="btn btn-outline-danger">Cancel</button>
          <br />
        </form>
      </div>
      {data && data.map((value, index) => (
        
        <div key={index} className={moduleCss.main}>
          <div>
            {value.title}{" "}

            <span className={moduleCss.fr} onClick={()=>getData(value.id,index)}>
                 <i className="fa fa-edit"></i>
              </span>

          </div>
        </div>
      ))}
      
    </>
  );
}

export default Editpage;
