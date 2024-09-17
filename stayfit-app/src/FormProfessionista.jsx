import { useState } from 'react';
import { SubCards } from './MyComponents/subCards';
import { CardProvider } from './MyComponents/CardProvider';
import Button from './MyComponents/Button';
import Textbox from './MyComponents/Textbox';

const FormProfessionista = () => {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    professionType: '',
    certifications: [],
    taxCode: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    phone: '',
    workArea: '',
    experience: '',
    description: '',
    profilePhoto: null,
    username: '',
    password: '',
    confirmPassword: '',
    subscriptionType: null,
    socialNetwork: '',
    socialAccountName: '',
    termsAccepted: false,
    privacyPolicyAccepted: false,
    referral: '',
    receiveUpdates: false,
  });

  const totalStep = 7;
  const progress = (step / totalStep) * 100;

  const handleChange = ({ target: { name, value, type, checked, files } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : files ? files : value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const nextStep = () => {
    if (isStepValid(step)) {
      // Controlliamo se siamo nello step della conferma password
      if (
        step === steps.findIndex((s) => s.fields.includes('confirmPassword'))
      ) {
        // Controlla anche le password
        if (formData.password !== formData.confirmPassword) {
          alert('Le password non corrispondono.');
          return; // Ferma qui se le password non corrispondono
        }
      }

      // Se siamo all'ultimo passo, controlla anche le checkbox accettate
      if (step === steps.length - 1) {
        if (!formData.termsAccepted || !formData.privacyPolicyAccepted) {
          alert(
            "Devi accettare i Termini e Condizioni e l'Informativa Privacy."
          );
          return; // Ferma qui se le checkbox non sono accettate
        }
        handleSubmit();
      } else {
        setStep(step + 1);
      }
    } else {
      alert('Compila tutti i campi obbligatori.');
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    if (steps.every((_, i) => isStepValid(i))) {
      alert('Form inviato con successo!');
      // Aggiungi qui la logica per l'invio effettivo del form, ad esempio con una chiamata API.
    } else {
      alert('Compila tutti i campi obbligatori.');
    }
  };

  const isStepValid = (i) => {
    return steps[i].fields.every((f) => {
      if (f === 'taxCode') {
        if (formData.taxCode === '') return true;
        if (!/^\d{11}$/.test(formData.taxCode)) {
          alert('Inserire le 11 cifre della partita IVA');
          return false;
        }
      }
      if (f === 'phone') {
        if (!/^[0-9]*$/.test(formData.phone)) {
          alert('Il numero di telefono deve contenere solo cifre.');
          return false;
        }
      }
      if (f === 'socialNetwork') {
        return (
          formData.socialNetwork === '' ||
          formData.socialNetwork !== 'Seleziona'
        ); // Seleziona può essere ignorato.
      }
      if (f === 'socialAccountName') {
        return formData.socialNetwork === '' || formData[f];
      }
      if (
        f === 'certifications' ||
        f === 'profilePhoto' ||
        f === 'subscriptionType'
      ) {
        return formData[f] && formData[f].length > 0;
      }
      // Verifica che i termini e privacy policy siano accettati
      if (f === 'termsAccepted' || f === 'privacyPolicyAccepted') {
        return formData[f] === true; // Assicurati che sia true, quindi accettato
      }
      return formData[f] !== '' && formData[f] !== null;
    });
  };

  const renderFilePreview = (files) =>
    Array.from(files).map((file) => (
      <div key={file.name} className="mt-2">
        {file.type.startsWith('image/') ? (
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            style={{ width: '300px' }}
            className="img-thumbnail"
          />
        ) : (
          <div>{file.name}</div>
        )}
      </div>
    ));

  const steps = [
    {
      label: 'Dati personali',
      fields: [
        'firstName',
        'lastName',
        'birthDate',
        'taxCode',
        'email',
        'phone',
      ],
      component: (
        <div className="flex flex-col gap-5">
          <Textbox
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            label={'Nome'}
            onChange={handleChange}
            required
          />
          <Textbox
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            label={'Cognome'}
            onChange={handleChange}
            required
          />
          <Textbox
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
          <Textbox
            type="text"
            name="taxCode"
            id="taxCode"
            value={formData.taxCode}
            onChange={handleChange}
            label={'Partita IVA (opzionale)'}
            maxLength={11}
          />
          <Textbox
            type="email"
            name="email"
            id="email"
            label={'Email'}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Textbox
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            label={'Numero di telefono'}
            required
            pattern="[0-9]*" // Permette solo numeri
            inputMode="numeric" // Migliora l'esperienza su dispositivi mobili
          />
        </div>
      ),
    },
    {
      fields: ['professionType', 'certifications', 'workArea', 'experience'],
      component: (
        <div className="flex flex-col gap-5">
          <select
            className="peer border-2 w-[300px] h-10 bg-transparent border-secondary-gray cursor-pointer
  text-[#C5C5C5] pl-[12px] pr-[12px] rounded-[6px] outline-none transition-all
  duration-300 focus:ring-secondary-green hover:border-secondary-green focus:border-secondary-green"
            name="professionType"
            value={formData.professionType}
            onChange={handleChange}
            required
          >
            <option value="">Seleziona tipo professionista</option>
            <option value="PT">Personal Trainer</option>
            <option value="Nutrizionista">Nutrizionista</option>
            <option value="Entrambi">Entrambi</option>
          </select>

          <Textbox
            type="text"
            name="workArea"
            id="workArea"
            label={'Sede lavorativa (città)'}
            value={formData.workArea}
            onChange={handleChange}
            required
          />
          <Textbox
            type="number"
            name="experience"
            id="experience"
            label={'Esperienza Professionale (anni)'}
            value={formData.experience}
            onChange={handleChange}
            required
          />
          <div className="flex flex-col gap-2">
            <p className="text-xl text-secondary-green">Certificazioni</p>
            <input
              type="file"
              className="w-[300px] text-secondary-green"
              name="certifications"
              accept="application/pdf, image/*"
              multiple
              onChange={handleChange}
              required
            />
          </div>
        </div>
      ),
    },
    {
      label: 'Breve Descrizione Attività',
      fields: ['description'],
      component: (
        <textarea
          name="description"
          className="peer border-2 w-[300px] h-[200px] bg-transparent border-secondary-gray cursor-text
        caret-[#C5C5C5] text-[#C5C5C5] pl-[12px] pr-[12px] rounded-[6px] outline-none transition-all
        duration-300 focus:ring-secondary-green hover:border-secondary-green focus:border-secondary-green
        glow-effect focus:transition-all focus:duration-300"
          value={formData.description}
          onChange={handleChange}
          required
        />
      ),
    },
    {
      fields: ['username', 'password', 'confirmPassword', 'profilePhoto'],
      component: (
        <div className="flex flex-col gap-5">
          <Textbox
            type="text"
            name="username"
            id="username"
            value={formData.username}
            label={'Username'}
            onChange={handleChange}
            required
          />
          <Textbox
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            label={'Password'}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Textbox
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            id="confirmPassword"
            label={'Conferma Password'}
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
          <div className="flex flex-col mt-5 gap-5">
            <p className="text-xl text-secondary-green">Foto profilo</p>
            <input
              type="file"
              name="profilePhoto"
              className="w-[300px] text-secondary-green"
              accept="image/*"
              onChange={handleChange}
              required
            />
            {formData.profilePhoto && renderFilePreview(formData.profilePhoto)}
          </div>
        </div>
      ),
    },
    {
      label: 'Tipologia di Abbonamento',
      fields: ['subscriptionType'],
      component: (
        <>
          <select
            className="peer border-2 w-[300px] h-10 bg-transparent border-secondary-gray cursor-pointer
  text-[#C5C5C5] pl-[10px] pr-[10px] rounded-[6px] outline-none transition-all
  duration-300 focus:ring-secondary-green hover:border-secondary-green focus:border-secondary-green"
            name="subscriptionType"
            value={formData.subscriptionType}
            onChange={handleChange}
            required
          >
            <option value="">Seleziona</option>
            <option value="Base">Base</option>
            <option value="Premium">Premium</option>
          </select>
          <CardProvider>
            <SubCards></SubCards>
          </CardProvider>
        </>
      ),
    },
    {
      label: 'Social Network (opzionale)',
      fields: ['socialNetwork', 'socialAccountName'],
      component: (
        <>
          <select
            name="socialNetwork"
            className="peer border-2 w-[300px] h-10 bg-transparent border-secondary-gray cursor-pointer
  text-[#C5C5C5] pl-[10px] pr-[10px] rounded-[6px] outline-none transition-all
  duration-300 focus:ring-secondary-green hover:border-secondary-green focus:border-secondary-green"
            value={formData.socialNetwork}
            onChange={handleChange}
          >
            <option value="Seleziona">Seleziona</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Twitter">Twitter</option>
          </select>
          {formData.socialNetwork && formData.socialNetwork !== 'Seleziona' && (
            <div className="mt-5">
              <label className="text-xl text-secondary-green">
                Nome account {formData.socialNetwork}
              </label>
              <Textbox
                type="text"
                name="socialAccountName"
                value={formData.socialAccountName}
                onChange={handleChange}
                required
              />
            </div>
          )}
        </>
      ),
    },
    {
      fields: ['termsAccepted', 'privacyPolicyAccepted'],
      component: (
        <div className="flex flex-col items-center gap-5">
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
            <label className="text-xl text-secondary-green">
              Accetto i Termini e Condizioni
            </label>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="privacyPolicyAccepted"
              checked={formData.privacyPolicyAccepted}
              onChange={handleChange}
              required
            />
            <label className="text-xl text-secondary-green">
              Accetto l&apos;Informativa Privacy
            </label>
          </div>
        </div>
      ),
    },
    {
      label: "Come hai conosciuto l'app",
      fields: ['referral'],
      component: (
        <div className="flex flex-col items-center gap-5">
          <Textbox
            type="text"
            name="referral"
            id="referral"
            value={formData.referral}
            onChange={handleChange}
            required
          />
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="receiveUpdates"
              checked={formData.receiveUpdates}
              onChange={handleChange}
            />
            <label className="text-xl text-secondary-green">
              Ricevere Aggiornamenti dall&apos;App
            </label>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center w-fit h-fit px-9 py-9 bg-primary-blue border-2 border-secondary-green rounded-lg">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col items-center justify-center"
      >
        <h2 className="text-4xl font-extrabold text-white">Registrati ora!</h2>
        <p className="text-sm text-gray-400 mt-3">
          Registrati in pochi semplici passi!
        </p>
        <div className="w-[395px] mb-10">
          <div className="w-[395px] bg-[#001e23] rounded-full h-2.5">
            <div
              className="bg-secondary-green h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="mb-3 flex flex-col gap-5">
          <label className="text-xl text-secondary-green">
            {steps[step].label}
          </label>
          <div className="flex justify-center">
            <div>
              {steps[step].component}

              {/* Checkbox per mostrare la password */}
              {['password', 'confirmPassword'].includes(
                steps[step]?.fields[0]
              ) && (
                <div className="mt-5 flex gap-2 justify-center items-center">
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label
                    className="text-xl text-secondary-green"
                    htmlFor="showPassword"
                  >
                    Mostra Password
                  </label>
                </div>
              )}

              <div className="flex flex-col gap-5 mt-10 justify-center items-center">
                {step > 0 && (
                  <Button
                    type="button"
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
                  ></Button>
                )}
                {step === steps.length - 1 && (
                  <Button type="submit" text={'Invia'}></Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormProfessionista;