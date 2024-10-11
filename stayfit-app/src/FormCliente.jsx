import { useState, useEffect, useCallback } from 'react';
import Textbox from './MyComponents/Textbox.jsx';
import { SelectBox } from './MyComponents/SelectBox.jsx';
import Button from './MyComponents/Button.jsx';
import { useNavigate } from 'react-router-dom';
import camelcaseKeys from 'camelcase-keys';

const professionalId = localStorage.getItem('userId');

const FormCliente = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    email: '',
    phone: '',
    weight: '',
    height: '',
    allergies: '',
    foodIntolerances: '',
    activityLevel: '',
    fitnessGoals: '',
    workoutPreferences: '',
    availableTime: '',
    photo: null,
    username: '',
    password: '',
    professionalId: professionalId,
  });

  console.log(formData);


  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('formData'));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files.length > 0 ? files[0] : null,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isStepValid = useCallback(
    (step) => {
      switch (step) {
        case 0:
          return (
            formData.firstName &&
            formData.lastName &&
            formData.birthDate &&
            formData.gender
          );
        case 1:
          return formData.email || formData.phone;
        case 2:
          return formData.weight && formData.height;
        case 3:
          return formData.allergies && formData.foodIntolerances;
        case 4:
          return (
            formData.activityLevel &&
            formData.fitnessGoals &&
            formData.workoutPreferences &&
            formData.availableTime
          );
        case 5:
          return formData.photo;
        case 6:
          return (
            formData.username &&
            formData.password &&
            formData.confirmPassword &&
            formData.password === formData.confirmPassword
          );
        default:
          return false;
      }
    },
    [formData]
  );

  const totalStep = 6;
  const progress = (step / totalStep) * 100;

  const nextStep = (e) => {
    if (isStepValid(step)) {
      if (step === totalStep) {
        handleSubmit(e);
      } else {
        setStep((prevStep) => Math.min(prevStep + 1, totalStep));
      }
    } else {
      alert(
        'Compila tutti i campi obbligatori o assicurati che le password corrispondano.'
      );
    }
  };


  const prevStep = () => {
    if (step > 0) {
      setStep((prevStep) => Math.max(prevStep - 1, 0));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toSnakeCase = (data) => {
      const convertKey = (key) => key.replace(/([A-Z])/g, '_$1').toLowerCase();

      return Object.entries(data).reduce((acc, [key, value]) => {
        acc[convertKey(key)] = value;
        return acc;
      }, {});
    };

    try {
      const snakeCaseData = toSnakeCase(formData);

      const response = await fetch('http://localhost:3000/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(snakeCaseData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Cliente creato:', data);
        navigate('/dashboard');
      } else {
        console.error('Errore nella creazione:', data.error);
      }
    } catch (error) {
      console.error('Errore di rete:', error);
    }
  };

  const steps = [
    {
      label: 'Nome e Cognome',
      fields: (
        <>
          <Textbox
            label="Nome"
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Textbox
            label="Cognome"
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <Textbox
            label="Data di Nascita"
            id="birthDate"
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
          <SelectBox
            label="Sesso"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={[
              { value: 'male', label: 'Maschio' },
              { value: 'female', label: 'Femmina' },
              { value: 'other', label: 'Altro' },
            ]}
            required
          />
        </>
      ),
    },
    {
      label: 'Contatti',
      fields: (
        <div className="flex flex-col gap-5">
          <Textbox
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Textbox
            label="Numero di Telefono"
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
      ),
    },
    {
      label: 'Misure',
      fields: (
        <div className="flex flex-col gap-5">
          <Textbox
            label="Peso (kg)"
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
          <Textbox
            label="Altezza (cm)"
            type="number"
            id="height"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>
      ),
    },
    {
      label: 'Allergie e Intolleranze',
      fields: (
        <div className="flex flex-col gap-5">
          <Textbox
            label="Allergie"
            type="text"
            id="allergies"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            required
          />
          <Textbox
            label="Intolleranze Alimentari"
            type="text"
            id="foodIntolerances"
            name="foodIntolerances"
            value={formData.foodIntolerances}
            onChange={handleChange}
            required
          />
        </div>
      ),
    },
    {
      label: 'Fitness',
      fields: (
        <div className="flex flex-col gap-5">
          <SelectBox
            label={'Livello di Attività fisica'}
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            options={[
              { value: 'sedentario', label: 'Sedentario' },
              { value: 'modAttivo', label: 'Moderatamente attivo' },
              { value: 'attivo', label: 'Attivo' },
              { value: 'moltoAttivo', label: 'Molto attivo' },
            ]}
            required
          />
          <SelectBox
            label="Obiettivi Fitness"
            name="fitnessGoals"
            value={formData.fitnessGoals}
            onChange={handleChange}
            options={[
              { value: 'perdita', label: 'Perdita di peso' },
              { value: 'aumentoMassa', label: 'Aumento di massa muscolare' },
              { value: 'flessibilita', label: 'Flessibilità' },
              { value: 'salute', label: 'Salute generale' },
              { value: 'incrementoForza', label: 'Incremento della forza' },
              { value: 'vitaAttiva', label: 'Vita attiva' },
            ]}
            required
          />
          <SelectBox
            label="Preferenze di Allenamento"
            name="workoutPreferences"
            value={formData.workoutPreferences}
            onChange={handleChange}
            options={[
              { value: 'attivitaAllAperta', label: 'Attività all\'aperto' },
              { value: 'palestra', label: 'Palestra' },
            ]}
            required
          />
          <SelectBox
            label="Tempo Disponibile"
            name="availableTime"
            value={formData.availableTime}
            onChange={handleChange}
            options={[
              { value: 'menoDi1h', label: 'Meno di 1 ora' },
              { value: '1h', label: '1 ora' },
              { value: '2h', label: '2 ore' },
              { value: '3h', label: '3 ore' },
              { value: 'piuDi3h', label: 'Più di 3 ore' },
            ]}
            required
          />
        </div>
      ),
    },
    {
      label: 'Foto',
      fields: (
        <>
          <label className="text-white" htmlFor="photo">
            Carica una foto:
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </>
      ),
    },
    {
      label: 'Registrazione',
      fields: (
        <div className="flex flex-col gap-5">
          <Textbox
            label="Nome Utente"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Textbox
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="text-blue-500"
          >
            {showPassword ? 'Nascondi Password' : 'Mostra Password'}
          </button>
          <Textbox
            label="Conferma Password"
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div
        className="w-full min bg-secondary-green h-2 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
      <form
        className="flex flex-col justify-center items-center gap-5 text-white h-svh"
        onSubmit={handleSubmit}
      >
        {step >= 0 && step < steps.length ? (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold mt-4">{steps[step].label}</h2>
            </div>
            {steps[step].fields}
          </>
        ) : (
          <div>Passo non valido</div>
        )}
        <div className="flex flex-col gap-5 justify-between mt-6">
          {step > 0 && (
            <Button
              onClick={prevStep}
              type="button"
              color={'grey'}
              text={'Indietro'}
            ></Button>
          )}
          <Button
            onClick={(e) => nextStep(e)}
            type="button"
            text={step === totalStep ? 'Invia' : 'Avanti'}
          ></Button>
        </div>
      </form>
    </>
  );
};

export default FormCliente;
