import axios from "axios";
import { useState, useEffect } from "react";

const ContactList = ({ setContacts, contacts }) => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const API = import.meta.env.VITE_BACKEND_URL;


  useEffect(()=>{
      const fetchContacts = async ()=> {
        setLoading(true);
        const query =`?status=${filter}&search=${search}`
        const fetchPromise=await axios.get(`${API}/contacts${query}`)
        .then((res)=>setContacts(res.data))
        .catch((err)=>console.log(err));
        const delay=new Promise((resolve)=>setTimeout(resolve,1000));
        await Promise.all([fetchPromise,delay])
        setLoading(false)
      }
      fetchContacts()
  },[filter,search,setContacts])

  const handleStatusChange= async(id,status)=>{
    try {
      await axios.put(`${API}/contacts/${id}`,{status});
      setContacts((prev)=> prev.map((c)=>c._id === id ? {...c,status}:c))
    } catch (err) {
      console.log(err);  
    }
  }

   const handleDelete = async(id)=>{
    if(confirm('are you syre you want to delete?')){
      try {
         await axios.delete(`${API}/contacts/${id}`)
         setContacts((prev)=>prev.filter((c)=>c._id!==id ))
      } catch (err) {
        console.log(err);

      }
    }
   }

 return (
  <>
    {/* Top controls */}
    <div className="flex gap-10">
      <select
        className="p-2 rounded bg-[#00277a] text-white cursor-pointer outline-0"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">All status</option>
        <option value="Interested">Interested</option>
        <option value="Follow-up">Follow-up</option>
        <option value="Closed">Closed</option>
      </select>

      <input
        type="text"
        placeholder="search by name or company"
        className="p-3 rounded w-full bg-[#eff4ff] outline-0"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {/* Loading */}
    {loading ? (
      <div className="w-full h-[415px] flex flex-col items-center justify-center rounded-[5px] p-[20px] mt-10 gap-4">
        <img src="/loading.svg" alt="loading" width={100} height={200} />
        <p className="text-[#00277a] text-2xl">Loading...</p>
      </div>
    ) : (
      <>
        <div className="mt-10">
          {/* Empty state */}
          {contacts.length === 0 && (
            <div className="w-full h-[415px] flex flex-col items-center justify-center rounded-[5px] p-[20px] mt-10 gap-4 bg-[#eff4ff]">
              <img src="/no_contact.jpg" alt="no contacts" width={100} height={200} />
              <p className="text-[#00277a] text-2xl">No Contacts Found</p>
            </div>
          )}

          {/* Contact cards */}
          <div className="grid grid-cols-2 gap-10">
            {contacts.map((c) => (
              <div
                key={c._id}
                className="bg-[#eff4ff] shadow-md rounded p-4 flex flex-col justify-between hover:shadow-lg transition"
              >
                <div className="text-gray-500 text-sm flex gap-2 mb-5 justify-between items-center">
                  <h3 className="font-bold text-2xl text-[#00277a]">
                    {c.name}
                  </h3>
                  <p className="text-[#00277a] p-2 px-4 rounded bg-[#d4e6ff] font-medium">
                    {c.company}
                  </p>
                </div>

                {/* Email + Phone with border */}
                <div className="text-[16px] flex justify-between border-2 border-[#0027a2] px-3 py-3 rounded">
                  <p>📧 {c.email}</p>
                  <p>📱 {c.phone}</p>
                </div>

                {/* Status + Delete BELOW (no border) */}
                <div className="flex justify-between items-center mt-4">
                  <select
                    className="p-1 rounded cursor-pointer outline-0 shadow"
                    value={c.status}
                    onChange={(e) =>
                      handleStatusChange(c._id, e.target.value)
                    }
                  >
                    <option value="Interested">Interested</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Closed">Closed</option>
                  </select>

                  <button onClick={()=>{handleDelete(c._id)}} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    )}
  </>
);

}

export default ContactList;