// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import moduleCss from '../Homepage/Homepage.module.css'


// function HomePage() {
 
//   const [data, setData] = useState([]);
//   const  [newData,SetNewData] = useState({});
  
  
//   function getData() {
//     axios
//       .get("https://jsonplaceholder.typicode.com/posts")
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((err) => console.log(err));
//   }

//   useEffect(() => {
//     getData();
//   }, []);
//   const handelDelte = (id) => {
//     axios
//       .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
//       .then((res) => {
//         const updatedPosts = data.filter((post) => post.id !== id);
//         setData(updatedPosts);
//       })
//       .then(() => alert("Post Deleted!"))
//       .catch((err) => console.log(err));
//   };

//   const handleChange = (e) =>{
//      const name = e.target.name;
//      const value = e.target.value;

//      SetNewData({...newData, [name]:value});
//   };
  


//   const handelSubmmit = (e)=>{
//     // POST => url,newData
//     axios.post(`https://jsonplaceholder.typicode.com/posts`,newData)
//     .then(res=>{
//       // push newData to data(state object)
//         //arr.push(newdata);
//         const newDataArr = [...data];
//         newDataArr.push(res.data);
//         setData(newDataArr)

//     })
//     .catch(err=>console.log(err));
//     e.preventDefault();
//     console.log(newData);
    
//   }

//     const handleUpdate =(id)=>{
//        axios.put(`https://jsonplaceholder.typicode.com/posts ${id}`)
//        .then(res=>{
          
//        })
//     }
  

//   return (
//     <div>
    
//       <div className="text-center">
//         <form onSubmit={handelSubmmit} className="table">
//           <br />
//           <br />
//           <input type="text" placeholder="title"  name="title" onChange={handleChange}  />
//           <br />
//           <br />
//           <textarea cols="23" rows="3"  name="body"  onChange={handleChange}></textarea>
//           <br />
//           <br />
//           <input type="submit" value="submit" class="btn btn-outline-primary" /> <button class="btn btn-outline-danger">Cancle</button>
//           <br />
//         </form>
//       </div>
//       {data.map((value, index) => (
//         <div key={index} className={moduleCss.main}>
//           <div>
//             {value.title}{" "}
//             <span className={moduleCss.fr}>
//               <i class="fa fa-trash" onClick={() =>{
//                 if(  window.confirm("Are you Sure To Delete Data?")){
//                   handelDelte(value.id)

//                 }
//               } }></i>
             
//               <i className="fa fa-edit" onClick={()=>{
//                 if(window.confirm("Are you sure To edit?")){
//                   handleUpdate(value.id,index)
//                 }
//               } }></i>
              
              
//             </span>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default HomePage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import moduleCss from './Homepage.module.css'

function Homepage() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({});
  const [index, setIndex] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getData = (id, index) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        setNewData(response.data);
        setIndex(index);
        setIsEditMode(true);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewData({ ...newData, [name]: value });
  };

  const handleSubmitOrUpdate = (e) => {
    e.preventDefault();
    if (isEditMode) {
      handleUpdate();
    } else {
      handleSubmit();
    }
  };

  const handleUpdate = () => {
    const id = newData.id;
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${id}`, newData)
      .then(res => {
        setData(prevData => {
          const newDataArr = [...prevData];
          newDataArr[index] = newData;
          return newDataArr;
        });
        setIsEditMode(false);
        alert("Post Updated!");
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        setData(prevData => prevData.filter((post) => post.id !== id));
        alert("Post Deleted!");
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    axios
      .post(`https://jsonplaceholder.typicode.com/posts`, newData)
      .then((res) => {
        setData(prevData => [...prevData, res.data]);
        alert("Post Submitted!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="text-center">
        <form onSubmit={handleSubmitOrUpdate} className="table">
          <br />
          <br />
          <input type="text" placeholder="Title" name="title" onChange={handleChange} value={newData.title || ''}/>
          <br/>
          <br/>
          <input type="text" placeholder="Description" name="body" onChange={handleChange} value={newData.body || ''}/>
          <br/>
          <br/>
          <input type="submit" value={isEditMode ? "Update" : "Submit"} className="btn btn-outline-primary" />
          <br />
        </form>
      </div>
      {data && data.map((value, index) => (
        <div key={index} className={moduleCss.main}>
          <div>
            {value.title}{" "}
            <span className={moduleCss.fr}>
              <i className="fa fa-edit" onClick={() => getData(value.id, index)}></i>
              <i className="fa fa-trash m-2 ps-3" onClick={() => { if (window.confirm("Are you Sure To Delete Data?")) { handleDelete(value.id); } }}></i>
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

export default Homepage;
