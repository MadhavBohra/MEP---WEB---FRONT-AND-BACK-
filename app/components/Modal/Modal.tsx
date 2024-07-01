import React, { useState } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (steps: string, waterIntake: string, caloriesBurnt: string) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [steps, setSteps] = useState('');
  const [waterIntake, setWaterIntake] = useState('');
  const [caloriesBurnt, setCaloriesBurnt] = useState('');

  const handleSubmit = () => {
    onSave(steps, waterIntake, caloriesBurnt);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Update Data</h2>
        <label>
          Steps:
          <input type="number" value={steps} onChange={(e) => setSteps(e.target.value)} />
        </label>
        <label>
          Water Intake:
          <input type="number" value={waterIntake} onChange={(e) => setWaterIntake(e.target.value)} />
        </label>
        <label>
          Calories Burnt:
          <input type="number" value={caloriesBurnt} onChange={(e) => setCaloriesBurnt(e.target.value)} />
        </label>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
