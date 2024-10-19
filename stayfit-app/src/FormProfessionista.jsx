import { useEffect, useState } from 'react';
import { SubCards } from './MyComponents/subCards';
import { CardProvider } from './MyComponents/CardProvider';
import Button from './MyComponents/Button';
import Textbox from './MyComponents/Textbox';
import { SelectBox } from './MyComponents/SelectBox';

const FormProfessionista = ({ onClose, onChange }) => {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [professionalData, setProfessionalData] = useState({
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

  const [errors, setErrors] = useState({}); // Stato per gestire gli errori

  useEffect(() => {
    const savedFormData = localStorage.getItem('professionalData');
    if (savedFormData) {
      setProfessionalData(JSON.parse(savedFormData));
    }
  }, []);

  const totalStep = 7;
  const progress = (step / totalStep) * 100;

  const handleChange = ({ target: { name, value, type, checked, files } }) => {
    setProfessionalData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : files ? files : value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '', // Resetta l'errore quando l'utente cambia il campo
    }));
  };

  const handleSubscriptionChange = (subscriptionType) => {
    setProfessionalData((prev) => ({ ...prev, subscriptionType }));
    setErrors((prev) => ({
      ...prev,
      subscriptionType: '', // Resetta l'errore relativo a subscriptionType
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const nextStep = () => {
    if (isStepValid(step)) {
      if (
        step === steps.findIndex((s) => s.fields.includes('confirmPassword'))
      ) {
        if (professionalData.password !== professionalData.confirmPassword) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: 'Le password non corrispondono.',
          }));
          return;
        }
      }

      if (step === steps.length - 1) {
        if (!professionalData.termsAccepted || !professionalData.privacyPolicyAccepted) {
          setErrors((prev) => ({
            ...prev,
            termsAccepted: !professionalData.termsAccepted
              ? 'Devi accettare i Termini e Condizioni.'
              : '',
            privacyPolicyAccepted: !professionalData.privacyPolicyAccepted
              ? "Devi accettare l'Informativa Privacy."
              : '',
          }));
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
    // Salva i dati in localStorage
    localStorage.setItem('professionalData', JSON.stringify(professionalData));
    alert('Dati inviati correttamente!');
  };

  const isStepValid = (i) => {
    let stepErrors = {};
    let hasErrors = false;

    steps[i].fields.forEach((f) => {
      if (f === 'taxCode') {
        if (professionalData.taxCode && !/^\d{11}$/.test(professionalData.taxCode)) {
          stepErrors.taxCode =
            'La partita IVA deve contenere esattamente 11 cifre.';
          hasErrors = true;
        }
      }

      if (f === 'phone' && !/^\d+$/.test(professionalData.phone)) {
        stepErrors.phone = 'Il numero di telefono deve contenere solo cifre.';
        hasErrors = true;
      }

      if (f === 'subscriptionType' && !professionalData.subscriptionType) {
        stepErrors[f] = 'Devi selezionare un piano di abbonamento.';
        hasErrors = true;
      }

      if (
        !professionalData[f] &&
        f !== 'taxCode' &&
        f !== 'socialNetwork' &&
        f !== 'socialAccountName'
      ) {
        stepErrors[f] = 'Questo campo è obbligatorio.';
        hasErrors = true;
      }
    });

    if (Object.keys(stepErrors).length > 0 && !stepErrors.taxCode) {
      stepErrors.stepError = 'Compila tutti i campi obbligatori.';
    }

    setErrors(stepErrors);
    return !hasErrors;
  };

  const professionOptions = [
    { value: 'personalTrainer', label: 'Personal Trainer' },
    { value: 'nutrizionista', label: 'Nutrizionista' },
    { value: 'entrambi', label: 'Entrambi' },
  ];

  const socialOptions = [
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'linkedin', label: 'LinkedIn' },
  ];

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
            value={professionalData.firstName}
            label={'Nome'}
            onChange={handleChange}
            required
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName}</p>
          )}
          <Textbox
            type="text"
            name="lastName"
            id="lastName"
            value={professionalData.lastName}
            label={'Cognome'}
            onChange={handleChange}
            required
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
          <Textbox
            type="date"
            name="birthDate"
            id="birthDate"
            label="Data di nascita"
            value={professionalData.birthDate}
            onChange={handleChange}
            required
          />
          {errors.birthDate && (
            <p className="text-red-500">{errors.birthDate}</p>
          )}
          <Textbox
            type="text"
            name="taxCode"
            id="taxCode"
            value={professionalData.taxCode}
            onChange={handleChange}
            label={'Partita IVA (opzionale)'}
            maxLength={11}
          />
          {errors.taxCode && <p className="text-red-500">{errors.taxCode}</p>}
          <Textbox
            type="email"
            name="email"
            id="email"
            label={'Email'}
            value={professionalData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <Textbox
            type="tel"
            id="phone"
            name="phone"
            value={professionalData.phone}
            onChange={handleChange}
            label={'Numero di telefono'}
            required
            pattern="[0-9]*" // Permette solo numeri
            inputMode="numeric"
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}
        </div>
      ),
    },
    {
      fields: ['professionType', 'certifications', 'workArea', 'experience'],
      component: (
        <div className="flex flex-col gap-5">
          <SelectBox
            name="professionType"
            value={professionalData.professionType}
            onChange={handleChange}
            label={'Seleziona tipo professionista'}
            options={professionOptions}
            required
          ></SelectBox>
          {errors.professionType && (
            <p className="text-red-500">{errors.professionType}</p>
          )}
          <Textbox
            type="text"
            name="workArea"
            id="workArea"
            label={'Sede lavorativa (città)'}
            value={professionalData.workArea}
            onChange={handleChange}
            required
          />
          {errors.workArea && <p className="text-red-500">{errors.workArea}</p>}
          <Textbox
            type="number"
            name="experience"
            id="experience"
            label={'Esperienza Professionale (anni)'}
            value={professionalData.experience}
            onChange={handleChange}
            required
          />
          {errors.experience && (
            <p className="text-red-500">{errors.experience}</p>
          )}
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
            {errors.certifications && (
              <p className="text-red-500">{errors.certifications}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      label: 'Breve Descrizione Attività',
      fields: ['description'],
      component: (
        <div>
          <textarea
            name="description"
            className="peer border-2 w-[300px] h-[200px] bg-transparent border-secondary-gray cursor-text
              caret-[#C5C5C5] text-[#C5C5C5] pl-[12px] pr-[12px] rounded-[6px] outline-none transition-all
              duration-300 focus:ring-secondary-green hover:border-secondary-green focus:border-secondary-green"
            value={professionalData.description}
            onChange={handleChange}
            required
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
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
            value={professionalData.username}
            label={'Username'}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
          <Textbox
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            label={'Password'}
            value={professionalData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <Textbox
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            id="confirmPassword"
            label={'Conferma Password'}
            value={professionalData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}
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
            {errors.profilePhoto && (
              <p className="text-red-500">{errors.profilePhoto}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      label: 'Tipologia di Abbonamento',
      fields: ['subscriptionType'],
      component: (
        <div>
          <CardProvider>
            <SubCards onSubscriptionChange={handleSubscriptionChange} />
          </CardProvider>
          {!professionalData.subscriptionType && errors.subscriptionType && (
            <p className="text-red-500">{errors.subscriptionType}</p>
          )}
        </div>
      ),
    },
    {
      label: 'Social Network (opzionale)',
      fields: ['socialNetwork', 'socialAccountName'],
      component: (
        <div>
          <SelectBox
            name="socialNetwork"
            value={professionalData.socialNetwork}
            onChange={handleChange}
            label={'Seleziona social network'}
            options={socialOptions}
            required
          ></SelectBox>
          {errors.socialNetwork && (
            <p className="text-red-500">{errors.socialNetwork}</p>
          )}
          {professionalData.socialNetwork && professionalData.socialNetwork !== 'Seleziona' && (
            <div className="mt-5">
              <label className="text-xl text-secondary-green">
                Nome account {professionalData.socialNetwork}
              </label>
              <Textbox
                type="text"
                name="socialAccountName"
                value={professionalData.socialAccountName}
                onChange={handleChange}
              />
              {errors.socialAccountName && (
                <p className="text-red-500">{errors.socialAccountName}</p>
              )}
            </div>
          )}
        </div>
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
              checked={professionalData.termsAccepted}
              onChange={handleChange}
              required
            />
            <label className="text-xl text-secondary-green">
              Accetto i Termini e Condizioni
            </label>
          </div>
          {errors.termsAccepted && (
            <p className="text-red-500">{errors.termsAccepted}</p>
          )}
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="privacyPolicyAccepted"
              checked={professionalData.privacyPolicyAccepted}
              onChange={handleChange}
              required
            />
            <label className="text-xl text-secondary-green">
              Accetto l'Informativa Privacy
            </label>
          </div>
          {errors.privacyPolicyAccepted && (
            <p className="text-red-500">{errors.privacyPolicyAccepted}</p>
          )}
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
            value={professionalData.referral}
            onChange={handleChange}
            required
          />
          {errors.referral && <p className="text-red-500">{errors.referral}</p>}
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="receiveUpdates"
              checked={professionalData.receiveUpdates}
              onChange={handleChange}
            />
            <label className="text-xl text-secondary-green">
              Vuoi ricevere aggiornamenti dall&apos;app?
            </label>
          </div>
        </div>
      ),
    },
  ];

  console.log(professionalData);

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
        <div className="w-[395px] mb-10 mt-5">
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
              <div>
                {steps[step].component}
                {errors.stepError && (
                  <p className="text-red-500">{errors.stepError}</p>
                )}
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
                      color={'grey'}
                    />
                  )}
                  {step < steps.length - 1 && (
                    <Button type="button" onClick={nextStep} text={'Avanti'} />
                  )}
                  {step === steps.length - 1 && (
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      text={'Invia'}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-3 text-white text-sm mt-2">
          <p>
            Sei già iscritto?{' '}
            <span
              onClick={onChange}
              className="text-secondary-green hover:underline cursor-pointer"
            >
              Accedi
            </span>
          </p>
          <p onClick={onClose} className="underline cursor-pointer">
            Chiudi
          </p>
        </div>
      </form>
    </div>
  );
};

export default FormProfessionista;
