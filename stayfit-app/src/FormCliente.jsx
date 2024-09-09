import { useState, useCallback, useEffect } from "react";

const Form = () => {
  const [step, setStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    email: "",
    phone: "",
    weight: "",
    height: "",
    allergies: "",
    foodIntolerances: "",
    activityLevel: "",
    fitnessGoals: "",
    workoutPreferences: "",
    availableTime: "",
    photo: null,
    username: "",
    password: "",
    confirmPassword: "",
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
      [name]: type === "checkbox" ? checked : value,
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
        "Compila tutti i campi obbligatori o assicurati che le password corrispondano."
      );
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitted) {
      alert("Modulo già inviato.");
      return;
    }

    if (isStepValid(step)) {
      setIsSubmitted(true);
      alert("Modulo inviato con successo!");
      localStorage.removeItem("formData"); 
    } else {
      alert("La Password non corrisponde.");
    }
  };

  const steps = [
    {
      label: "Nome e Cognome",
      fields: (
        <>
          <label>Nome</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <label>Cognome</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <label>Data di Nascita</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
          <label>Sesso</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Seleziona</option>
            <option value="male">Maschio</option>
            <option value="female">Femmina</option>
          </select>
        </>
      ),
    },
    {
      label: "Contatti",
      fields: (
        <>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label>Numero di Telefono</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </>
      ),
    },
    {
      label: "Misure",
      fields: (
        <>
          <label>Peso (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
          <label>Altezza (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </>
      ),
    },
    {
      label: "Allergie e Intolleranze",
      fields: (
        <>
          <label>Allergie</label>
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
          />
          <label>Intolleranze Alimentari</label>
          <input
            type="text"
            name="foodIntolerances"
            value={formData.foodIntolerances}
            onChange={handleChange}
          />
        </>
      ),
    },
    {
      label: "Fitness",
      fields: (
        <>
          <label>Livello di Attività Fisica</label>
          <select
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            required
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
          >
            <option value="">Seleziona</option>
            <option value="cardio">Cardio</option>
            <option value="flexibility">Flessibilità</option>
            <option value="outdoorActivities">Attività all&#39;aperto</option>
            <option value="gym">Palestra</option>
          </select>
          <label>Pratichi già uno sport?</label>
          <input
            type="text"
            name="availableTime"
            value={formData.availableTime}
            onChange={handleChange}
            required
          />
        </>
      ),
    },
    {
      label: "Foto",
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
      label: "Account",
      fields: (
        <div className="client-form">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Conferma Password</label>
          <input
            type={showPassword ? "text" : "password"}
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
