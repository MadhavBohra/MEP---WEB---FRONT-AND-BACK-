'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './UserDetailsforms.css';
import Link from 'next/link';
import axios from 'axios';
import { StoreProvider } from '../StoreProvider';

interface FormData {
  username: string;
  profilePicture: File | null;
  address: string;
  bloodGroup: string;
  height: string;
  weight: string;
  email: string;
  phone: string;
}

const UserDetailsForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    profilePicture: null,
    address: '',
    bloodGroup: '',
    height: '',
    weight: '',
    email: '',
    phone: ''
  });

  const [avatar, setAvatar] = useState<string>('/avataricon.png'); 

  // Fetch user data
  const getData = async () => {
    try {
      const res = await axios.get('/api/user', { //change the relation name accordingly
        params: { email: formData.email }
      });
      const userData = res.data;

      // Set form data with the fetched user data
      setFormData({
        username: userData.username || '',
        profilePicture: null, // We are not handling file here
        address: userData.address || '',
        bloodGroup: userData.bloodGroup || '',
        height: userData.height || '',
        weight: userData.weight || '',
        email: userData.email || '',
        phone: userData.phone || ''
      });

      // Set avatar if profile picture URL is available
      if (userData.profilePicture) {
        setAvatar(userData.profilePicture);
      }
    } catch (error) {
      console.log(error);
      // Handle user not found or other errors
    }
  };

  useEffect(() => {
    if (formData.email) {
      getData();
    }
  }, [formData.email]);

  useEffect(() => {
    if (formData.profilePicture) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setAvatar(e.target.result);
        }
      };
      reader.readAsDataURL(formData.profilePicture);
    }
  }, [formData.profilePicture]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profilePicture: file
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedUserData = {
      username: formData.username,
      address: formData.address,
      bloodGroup: formData.bloodGroup,
      height: formData.height,
      weight: formData.weight,
      email: formData.email,
      phone: formData.phone,
    };

    try {
      // Update user details if user exists
      await axios.put(`/api/users`, updatedUserData); //change the relation name accordingly

      // Handle profile picture upload separately if necessary
      if (formData.profilePicture) {
        const formDataObj = new FormData();
        formDataObj.append('profilePicture', formData.profilePicture);
        await axios.post(`/api/users/upload`, formDataObj, { //change the relation name accordingly
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          params: {
            email: formData.email,
          }
        });
      }

      alert('User details updated successfully');
    } catch (error) {
      console.error('Error updating user details', error);

      // If user doesn't exist, create a new user
      try {
        const res = await axios.post('/api/users', updatedUserData);
        const newUserId = res.data.id; // Assuming the response contains the new user's ID


        if (formData.profilePicture) {
          const formDataObj = new FormData();
          formDataObj.append('profilePicture', formData.profilePicture);
          await axios.post(`/api/users/upload`, formDataObj, { //change the relation name accordingly
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            params: {
              email: formData.email,
            }
          });
        }

        alert('New user created successfully');
      } catch (createError) {
        console.error('Error creating new user', createError);
        alert('Failed to create new user');
      }
    }
  };

  return (
    <StoreProvider>
      <div className="body">
        <form onSubmit={handleSubmit} className="user-details-form">
          <div className="profile-picture-container">
            <img src={avatar} alt="User Avatar" className="avatar" />
            <div className="greeting">
              Hello, {formData.username || 'User'}!
            </div>
          </div>
          <div className="form-fields">
            <div className="left-column">
              <div className="form-group">
                <label>
                  Username:
                  <input type="text" name="username" value={formData.username} onChange={handleChange} />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Profile Picture:
                  <input type="file" onChange={handleFileChange} />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Blood Group:
                  <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="right-column">
              <div className="form-group">
                <label>
                  Height:
                  <input type="text" name="height" value={formData.height} onChange={handleChange} />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Weight:
                  <input type="text" name="weight" value={formData.weight} onChange={handleChange} />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Email:
                  <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Phone Number:
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="save-button">Save</button>
        </form>
      </div>
    </StoreProvider>
  );
};

export default UserDetailsForm;
