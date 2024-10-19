import { useState, useEffect, useCallback } from 'react';
import Textbox from './MyComponents/Textbox.jsx';
import { SelectBox } from './MyComponents/SelectBox.jsx';
import Button from './MyComponents/Button.jsx';
import { useNavigate } from 'react-router-dom';

const FormCliente = () => {
  const [step, setStep] = useState(0);
  const [clientData, setClientData] = useState({
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
    professionalId: null,
  });

  console.log(clientData);


  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem('clientData'));
    if (savedFormData) {
      setClientData(savedFormData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('clientData', JSON.stringify(clientData));
  }, [clientData]);

  useEffect(() => {
    const professionalId = localStorage.getItem('userId');
    setClientData(prev => ({ ...prev, professionalId }));
}, []);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClientData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setClientData((prev) => ({
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
            clientData.firstName &&
            clientData.lastName &&
            clientData.birthDate &&
            clientData.gender
          );
        case 1:
          return clientData.email || clientData.phone;
        case 2:
          return clientData.weight && clientData.height;
        case 3:
          return clientData.allergies && clientData.foodIntolerances;
        case 4:
          return (
            clientData.activityLevel &&
            clientData.fitnessGoals &&
            clientData.workoutPreferences &&
            clientData.availableTime
          );
        case 5:
          return clientData.photo;
        case 6:
          return (
            clientData.username &&
            clientData.password &&
            clientData.confirmPassword &&
            clientData.password === clientData.confirmPassword
          );
        default:
          return false;
      }
    },
    [clientData]
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
      const snakeCaseData = toSnakeCase(clientData);

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
            value={clientData.firstName}
            onChange={handleChange}
            required
          />
          <Textbox
            label="Cognome"
            type="text"
            id="lastName"
            name="lastName"
            value={clientData.lastName}
            onChange={handleChange}
            required
          />
          <Textbox
            label="Data di Nascita"
            id="birthDate"
            type="date"
            name="birthDate"
            value={clientData.birthDate}
            onChange={handleChange}
            required
          />
          <SelectBox
            label="Sesso"
            name="gender"
            value={clientData.gender}
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
            value={clientData.email}
            onChange={handleChange}
            required
          />
          <Textbox
            label="Numero di Telefono"
            type="tel"
            id="phone"
            name="phone"
            value={clientData.phone}
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
            value={clientData.weight}
            onChange={handleChange}
            required
          />
          <Textbox
            label="Altezza (cm)"
            type="number"
            id="height"
            name="height"
            value={clientData.height}
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
            value={clientData.allergies}
            onChange={handleChange}
            required
          />
          <Textbox
            label="Intolleranze Alimentari"
            type="text"
            id="foodIntolerances"
            name="foodIntolerances"
            value={clientData.foodIntolerances}
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
            value={clientData.activityLevel}
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
            value={clientData.fitnessGoals}
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
            value={clientData.workoutPreferences}
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
            value={clientData.availableTime}
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
            value={clientData.username}
            onChange={handleChange}
            required
          />
          <Textbox
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={clientData.password}
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
            value={clientData.confirmPassword}
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
