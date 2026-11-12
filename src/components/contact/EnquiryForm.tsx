import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { PASSPORT_COUNTRY_CODES } from '@/config/visaOptions';
import { SelectField } from '@/components/forms/SelectField';
import { usePassportOptions } from '@/hooks/usePassportOptions';
import { DESTINATIONS, VISA_TYPES, findDestination, isVisaType } from '@/lib/visaData';
import { supabase } from '@/lib/supabase';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base text-ink shadow-sm placeholder:text-slate-400 transition-colors hover:border-primary-200 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100';

const textareaClass =
  'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-ink shadow-sm placeholder:text-slate-400 transition-colors hover:border-primary-200 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100';

function buildSchema(t: (key: string) => string) {
  return z.object({
    fullName: z
      .string({ message: t('enquiry.errors.name') })
      .trim()
      .min(1, { message: t('enquiry.errors.name') })
      .max(120, { message: t('enquiry.errors.name') }),
    email: z
      .string({ message: t('enquiry.errors.email') })
      .trim()
      .min(3, { message: t('enquiry.errors.email') })
      .max(254, { message: t('enquiry.errors.email') })
      .regex(EMAIL_PATTERN, { message: t('enquiry.errors.email') }),
    phone: z
      .string()
      .trim()
      .max(30, { message: t('enquiry.errors.phone') })
      .nullish()
      .or(z.literal('')),
    passport: z.string().nullish().or(z.literal('')),
    destination: z.string().max(80).nullish().or(z.literal('')),
    visaType: z.string().max(40).nullish().or(z.literal('')),
    travelDate: z.string().nullish().or(z.literal('')),
    message: z
      .string()
      .trim()
      .max(2000, { message: t('enquiry.errors.message') })
      .nullish()
      .or(z.literal('')),
    consent: z
      .boolean({ message: t('enquiry.errors.consent') })
      .refine((val) => val === true, { message: t('enquiry.errors.consent') }),
    company: z.string().nullish().or(z.literal('')),
  });
}

type FormValues = z.infer<ReturnType<typeof buildSchema>>;

function readPrefill(searchParams: URLSearchParams): FormValues {
  const passport = searchParams.get('passport') ?? '';
  const destination = searchParams.get('destination') ?? '';
  const visaType = searchParams.get('visaType') ?? '';
  const travelDate = searchParams.get('travelDate') ?? '';

  return {
    fullName: '',
    email: '',
    phone: '',
    passport: (PASSPORT_COUNTRY_CODES as readonly string[]).includes(passport) ? passport : '',
    destination: findDestination(destination) ? destination : '',
    visaType: isVisaType(visaType) ? visaType : '',
    travelDate: travelDate || '',
    message: '',
    consent: false,
    company: '',
  };
}

