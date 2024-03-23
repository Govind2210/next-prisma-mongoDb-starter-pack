'use client'
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User registered:', data);
        setFormData({
          email: '',
          name: '',
          password: ''
        });
      } else {
        const errorData = await response.json();
        console.error('Error registering user:', errorData);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="real-Form flex flex-col justify-center items-center mt-8">
      <h4 className='mb-4 font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-xl'>PRISMA.IO With MONGODB</h4>
      <div className='mb-2'>
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          placeholder='Name'
          value={formData.name} 
          onChange={handleChange} 
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          required 
        />
      </div>
      <div className='mb-2'>
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          placeholder='Email'
          value={formData.email} 
          onChange={handleChange} 
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          required 
        />
      </div>
      <div className='mb-2'>
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          required 
        />
      </div>
      <button className='mb-2 w-52 mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-6 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' type="submit">Register</button>
    </form>
  );
}
