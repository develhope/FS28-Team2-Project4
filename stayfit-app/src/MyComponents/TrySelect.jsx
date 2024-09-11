import React, { useState } from 'react';
import { SelectBox } from './SelectBox';
import Button from './Button';

export const TrySelect = () => {
  const [formData, setFormData] = useState({
    gender: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const genderOptions = [
    { value: 'male', label: 'Maschio' },
    { value: 'female', label: 'Femmina' },
    { value: 'other', label: 'Altro' },
  ];

  return (
    <form className="flex flex-col gap-5 justify-center items-center">
      <SelectBox
        label="Sesso"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        options={genderOptions}
        required
      />
      <Button
      type={'submit'} onClick={''} text={'Invia ora!'}></Button>
    </form>
  );
};
