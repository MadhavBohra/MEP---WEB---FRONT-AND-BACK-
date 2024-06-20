'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserDetails } from '../actions/userActions';
import './UserDetailsforms.css';
import Link from 'next/link';
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          <Link href='/UserDashboard'><button type="submit" className="save-button">Save</button></Link>
        </form>
      </div>
    </StoreProvider>
  );
};

export default UserDetailsForm;
