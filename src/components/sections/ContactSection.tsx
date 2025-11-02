import { useState, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Send, Mail, MessageSquare, Github, CheckCircle, AlertCircle } from 'lucide-react';

const ReCAPTCHAComponent = lazy(() => import('react-google-recaptcha'));

interface FormData {
  name: string;
  contact: string;
  message: string;
}

export const ContactSection = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<any>(null);

  const onSubmit = async (data: FormData) => {
    if (!recaptchaToken) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    
    try {
      const response = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, recaptchaToken })
      });

      if (response.ok) {
        setStatus('success');
        reset();
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-c-bg-secondary relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-accent opacity-20 blur-3xl animate-pulse-glow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 text-center mb-16"
        >
          <h2 className="pb-2 text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-c-text-secondary">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">{t('contact.info.title')}</h3>
            <div className="p-6 rounded-xl bg-c-bg-primary border border-c-border font-mono text-sm space-y-3">
              <div><span className="text-c-accent-purple">const</span> <span className="text-c-accent-cyan">telegram</span> <span className="text-c-text-secondary">=</span> <span className="text-c-accent-green">'@sskutushev'</span><span className="text-c-text-secondary">;</span></div>
              <div><span className="text-c-accent-purple">const</span> <span className="text-c-accent-cyan">email</span> <span className="text-c-text-secondary">=</span> <span className="text-c-accent-green">'Sskutushev@gmail.com'</span><span className="text-c-text-secondary">;</span></div>
            </div>
            <a href="https://t.me/sskutushev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-c-bg-primary border border-c-border hover:border-c-accent-blue transition group">
              <MessageSquare className="text-c-accent-blue" />
              <div>
                <div className="font-semibold group-hover:text-c-accent-blue transition">Telegram</div>
                <div className="text-sm text-c-text-secondary">@sskutushev</div>
              </div>
            </a>
            <a href="mailto:Sskutushev@gmail.com" className="flex items-center gap-3 p-4 rounded-xl bg-c-bg-primary border border-c-border hover:border-c-accent-blue transition group">
              <Mail className="text-c-accent-blue" />
              <div>
                <div className="font-semibold group-hover:text-c-accent-blue transition">Email</div>
                <div className="text-sm text-c-text-secondary">Sskutushev@gmail.com</div>
              </div>
            </a>
            <a href="https://github.com/Sskutushev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-c-bg-primary border border-c-border hover:border-c-accent-blue transition group">
              <Github className="text-c-accent-blue" />
              <div>
                <div className="font-semibold group-hover:text-c-accent-blue transition">GitHub</div>
                <div className="text-sm text-c-text-secondary">github.com/Sskutushev</div>
              </div>
            </a>
            <div className="p-6 rounded-xl bg-gradient-primary/10 border border-c-accent-blue/30">
              <div className="flex items-start gap-3">
                <MessageSquare className="text-c-accent-blue flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">{t('contact.botInfo.title')}</h4>
                  <p className="text-sm text-c-text-secondary">{t('contact.botInfo.description')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">{t('contact.form.name.label')}</label>
                <input type="text" {...register('name', { required: t('contact.form.name.required') })} className="w-full px-4 py-3 rounded-xl bg-c-bg-primary border border-c-border focus:border-c-accent-blue outline-none transition" placeholder={t('contact.form.name.placeholder')}/>
                {errors.name && <p className="mt-2 text-sm text-red-500 flex items-center gap-1"><AlertCircle size={14} />{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">{t('contact.form.contact.label')}</label>
                <input type="text" {...register('contact', { required: t('contact.form.contact.required') })} className="w-full px-4 py-3 rounded-xl bg-c-bg-primary border border-c-border focus:border-c-accent-blue outline-none transition" placeholder={t('contact.form.contact.placeholder')}/>
                {errors.contact && <p className="mt-2 text-sm text-red-500 flex items-center gap-1"><AlertCircle size={14} />{errors.contact.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">{t('contact.form.message.label')}</label>
                <textarea {...register('message', { required: t('contact.form.message.required') })} rows={5} className="w-full px-4 py-3 rounded-xl bg-c-bg-primary border border-c-border focus:border-c-accent-blue outline-none transition resize-none" placeholder={t('contact.form.message.placeholder')}/>
                {errors.message && <p className="mt-2 text-sm text-red-500 flex items-center gap-1"><AlertCircle size={14} />{errors.message.message}</p>}
              </div>

              <Suspense fallback={<div className="w-full h-[78px] bg-c-bg-primary rounded-xl animate-pulse"></div>}>
                <ReCAPTCHAComponent
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={setRecaptchaToken}
                  theme="dark"
                />
              </Suspense>

              <motion.button
                type="submit"
                disabled={status === 'loading' || !recaptchaToken}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 rounded-xl bg-gradient-primary text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t('contact.form.sending')}
                  </>
                ) : (
                  <>
                    {t('contact.form.submit')}
                    <Send size={20} />
                  </>
                )}
              </motion.button>

              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center gap-2 text-green-500">
                  <CheckCircle size={20} />
                  <span>{t('contact.form.success')}</span>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-500">
                  <AlertCircle size={20} />
                  <span>{t('contact.form.error')}</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};