import { useState } from "react";

const Form = () => {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    professionType: "", certifications: [], taxCode: "", firstName: "", lastName: "", birthDate: "", email: "", 
    phone: "", workArea: "", experience: "", description: "", profilePhoto: null, username: "", password: "", 
    confirmPassword: "", subscriptionType: "", socialNetwork: "", socialAccountName: "", termsAccepted: false, 
    privacyPolicyAccepted: false, referral: "", receiveUpdates: false
  });

  const handleChange = ({ target: { name, value, type, checked, files } }) => {
    setFormData(prev => ({
      ...prev, 
      [name]: type === "checkbox" ? checked : (files ? files : value)
    }));
  };

  const validateInput = (name, value) => {
    const validators = {
      taxCode: v => /^[0-9]{0,11}$/.test(v),
      phone: v => /^[0-9+\-().\s]*$/.test(v),
      email: v => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v),
      birthDate: v => new Date().getFullYear() - new Date(v).getFullYear() >= 18,
    };
    return validators[name] ? validators[name](value) : true;
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (validateInput(name, value)) handleChange(e);
  };

  const nextStep = () => {
    if (isCurrentStepValid()) {
      if (step === steps.findIndex(s => s.label === "Partita IVA (opzionale)") && formData.taxCode && formData.taxCode.length !== 11) {
        return alert("La Partita IVA deve essere di 11 cifre.");
      }
      if (step === steps.findIndex(s => s.label === "Conferma Password") && formData.password !== formData.confirmPassword) {
        return alert("Le password non corrispondono.");
      }
      setStep(step + 1);
    } else {
      alert("Compila tutti i campi obbligatori.");
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = e => {
    e.preventDefault();
    if (steps.every((_, i) => isStepValid(i))) {
      alert("Form inviato con successo!");
    } else {
      alert("Compila tutti i campi obbligatori.");
    }
  };

  const isStepValid = i => steps[i].fields.every(f => formData[f]);
  const isCurrentStepValid = () => isStepValid(step);

  const renderFilePreview = files => Array.from(files).map(file => (
    <div key={file.name}>
      {file.type.startsWith("image/") ? <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: '300px' }} /> : <div>{file.name}</div>}
    </div>
  ));

  const steps = [
    { label: "Tipo Professionista", fields: ["professionType"], component: (
      <select name="professionType" value={formData.professionType} onChange={handleChange} required>
        <option value="">Seleziona</option>
        <option value="PT">Personal Trainer</option>
        <option value="Nutrizionista">Nutrizionista</option>
        <option value="Entrambi">Entrambi</option>
      </select>
    )},
    { label: "Certificazioni", fields: ["certifications"], component: (
      <>
        <input type="file" name="certifications" accept="application/pdf, image/*" multiple onChange={handleChange} required />
        {formData.certifications.length > 0 && renderFilePreview(formData.certifications)}
      </>
    )},
    { label: "Partita IVA (opzionale)", fields: [], component: (
      <input type="text" name="taxCode" value={formData.taxCode} onChange={handleInputChange} placeholder="Solo numeri, 11 cifre" />
    )},
    { label: "Nome", fields: ["firstName"], component: (
      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
    )},
    { label: "Cognome", fields: ["lastName"], component: (
      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
    )},
    { label: "Data di Nascita", fields: ["birthDate"], component: (
      <input type="date" name="birthDate" value={formData.birthDate} onChange={handleInputChange} required />
    )},
    { label: "Email", fields: ["email"], component: (
      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
    )},
    { label: "Numero di Telefono", fields: ["phone"], component: (
      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
    )},
    { label: "Area Geografica di Lavoro", fields: ["workArea"], component: (
      <input type="text" name="workArea" value={formData.workArea} onChange={handleChange} required />
    )},
    { label: "Esperienza Professionale (anni)", fields: ["experience"], component: (
      <input type="number" name="experience" value={formData.experience} onChange={handleChange} required />
    )},
    { label: "Breve Descrizione Attività", fields: ["description"], component: (
      <textarea name="description" value={formData.description} onChange={handleChange} required />
    )},
    { label: "Foto Profilo", fields: [], component: (
      <>
        <input type="file" name="profilePhoto" accept="image/*" onChange={handleChange} required />
        {formData.profilePhoto && renderFilePreview(formData.profilePhoto)}
      </>
    )},
    { label: "Username", fields: ["username"], component: (
      <input type="text" name="username" value={formData.username} onChange={handleChange} required />
    )},
    { label: "Password", fields: ["password"], component: (
      <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required />
    )},
    { label: "Conferma Password", fields: ["confirmPassword"], component: (
      <input type={showPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
    )},
    { label: "Tipologia di Abbonamento", fields: ["subscriptionType"], component: (
      <select name="subscriptionType" value={formData.subscriptionType} onChange={handleChange} required>
        <option value="">Seleziona</option>
        <option value="basic">Basic</option>
        <option value="medium">Medium</option>
        <option value="premium">Premium</option>
      </select>
    )},
    { label: "Collega i Social (opzionale)", fields: [], component: (
      <>
        <select name="socialNetwork" value={formData.socialNetwork} onChange={handleChange}>
          <option value="">Seleziona Social Network</option>
          <option value="Facebook">Facebook</option>
          <option value="Instagram">Instagram</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Twitter">Twitter</option>
        </select>
        {formData.socialNetwork && (
          <div>
            <label>Nome account {formData.socialNetwork}</label>
            <input type="text" name="socialAccountName" value={formData.socialAccountName} onChange={handleChange} />
          </div>
        )}
      </>
    )},
    { label: "Termini e Condizioni", fields: ["termsAccepted"], component: (
      <label>
        <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
        Accetto i Termini e Condizioni
      </label>
    )},
    { label: "Informativa Privacy", fields: ["privacyPolicyAccepted"], component: (
      <label>
        <input type="checkbox" name="privacyPolicyAccepted" checked={formData.privacyPolicyAccepted} onChange={handleChange} />
        Accetto l'Informativa Privacy
      </label>
    )},
    { label: "Come hai conosciuto l'app", fields: ["referral"], component: (
      <input type="text" name="referral" value={formData.referral} onChange={handleChange} required />
    )},
    { label: "Ricevere Aggiornamenti dall'App", fields: [], component: (
      <input type="checkbox" name="receiveUpdates" checked={formData.receiveUpdates} onChange={handleChange} />
    )},
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>{steps[step].label}</label>
        {steps[step].component}
      </div>
      {["password", "confirmPassword"].includes(steps[step]?.fields[0]) && (
        <div>
          <input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
          <label htmlFor="showPassword">Mostra Password</label>
        </div>
      )}
      <div>
        {step > 0 && <button type="button" onClick={prevStep}>Indietro</button>}
        {step < steps.length - 1 && <button type="button" onClick={nextStep} disabled={!isCurrentStepValid()}>Avanti</button>}
        {step === steps.length - 1 && <button type="submit">Invia</button>}
      </div>
    </form>
  );
};

export default Form;