export function EnquiryForm() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const passportOptions = usePassportOptions();
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const schema = useMemo(() => buildSchema(t), [t]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: readPrefill(searchParams),
    mode: 'onBlur',
  });

  const watchedPassport = watch('passport');
  const watchedDestination = watch('destination');
  const watchedVisaType = watch('visaType');
  const watchedConsent = watch('consent');
  const isPrefilled = Boolean(watchedPassport || watchedDestination || watchedVisaType);

  const destinationOptions = DESTINATIONS.map((destination) => ({
    value: destination.slug,
    label: `${destination.flag}  ${destination.country}`,
  }));
  const visaOptions = VISA_TYPES.map((type) => ({ value: type, label: t(`visaTypes.${type}`) }));

  const registerWithSync = (
    name: 'fullName' | 'email' | 'phone' | 'travelDate' | 'message' | 'company',
    validateOnBlur = false,
  ) => {
    return register(name, {
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(name, event.target.value, { shouldValidate: false });
      },
      onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(name, event.target.value, { shouldValidate: validateOnBlur });
      },
    });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const getFieldValue = (name: string): string => {
      const el = form.elements.namedItem(name);
      if (!el) return '';
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
        return el.value;
      }
      return '';
    };

    // Read directly from DOM to ensure browser autofill values are captured
    setValue('fullName', getFieldValue('fullName'), { shouldValidate: true });
    setValue('email', getFieldValue('email'), { shouldValidate: true });
    setValue('phone', getFieldValue('phone'), { shouldValidate: false });
    setValue('travelDate', getFieldValue('travelDate'), { shouldValidate: false });
    setValue('message', getFieldValue('message'), { shouldValidate: false });
    setValue('company', getFieldValue('company'), { shouldValidate: false });

    const passportVal = getFieldValue('passport');
    setValue('passport', passportVal, { shouldValidate: false });

    const destinationVal = getFieldValue('destination');
    setValue('destination', destinationVal, { shouldValidate: false });

    const visaTypeVal = getFieldValue('visaType');
    setValue('visaType', visaTypeVal, { shouldValidate: false });

    const consentEl = form.elements.namedItem('consent') as HTMLInputElement | null;
    if (consentEl) {
      setValue('consent', consentEl.checked, { shouldValidate: true });
    }

    return handleSubmit(onSubmit)(event);
  };

  const onSubmit = async (values: FormValues) => {
    if (values.company) {
      // honeypot filled — treat as spam, pretend success
      setStatus('success');
      return;
    }
    if (!supabase) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    const { error } = await supabase.from('enquiries').insert({
      full_name: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone?.trim() || null,
      passport_country: values.passport || null,
      destination: values.destination || null,
      visa_type: values.visaType || null,
      travel_date: values.travelDate || null,
      message: values.message?.trim() || null,
      consent: true,
    });

    if (error) {
      setStatus('error');
      return;
    }
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-card sm:p-12">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-success-50 text-success-700">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-xl font-bold text-ink">{t('enquiry.successTitle')}</h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted sm:text-base">{t('enquiry.successBody')}</p>
        <button
          type="button"
          onClick={() => {
            reset(readPrefill(new URLSearchParams()));
            setStatus('idle');
          }}
          className="mt-6 inline-flex h-12 items-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-ink transition-colors hover:bg-slate-50"
        >
          {t('enquiry.sendAnother')}
        </button>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form
      onSubmit={handleFormSubmit}
      noValidate
      className="space-y-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8"
    >
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-ink">{t('enquiry.formTitle')}</h2>
        {isPrefilled && <p className="text-sm leading-relaxed text-muted">{t('enquiry.prefilled')}</p>}
      </div>

      {/* honeypot — hidden from users, visible to bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="enquiry-company">Company</label>
        <input
          id="enquiry-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...registerWithSync('company')}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="enquiry-name"
          label={t('enquiry.name')}
          error={errors.fullName?.message}
          autoComplete="name"
          required
          {...registerWithSync('fullName', true)}
        />
        <TextField
          id="enquiry-email"
          label={t('enquiry.email')}
          type="email"
          error={errors.email?.message}
          autoComplete="email"
          required
          {...registerWithSync('email', true)}
        />
        <TextField
          id="enquiry-phone"
          label={t('enquiry.phone')}
          type="tel"
          error={errors.phone?.message}
          autoComplete="tel"
          {...registerWithSync('phone')}
        />
        <TextField
          id="enquiry-travel-date"
          label={t('enquiry.travelDate')}
          type="date"
          error={errors.travelDate?.message}
          {...registerWithSync('travelDate')}
        />
        <SelectField
          id="enquiry-passport"
          name="passport"
          label={t('enquiry.passport')}
          value={watchedPassport ?? ''}
          onChange={(value) => setValue('passport', value, { shouldValidate: false })}
          options={passportOptions}
          placeholder={t('enquiry.optionalPlaceholder')}
        />
        <SelectField
          id="enquiry-destination"
          name="destination"
          label={t('enquiry.destination')}
          value={watchedDestination ?? ''}
          onChange={(value) => setValue('destination', value, { shouldValidate: false })}
          options={destinationOptions}
          placeholder={t('enquiry.optionalPlaceholder')}
        />
        <SelectField
          id="enquiry-visa"
          name="visaType"
          label={t('enquiry.visaType')}
          value={watchedVisaType ?? ''}
          onChange={(value) => setValue('visaType', value, { shouldValidate: false })}
          options={visaOptions}
          placeholder={t('enquiry.optionalPlaceholder')}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="enquiry-message" className="text-sm font-semibold text-ink">
          {t('enquiry.message')}
        </label>
        <textarea
          id="enquiry-message"
          rows={5}
          className={textareaClass}
          aria-invalid={Boolean(errors.message)}
          {...registerWithSync('message')}
        />
        {errors.message && <p className="text-sm text-error-700">{errors.message.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
          <input
            type="checkbox"
            id="enquiry-consent"
            name="consent"
            className="mt-0.5 h-5 w-5 shrink-0 rounded-md border-slate-300 text-primary-700 focus:ring-primary-500"
            aria-invalid={Boolean(errors.consent)}
            checked={Boolean(watchedConsent)}
            onChange={(event) => setValue('consent', event.target.checked, { shouldValidate: true })}
          />
          <span>
            {t('enquiry.consent').split('Privacy Policy')[0]}
            <Link to="/privacy" className="font-semibold text-primary-700 underline hover:text-primary-800">
              Privacy Policy
            </Link>
            {t('enquiry.consent').split('Privacy Policy')[1]}
          </span>
        </label>
        {errors.consent && <p className="text-sm text-error-700">{errors.consent.message}</p>}
      </div>

      {status === 'error' && (
        <p role="alert" className="rounded-2xl bg-error-50 px-4 py-3 text-sm text-error-700">
          {t('enquiry.errorGeneric')}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary-700 px-6 text-base font-semibold text-white shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-800 hover:shadow-lift disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {submitting ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Send className="h-5 w-5" aria-hidden="true" />}
        {submitting ? t('enquiry.submitting') : t('enquiry.submit')}
      </button>
    </form>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

function TextField({ id, label, error, type = 'text', autoComplete, required, ...rest }: TextFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-error-700">
          {error}
        </p>
      )}
    </div>
  );
}
