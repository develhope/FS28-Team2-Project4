import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Form = () => {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    professionType: "", certifications: [], taxCode: "", firstName: "", lastName: "", birthDate: "", email: "",
    phonePrefix: "", phone: "", workArea: "", experience: "", description: "", profilePhoto: null, username: "", password: "",
    confirmPassword: "", subscriptionType: "", socialNetwork: "", socialAccountName: "", termsAccepted: false,
    privacyPolicyAccepted: false, referral: "", receiveUpdates: false
  });

  // Recupera i dati dal localStorage all'avvio
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = ({ target: { name, value, type, checked, files } }) => {
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : (files ? files : value)
    }));
  };

  const nextStep = () => {
    if (isStepValid(step)) {
      if (step === steps.findIndex(s => s.fields.includes("confirmPassword"))) {
        if (formData.password !== formData.confirmPassword) {
          alert("Le password non corrispondono.");
          return;
        }
      }

      if (step === steps.length - 1) {
        if (!formData.termsAccepted || !formData.privacyPolicyAccepted) {
          alert("Devi accettare i Termini e Condizioni e l'Informativa Privacy.");
          return;
        }
        handleSubmit();
      } else {
        setStep(step + 1);
      }
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    if (steps.every((_, i) => isStepValid(i))) {
      // Salva i dati nel localStorage
      localStorage.setItem("formData", JSON.stringify(formData));
      alert("Form inviato con successo e dati salvati in localStorage!");
      // Qui puoi aggiungere la logica per inviare i dati ad un server, se necessario
    } else {
      alert("Compila tutti i campi obbligatori.");
    }
  };

  const isStepValid = i => {
    let hasError = false;

    for (const f of steps[i].fields) {
      if (f === "taxCode") {
        if (formData.taxCode === "") return true; 
        if (!/^[0-9]{11}$/.test(formData.taxCode)) {
          if (!hasError) {
            alert("Inserire le 11 cifre della partita IVA");
            hasError = true;
          }
          return false;
        }
      }
      if (f === "phone") {
        if (!/^[0-9]*$/.test(formData.phone)) {
          if (!hasError) {
            alert("Il numero di telefono deve contenere solo cifre.");
            hasError = true;
          }
          return false;
        }
      }
      if (f === "socialNetwork") {
        return formData.socialNetwork === "" || formData.socialNetwork !== "Seleziona"; 
      }
      if (f === "socialAccountName") {
        return formData.socialNetwork === "" || formData[f];
      }
      if (f === "certifications" || f === "profilePhoto") {
        return formData[f] && formData[f].length > 0;
      }
      if (f === "termsAccepted" || f === "privacyPolicyAccepted") {
        return formData[f] === true;
      }
      if (formData[f] === "" || formData[f] === null) {
        if (!hasError) {
          alert("Compila tutti i campi obbligatori.");
          hasError = true;
        }
        return false;
      }
    }
    return true;
  };

  const renderFilePreview = files => Array.from(files).map(file => (
    <div key={file.name} className="mt-2">
      {file.type.startsWith("image/") ? <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: '300px' }} className="img-thumbnail" /> : <div>{file.name}</div>}
    </div>
  ));

  const steps = [
    {
      label: "Tipo Professionista", fields: ["professionType"], component: (
        <select className="form-select" name="professionType" value={formData.professionType} onChange={handleChange} required>
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
          <input type="file" className="form-control" name="certifications" accept="application/pdf, image/*" multiple onChange={handleChange} required />
          {formData.certifications.length > 0 && renderFilePreview(formData.certifications)}
        </>
      )
    },
    {
      label: "Partita IVA (opzionale)", fields: ["taxCode"], component: (
        <input
          type="text"
          className="form-control"
          name="taxCode"
          value={formData.taxCode}
          onChange={handleChange}
          placeholder="Solo numeri, 11 cifre"
          pattern="[0-9]*"
          inputMode="numeric"
          maxLength={11}
        />
      )
    },
    {
      label: "Nome", fields: ["firstName"], component: (
        <input type="text" className="form-control col-md-6" name="firstName" value={formData.firstName} onChange={handleChange} required />
      )
    },
    {
      label: "Cognome", fields: ["lastName"], component: (
        <input type="text" className="form-control col-md-6" name="lastName" value={formData.lastName} onChange={handleChange} required />
      )
    },
    {
      label: "Data di Nascita", fields: ["birthDate"], component: (
        <input type="date" className="form-control col-md-6" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
      )
    },
    {
      label: "Email", fields: ["email"], component: (
        <input type="email" className="form-control col-md-6" name="email" value={formData.email} onChange={handleChange} required />
      )
    },
    {
      label: "Numero di Telefono", fields: ["phonePrefix", "phone"], component: (
        <div className="d-flex">
          <select className="form-select me-2" name="phonePrefix" value={formData.phonePrefix} onChange={handleChange} required>
            <option value="">Seleziona il prefisso</option>
            <option value="+39">Italia (+39)</option>
            <option value="+33">Francia (+33)</option>
            <option value="+44">Regno Unito (+44)</option>
            <option value="+1">Stati Uniti (+1)</option>
            <option value="+49">Germania (+49)</option>
            <option value="+81">Giappone (+81)</option>
            <option value="+86">Cina (+86)</option>
            <option value="+91">India (+91)</option>
            <option value="+61">Australia (+61)</option>
          </select>
          <input 
            type="tel" 
            className="form-control" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            placeholder="Numero di Telefono" 
            required 
            pattern="[0-9]*"
            inputMode="numeric"
          />
        </div>
      ),
    },
    {
      label: "Area Geografica di Lavoro", fields: ["workArea"], component: (
        <input type="text" className="form-control col-md-6" name="workArea" value={formData.workArea} onChange={handleChange} required />
      )
    },
    {
      label: "Esperienza Professionale (anni)", fields: ["experience"], component: (
        <input type="number" className="form-control col-md-6" name="experience" value={formData.experience} onChange={handleChange} required />
      )
    },
    {
      label: "Breve Descrizione Attività", fields: ["description"], component: (
        <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required />
      )
    },
    {
      label: "Foto Profilo", fields: ["profilePhoto"], component: (
        <>
          <input type="file" className="form-control" name="profilePhoto" accept="image/*" onChange={handleChange} required />
          {formData.profilePhoto && renderFilePreview(formData.profilePhoto)}
        </>
      )
    },
    {
      label: "Crea un Nome Utente", fields: ["username"], component: (
        <input type="text" className="form-control col-md-6" name="username" value={formData.username} onChange={handleChange} required />
      )
    },
    {
      label: "Crea una Password", fields: ["password"], component: (
        <input type={showPassword ? "text" : "password"} className="form-control col-md-6" name="password" value={formData.password} onChange={handleChange} required />
      )
    },
    {
      label: "Conferma la Password", fields: ["confirmPassword"], component: (
        <input type={showPassword ? "text" : "password"} className="form-control col-md-6" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
      )
    },
    {
      label: "Scegli Tipologia Abbonamento", fields: ["subscriptionType"], component: (
        <select className="form-select" name="subscriptionType" value={formData.subscriptionType} onChange={handleChange} required>
          <option value="">Seleziona</option>
          <option value="base">Base</option>
          <option value="premium">Premium</option>
        </select>
      )
    },
    {
      label: "Social Network (opzionale)", fields: ["socialNetwork"], component: (
        <select className="form-select" name="socialNetwork" value={formData.socialNetwork} onChange={handleChange}>
          <option value="Seleziona">Seleziona</option>
          <option value="Instagram">Instagram</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Facebook">Facebook</option>
        </select>
      )
    },
    {
      label: "Nome Account Social (opzionale)", fields: ["socialAccountName"], component: (
        <input type="text" className="form-control col-md-6" name="socialAccountName" value={formData.socialAccountName} onChange={handleChange} />
      )
    },
    {
      label: "Termini e Condizioni", fields: ["termsAccepted"], component: (
        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} required />
          <label className="form-check-label">Accetto i Termini e Condizioni</label>
        </div>
      )
    },
    {
      label: "Privacy Policy", fields: ["privacyPolicyAccepted"], component: (
        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="privacyPolicyAccepted" checked={formData.privacyPolicyAccepted} onChange={handleChange} required />
          <label className="form-check-label">Accetto l'Informativa sulla Privacy</label>
        </div>
      )
    },
    {
      label: "Referral (opzionale)", fields: ["referral"], component: (
        <input type="text" className="form-control col-md-6" name="referral" value={formData.referral} onChange={handleChange} />
      )
    },
    {
      label: "Ricevere Aggiornamenti", fields: ["receiveUpdates"], component: (
        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="receiveUpdates" checked={formData.receiveUpdates} onChange={handleChange} />
          <label className="form-check-label">Ricevi aggiornamenti via email</label>
        </div>
      )
    }
  ];

  return (
    <div className="container mt-4">
      <h2>Registrazione Professionista</h2>
      <form>
        {steps[step].component}
        <div className="d-flex justify-content-between mt-4">
          <button type="button" className="btn btn-secondary" disabled={step === 0} onClick={prevStep}>Indietro</button>
          <button type="button" className="btn btn-primary" onClick={nextStep}>{step === steps.length - 1 ? "Invia" : "Avanti"}</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
