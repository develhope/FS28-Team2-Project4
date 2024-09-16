import { useState, useCallback } from 'react';
import Textbox from './MyComponents/Textbox.jsx';
import { SelectBox } from './MyComponents/SelectBox.jsx';

const Form = () => {
  const [step, setStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);

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

  const nextStep = () => {
    if (isStepValid(step)) {
      setStep(step + 1);
    } else {
      alert(
        'Compila tutti i campi obbligatori o assicurati che le password corrispondano.'
      );
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitted) {
      alert('Modulo già inviato.');
      return;
    }

    if (isStepValid(step)) {
      setIsSubmitted(true);
      alert('Modulo inviato con successo!');
    } else {
      alert('La Password non corrisponde.');
    }
  };

  const genderOptions = [
    { value: 'male', label: 'Maschio' },
    { value: 'female', label: 'Femmina' },
    { value: 'other', label: 'Altro' },
  ];

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
            options={genderOptions}
            required
            className="peer border-2 w-[300px] h-10 bg-transparent border-secondary-gray cursor-pointer
  text-[#C5C5C5] pl-[12px] pr-[12px] rounded-[6px] outline-none transition-all
  duration-300 focus:ring-secondary-green hover:border-secondary-green focus:border-secondary-green"
          >
          </SelectBox>
        </>
      ),
    },
    {
      label: 'Contatti',
      fields: (
        <>
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
          />
        </>
      ),
    },
    {
      label: 'Misure',
      fields: (
        <>
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
        </>
      ),
    },
    {
      label: 'Allergie e Intolleranze',
      fields: (
        <>
          <Textbox
            label="Allergie"
            type="text"
            id="allergies"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
          />
          <Textbox
            label="Intolleranze Alimentari"
            type="text"
            id="foodIntolerances"
            name="foodIntolerances"
            value={formData.foodIntolerances}
            onChange={handleChange}
          />
        </>
      ),
    },
    {
      label: 'Fitness',
      fields: (
        <>
          <label>Livello di Attività Fisica</label>
          <select
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            required
            className="peer border-2 w-[300px] h-10 bg-transparent border-secondary-gray cursor-pointer
  text-[#C5C5C5] pl-[12px] pr-[12px] rounded-[6px] outline-none transition-all
  duration-300 focus:ring-secondary-green hover:border-secondary-green focus:border-secondary-green"
          >
            <option value="">Seleziona</option>
            <option value="sedentary">Sedentario</option>
            <option value="moderatelyActive">Moderatamente Attivo</option>
            <option value="active">Attivo</option>
            <option value="veryActive">Molto Attivo</option>
          </select>

          <label>Obiettivi di Fitness</label>
          <select
            name="fitnessGoals"
            value={formData.fitnessGoals}
            onChange={handleChange}
            required
            className="peer border-2 w-[300px] h-10 bg-transparent border-secondary-gray cursor-pointer
  text-[#C5C5C5] pl-[12px] pr-[12px] rounded-[6px] outline-none transition-all
  duration-300 focus:ring-secondary-green hover:border-secondary-green focus:border-secondary-green"
          >
            <option value="">Seleziona</option>
            <option value="weightLoss">Perdita di peso</option>
            <option value="muscleGain">Aumento della massa muscolare</option>
            <option value="flexibility">Flessibilità</option>
            <option value="generalHealth">Salute generale</option>
            <option value="strengthIncrease">Incremento della forza</option>
            <option value="activeLife">Vita attiva e sana</option>
            <option value="performanceImprovement">
              Miglioramento delle prestazioni sportive
            </option>
            <option value="rehabilitation">Riabilitazione</option>
          </select>

          <label>Preferenze di Allenamento</label>
          <select
            name="workoutPreferences"
            value={formData.workoutPreferences}
            onChange={handleChange}
            required
            className="peer border-2 w-[300px] h-10 bg-transparent border-secondary-gray cursor-pointer
  text-[#C5C5C5] pl-[12px] pr-[12px] rounded-[6px] outline-none transition-all
  duration-300 focus:ring-secondary-green hover:border-secondary-green focus:border-secondary-green"
          >
            <option value="">Seleziona</option>
            <option value="cardio">Cardio</option>
            <option value="flexibility">Flessibilità</option>
            <option value="outdoorActivities">Attività all&apos;aperto</option>
            <option value="gym">Palestra</option>
          </select>

          <Textbox
            label="Pratichi già uno sport?"
            type="text"
            id="availableTime"
            name="availableTime"
            value={formData.availableTime}
            onChange={handleChange}
            required
          />
        </>
      ),
    },
    {
      label: 'Foto',
      fields: (
        <>
          <label>Carica una Foto</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          {formData.photo && <div>Foto Caricata: {formData.photo.name}</div>}
        </>
      ),
    },
    {
      label: 'Account',
      fields: (
        <div className="client-form">
          <Textbox
            label="Username"
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
          <Textbox
            label="Conferma Password"
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={togglePasswordVisibility}
            />
            Mostra Password
          </label>
        </div>
      ),
    },
  ];

  return (
    <div className="form-container">
      <h2 className="titolo">Registrazione Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>{steps[step].label}</h2>
          {steps[step].fields}
        </div>
        <div>
          {step > 0 && (
            <button type="button" onClick={prevStep}>
              Indietro
            </button>
          )}
          {step < steps.length - 1 && (
            <button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid(step)}
            >
              Avanti
            </button>
          )}
          {step === steps.length - 1 && <button type="submit">Invia</button>}
        </div>
      </form>
    </div>
  );
};

export default Form;
