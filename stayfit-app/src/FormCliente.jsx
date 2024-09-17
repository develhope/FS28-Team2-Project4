import { useState, useCallback } from 'react';
import Textbox from './MyComponents/Textbox.jsx';
import { SelectBox } from './MyComponents/SelectBox.jsx';
import Button from './MyComponents/Button.jsx';

const FormCliente = () => {
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

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem("formData"));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
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
          />
          <Textbox
            label="Intolleranze Alimentari"
            type="text"
            id="foodIntolerances"
            name="foodIntolerances"
            value={formData.foodIntolerances}
            onChange={handleChange}
          />
        </div>
      ),
    },
    {
      label: 'Fitness',
      fields: (
        <div className="flex flex-col gap-5">
          <label className="text-xl text-secondary-green">
            Livello di Attività Fisica
          </label>
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

          <label className="text-xl text-secondary-green">
            Obiettivi di Fitness
          </label>
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

          <label className="text-xl text-secondary-green">
            Preferenze di Allenamento
          </label>
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
        </div>
      ),
    },
    {
      label: 'Foto',
      fields: (
        <div className="flex flex-col gap-5">
          <label className="text-xl text-secondary-green">Carica una Foto</label>
          <input className='w-[300px]'
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          {formData.photo && <div>Foto Caricata: {formData.photo.name}</div>}
        </div>
      ),
    },
    {
      label: 'Account',
      fields: (
        <div className="flex flex-col gap-5">
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
          <label className="text-xl text-secondary-green">
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
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-primary-blue">
      <h2 className="text-2xl text-secondary-green">REGISTRAZIONE CLIENTE</h2>
      <div className="w-[300px] mb-10">
        <div className="w-[300px] bg-[#001e23] rounded-full h-2.5">
          <div
            className="bg-secondary-green h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">{steps[step].fields}</div>
        <div className="flex flex-col mt-10 gap-5">
          {step > 0 && (
            <Button
              type={'button'}
              onClick={prevStep}
              text={'Indietro'}
            ></Button>
          )}
          {step < steps.length - 1 && (
            <Button
              type={'button'}
              onClick={nextStep}
              disabled={!isStepValid(step)}
              text={'Avanti'}
            >
            </Button>
          )}
          {step === steps.length - 1 && <Button type="submit" text={'Invia'}></Button>}
        </div>
      </form>
    </div>
  );
};

export default FormCliente;
