import { useState } from "react"
import axios from 'axios';

const ContactForm = ({setContacts,contacts}) => {

    const[name,setName]=useState('');
    const[company,setCompany]=useState('');
    const[email,setEmail]=useState('');
    const[phone,setPhone]=useState('');
    const[status,setStatus]=useState('Interested');


    const API = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit= async (e)=>{
       e.preventDefault();
       if(!name || !email) return alert("Name and Email are required")
      try {
        const res= await axios.post(`${API/contacts}`,{
          name,company,email,phone,status,
        })
        setContacts([res.data,...contacts])
        setName("");
        setEmail("");
        setCompany("");
        setPhone("");
        setStatus("Interested");
        
      } catch (err) {
        
      }
    }

  return (
   <form onSubmit={handleSubmit} className="space-y-6 " autoComplete="off">
   
   <input type="text" placeholder="Name" className="bg-[#eff4ff] p-3 rounded w-full
   text-[#0c002b] outline-0 " value={name} 
   onChange={(e)=>setName(e.target.value)} />
   
   <input type="text" placeholder="Company" className="bg-[#eff4ff] p-3 rounded w-full
   text-[#0c002b] outline-0 " value={company} 
   onChange={(e)=>setCompany(e.target.value)} />

   <input type="email" placeholder="Email" className="bg-[#eff4ff] p-3 rounded w-full
   text-[#0c002b] outline-0 " value={email} 
   onChange={(e)=>setEmail(e.target.value)} />

   <input type="tel" placeholder="Phone" className="bg-[#eff4ff] p-3 rounded w-full
   text-[#0c002b] outline-0 " value={phone} 
   onChange={(e)=>setPhone(e.target.value)} />

  
   <select value={status} className="bg-[#eff4ff] p-3 rounded w-full
   text-[#0c002b] outline-0 cursor-pointer" 
   onChange={(e)=>setStatus (e.target.value)}>
<option value="Interested">Interested</option>
   <option value="Follow-up">Follow-up</option>
   <option value="Closed">Closed</option>
   </select>
   
   

   <button type="submit" className="text-white px-4 py-3 rounded bg-[#00277a] hover:bg-[#001a52] 
    transition w-full mt-[10px] cursor-pointer">Submit</button>

   </form>
  )
}

export default ContactForm