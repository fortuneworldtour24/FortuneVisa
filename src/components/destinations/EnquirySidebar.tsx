import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_NUMBER } from '@/lib/contactInfo';

type Props = {
    country: string;
    slug: string;
    visaTypes: { type: string; label: string }[];
    selectedType: string;
    onTypeChange: (type: string) => void;
    feeText: string;
};

const inputCls =
    'w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200';

export function EnquirySidebar({ country, slug, visaTypes, selectedType, onTypeChange, feeText }: Props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [consent, setConsent] = useState(false);
    const [website, setWebsite] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
    const [error, setError] = useState('');

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (website) {
            setStatus('done');
            return;
        }
        if (!name.trim()) {
            setError('Please enter your name.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setError('Please enter a valid email address.');
            return;
        }
        const digits = phone.replace(/\D/g, '');
        if (phone.trim() && (digits.length < 10 || digits.length > 13)) {
            setError('Please enter a valid phone number.');
            return;
        }
        if (!consent) {
            setError('Please tick the consent box so we can contact you.');
            return;
        }
        if (!supabase) {
            setError('Enquiries are temporarily unavailable. Please call or WhatsApp us.');
            return;
        }

        setStatus('sending');
        // Column names must match the "enquiries" table. Adjust here if yours differ.
        const { error: dbError } = await supabase.from('enquiries').insert({
            full_name: name.trim(),
            email: email.trim(),
            phone: phone.trim() || null,
            destination: slug,
            visa_type: selectedType || null,
            message: message.trim() || null,
            consent: true,
        });

        if (dbError) {
            if (import.meta.env.DEV) console.warn('Enquiry failed:', dbError.message);
            setStatus('idle');
            setError('We could not send your enquiry. Please try again, or call or WhatsApp us.');
            return;
        }
        setStatus('done');
    };

    const waText = encodeURIComponent(`Hi Fortune Visa Services, I'd like help with the ${country} visa.`);

    return (
        <div className="space-y-3">
            <div className="rounded-3xl bg-white p-5 shadow-xl ring-1 ring-slate-200">
                <h2 className="text-lg font-extrabold text-ink">Free enquiry about {country}</h2>
                <p className="mt-1 text-sm text-slate-600">
                    Indicative fee: <strong>{feeText}</strong>. We reply during working hours.
                </p>

                {status === 'done' ? (
                    <div role="status" className="mt-4 flex items-start gap-3 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                        <p>Thank you! We have received your enquiry and will contact you soon.</p>
                    </div>
                ) : (
                    <form onSubmit={onSubmit} className="relative mt-4 space-y-3" noValidate>
                        <input aria-label="Full name" autoComplete="name" placeholder="Full name" className={inputCls} value={name} onChange={(e) => setName(e.target.value)} />
                        <input aria-label="Email" type="email" autoComplete="email" placeholder="Email address" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input aria-label="Phone" type="tel" autoComplete="tel" placeholder="Phone or WhatsApp (optional)" className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} />
                        {visaTypes.length > 0 ? (
                            <select aria-label="Visa type" className={inputCls} value={selectedType} onChange={(e) => onTypeChange(e.target.value)}>
                                {visaTypes.map((v) => (
                                    <option key={v.type} value={v.type}>{v.label}</option>
                                ))}
                            </select>
                        ) : null}
                        <textarea aria-label="Message" rows={2} placeholder="Message (optional)" className={inputCls} value={message} onChange={(e) => setMessage(e.target.value)} />

                        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                            <input tabIndex={-1} autoComplete="off" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
                        </div>

                        <label className="flex items-start gap-2 text-xs text-slate-600">
                            <input type="checkbox" className="mt-0.5" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                            <span>
                                I agree to the{' '}
                                <Link to="/privacy" target="_blank" className="font-semibold underline">Privacy Policy</Link> and consent to
                                being contacted about my enquiry.
                            </span>
                        </label>

                        {error ? (
                            <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
                        ) : null}

                        <button
                            type="submit"
                            disabled={status === 'sending'}
                            className="h-12 w-full rounded-full bg-primary-700 text-sm font-semibold text-white shadow-card transition hover:bg-primary-800 disabled:opacity-60"
                        >
                            {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                        </button>
                    </form>
                )}
            </div>

            <a
                href={`tel:${PHONE_TEL}`}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-900 text-sm font-semibold text-white shadow-card transition hover:bg-slate-800"
            >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call now · {PHONE_DISPLAY}
            </a>
            <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-500 text-sm font-semibold text-white shadow-card transition hover:bg-emerald-600"
            >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chat on WhatsApp
            </a>
        </div>
    );
}

export default EnquirySidebar;