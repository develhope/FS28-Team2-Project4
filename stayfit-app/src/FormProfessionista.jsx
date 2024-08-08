import { useState } from "react";

const Form = () => {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    professionType: "",
    certifications: [],
    taxCode: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    phone: "",
    workArea: "",
    experience: "",
    description: "",
    profilePhoto: null,
    username: "",
    password: "",
    confirmPassword: "",
    subscriptionType: "",
    socialNetwork: "",
    socialAccountName: "",
    termsAccepted: false,
    privacyPolicyAccepted: false,
    referral: "",
    receiveUpdates: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value || "",
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files.length > 0 ? files : [],
    }));
  };

  const handleBirthDateChange = (e) => {
    const { value } = e.target;
    const birthDate = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age >= 18) {
      setFormData((prev) => ({ ...prev, birthDate: value }));
    } else {
      alert("Devi essere maggiorenne per registrarti.");
    }
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const regex = /^[0-9+\-().\s]*$/;
    if (regex.test(value)) {
      setFormData((prev) => ({ ...prev, phone: value }));
    }
  };

  const handleTaxCodeChange = (e) => {
    const { value } = e.target;
    const regex = /^[0-9]{0,11}$/;
    if (regex.test(value)) {
      setFormData((prev) => ({ ...prev, taxCode: value }));
    }
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(value)) {
      setFormData((prev) => ({ ...prev, email: value }));
    }
  };

  const nextStep = () => {
    const passwordStepIndex = steps.findIndex(s => s.label === "Password");
    const confirmPasswordStepIndex = steps.findIndex(s => s.label === "Conferma Password");

    if (step === steps.findIndex(s => s.label === "Termini e Condizioni")) {
      if (!formData.termsAccepted) {
        alert("Devi accettare i Termini e Condizioni per procedere.");
        return;
      }
    }

    if (step === steps.findIndex(s => s.label === "Informativa Privacy")) {
      if (!formData.privacyPolicyAccepted) {
        alert("Devi accettare l'Informativa Privacy per procedere.");
        return;
      }
    }

    if (step === confirmPasswordStepIndex) {
      if (formData.password !== formData.confirmPassword) {
        alert("Le password inserite non corrispondono.");
        return;
      }
    }

    if (step === steps.findIndex(s => s.label === "Partita IVA (opzionale)") && formData.taxCode !== "") {
      if (formData.taxCode.length !== 11) {
        alert("La Partita IVA deve essere di 11 cifre.");
        return;
      }
    }

    if (isStepValid(step)) {
      setStep(step + 1);
    } else {
      alert("Compila tutti i campi obbligatori.");
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      alert("Form inviato con successo!");
    } else {
      alert("Compila tutti i campi obbligatori.");
    }
  };

  const isStepValid = (step) => {
    const stepFields = steps[step].fields;
    for (const field of stepFields) {
      if (formData[field] === "" || formData[field] === null || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        return false;
      }
    }
    return true;
  };

  const isFormValid = () => {
    if (steps[step].label === "Termini e Condizioni" && !formData.termsAccepted) {
      alert("Devi accettare i Termini e Condizioni per procedere.");
      return false;
    }
    if (steps[step].label === "Informativa Privacy" && !formData.privacyPolicyAccepted) {
      alert("Devi accettare l'Informativa Privacy per procedere.");
      return false;
    }

    return steps.every((_, index) => isStepValid(index));
  };

  const renderFilePreview = (files) => {
    const fileArray = Array.from(files);
    return fileArray.map((file) => {
      const fileURL = URL.createObjectURL(file);
      return (
        <div key={file.name}>
          {file.type.startsWith("image/") ? (
            <img src={fileURL} alt={file.name} style={{ width: '300px', height: 'auto' }} />
          ) : (
            <div>{file.name}</div>
          )}
        </div>
      );
    });
  };

  const steps = [
    {
      label: "Tipo Professionista", fields: ["professionType"], component: (
        <select name="professionType" value={formData.professionType || ""} onChange={handleChange} required>
          <option value="">Seleziona</option>
          <option value="PT">Personal Trainer</option>
          <option value="Nutrizionista">Nutrizionista</option>
          <option value="Entrambi">Entrambi</option>
        </select>
      )
    },
    {
      label: "Certificazioni", fields: ["certifications"], component: (
        <>
          <input type="file" name="certifications" accept="application/pdf, image/*" multiple onChange={handleFileChange} required />
          {formData.certifications && renderFilePreview(formData.certifications)}
        </>
      )
    },
    {
      label: "Partita IVA (opzionale)", fields: [], component: (
        <input type="text" name="taxCode" value={formData.taxCode || ""} onChange={handleTaxCodeChange} placeholder="Solo numeri, 11 cifre" />
      )
    },
    {
      label: "Nome", fields: ["firstName"], component: (
        <input type="text" name="firstName" value={formData.firstName || ""} onChange={handleChange} required />
      )
    },
    {
      label: "Cognome", fields: ["lastName"], component: (
        <input type="text" name="lastName" value={formData.lastName || ""} onChange={handleChange} required />
      )
    },
    {
      label: "Data di Nascita", fields: ["birthDate"], component: (
        <input type="date" name="birthDate" value={formData.birthDate || ""} onChange={handleBirthDateChange} required />
      )
    },
    {
      label: "Email", fields: ["email"], component: (
        <input type="email" name="email" value={formData.email || ""} onChange={handleEmailChange} required />
      )
    },
    {
      label: "Numero di Telefono", fields: ["phone"], component: (
        <input type="tel" name="phone" value={formData.phone || ""} onChange={handlePhoneChange} required />
      )
    },
    {
      label: "Area Geografica di Lavoro", fields: ["workArea"], component: (
        <input type="text" name="workArea" value={formData.workArea || ""} onChange={handleChange} required />
      )
    },
    {
      label: "Esperienza Professionale (anni)", fields: ["experience"], component: (
        <input type="number" name="experience" value={formData.experience || ""} onChange={handleChange} required />
      )
    },
    {
      label: "Breve Descrizione Attività", fields: ["description"], component: (
        <textarea name="description" value={formData.description || ""} onChange={handleChange} required />
      )
    },
    {
      label: "Foto Profilo", fields: [], component: (
        <>
          <input type="file" name="profilePhoto" accept="image/*" onChange={handleFileChange} required />
          {formData.profilePhoto && renderFilePreview(formData.profilePhoto)}
        </>
      )
    },
    {
      label: "Username", fields: ["username"], component: (
        <input type="text" name="username" value={formData.username || ""} onChange={handleChange} required />
      )
    },
    {
      label: "Password", fields: ["password"], component: (
        <input type={showPassword ? "text" : "password"} name="password" value={formData.password || ""} onChange={handleChange} required />
      )
    },
    {
      label: "Conferma Password", fields: ["confirmPassword"], component: (
        <input type={showPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword || ""} onChange={handleChange} required />
      )
    },
    {
      label: "Tipologia di Abbonamento", fields: ["subscriptionType"], component: (
        <select name="subscriptionType" value={formData.subscriptionType || ""} onChange={handleChange} required >
          <option value="">Seleziona</option>
          <option value="basic">Basic</option>
          <option value="medium">Medium</option>
          <option value="premium">Premium</option>
        </select>
      )
    },
    {
      label: "Collega i Social (opzionale)", fields: [], component: (
        <>
          <select name="socialNetwork" value={formData.socialNetwork || ""} onChange={handleChange}>
            <option value="">Seleziona Social Network</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Twitter">Twitter</option>
          </select>
          {formData.socialNetwork && (
            <div>
              <label>Inserisci il nome del tuo account {formData.socialNetwork}</label>
              <input type="text" name="socialAccountName" value={formData.socialAccountName || ""} onChange={handleChange} />
            </div>
          )}
        </>
      )
    },
    {
      label: "Termini e Condizioni", fields: ["termsAccepted"], component: (
        <label>
          <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
          Accetto i Termini e Condizioni
        </label>
      )
    },
    {
      label: "Informativa Privacy", fields: ["privacyPolicyAccepted"], component: (
        <label>
          <input type="checkbox" name="privacyPolicyAccepted" checked={formData.privacyPolicyAccepted} onChange={handleChange} />
          Accetto l'Informativa Privacy
        </label>
      )
    },
    {
      label: "Come hai conosciuto l'app", fields: ["referral"], component: (
        <input type="text" name="referral" value={formData.referral || ""} onChange={handleChange} required />
      )
    },
    {
      label: "Ricevere Aggiornamenti dall'App", fields: [], component: (
        <input type="checkbox" name="receiveUpdates" checked={formData.receiveUpdates} onChange={handleChange} />
      )
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>{steps[step].label}</label>
        {steps[step].component}
      </div>
      {(step === steps.findIndex(s => s.label === "Password") || step === steps.findIndex(s => s.label === "Conferma Password")) && (
        <div>
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword">Mostra Password</label>
        </div>
      )}
      <div>
        {step > 0 && (
          <button type="button" onClick={prevStep}>Indietro</button>
        )}
        {step < steps.length - 1 && (
          <button type="button" onClick={nextStep} disabled={!isStepValid(step)}>Avanti</button>
        )}
        {step === steps.length - 1 && <button type="submit">Invia</button>}
      </div>
    </form>
  );
};

export default Form;
