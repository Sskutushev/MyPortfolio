import { useState, useRef, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Send, Mail, MessageSquare, Github, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';
import { OptimizedVideo } from '@/components/common/OptimizedVideo';
import { fadeInUp, staggerContainer } from '@/lib/motion-config';

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
    <section 
      id="contact" 
      className="py-24 bg-c-bg-secondary relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-accent opacity-20 blur-3xl animate-pulse-glow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          {...fadeInUp}
          className="relative z-10 text-center mb-16"
        >
          <h2
            id="contact-heading"
            className="pb-2 text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent"
          >
            {t('contact.title')}
          </h2>
          <p className="text-xl text-c-text-secondary">{t('contact.subtitle')}</p>
        </motion.div>

        <motion.div {...staggerContainer} className="grid md:grid-cols-12 gap-8 max-w-7xl mx-auto items-center">
          {/* Contact Info - теперь 4/12 ширины */}
          <motion.div
            {...fadeInUp}
            className="md:col-span-4 space-y-6"
            aria-label="Contact information"
          >
            <h3 className="text-2xl font-bold mb-6">{t('contact.info.title')}</h3>
            <div className="p-6 rounded-xl bg-c-bg-primary border border-c-border font-mono text-sm space-y-3">
              <div className="flex items-center gap-2"><MessageCircle className="text-c-accent-green" size={16} /><span><span className="text-c-accent-purple">const</span> <span className="text-c-accent-cyan">telegram</span> <span className="text-c-text-secondary">=</span> <span className="text-c-accent-green">'@sskutushev'</span><span className="text-c-text-secondary">;</span></span></div>
              <div className="flex items-center gap-2"><Mail className="text-c-accent-green" size={16} /><span><span className="text-c-accent-purple">const</span> <span className="text-c-accent-cyan">email</span> <span className="text-c-text-secondary">=</span> <span className="text-c-accent-green">'Sskutushev@gmail.com'</span><span className="text-c-text-secondary">;</span></span></div>
            </div>
            <a href="https://t.me/sskutushev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-c-bg-primary border border-c-border hover:border-c-accent-blue transition group">
              <MessageCircle className="text-c-accent-blue" />
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

          {/* Смартфон с видео - 4/12 ширины */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2 }} // Keep specific delay
            className="md:col-span-4 flex justify-center"
            aria-label="Contact form demonstration video"
          >
            <div className="relative w-full max-w-xs">
              {/* Контейнер смартфона */}
              <div className="relative bg-gray-900 rounded-[40px] p-5 shadow-2xl border-[12px] border-gray-800">
                {/* Камера */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-10 h-5 bg-gray-800 rounded-full flex justify-center items-center">
                  <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                </div>
                
                {/* Экран смартфона */}
                <div className="relative rounded-2xl overflow-hidden bg-black">
                  <OptimizedVideo
                    src="/images/Contact.MP4"
                    poster="/images/Contact-poster.jpg"
                    className="w-full h-full object-fill rounded-2xl"
                  />
                  
                  {/* Индикаторы уведомлений */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
                
                {/* Кнопки боковые */}
                <div className="absolute top-1/4 -left-3 w-1 h-16 bg-gray-700 rounded-l-lg"></div>
                <div className="absolute top-1/3 -left-3 w-1 h-8 bg-gray-700 rounded-l-lg"></div>
                <div className="absolute top-1/2 -right-3 w-1 h-20 bg-gray-700 rounded-r-lg"></div>
              </div>
              
              {/* Подпись */}
              <div className="mt-4 text-center text-c-text-secondary text-sm">
                {t('contact.demo.title', 'Демонстрация отправки сообщения')}
              </div>
            </div>
          </motion.div>

          {/* Форма - 4/12 ширины */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4 }} // Keep specific delay
            className="md:col-span-4"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              aria-label="Contact form"
              noValidate
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold mb-2"
                >
                  {t('contact.form.name.label')}
                  <span className="text-red-500" aria-label="required">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  data-testid="name-input"
                  {...register('name', { required: t('contact.form.name.required') })}
                  className="w-full px-4 py-3 rounded-xl bg-c-bg-primary border border-c-border focus:border-c-accent-blue focus:ring-2 focus:ring-c-accent-blue focus:ring-offset-2 outline-none transition"
                  placeholder={t('contact.form.name.placeholder')}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="mt-2 text-sm text-red-500 flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircle size={14} aria-hidden="true" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-semibold mb-2"
                >
                  {t('contact.form.contact.label')}
                  <span className="text-red-500" aria-label="required">*</span>
                </label>
                <input
                  id="contact"
                  type="text"
                  data-testid="contact-input"
                  {...register('contact', { required: t('contact.form.contact.required') })}
                  className="w-full px-4 py-3 rounded-xl bg-c-bg-primary border border-c-border focus:border-c-accent-blue focus:ring-2 focus:ring-c-accent-blue focus:ring-offset-2 outline-none transition"
                  placeholder={t('contact.form.contact.placeholder')}
                  aria-invalid={errors.contact ? 'true' : 'false'}
                  aria-describedby={errors.contact ? 'contact-error' : undefined}
                />
                {errors.contact && (
                  <p
                    id="contact-error"
                    className="mt-2 text-sm text-red-500 flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircle size={14} aria-hidden="true" />
                    {errors.contact.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold mb-2"
                >
                  {t('contact.form.message.label')}
                  <span className="text-red-500" aria-label="required">*</span>
                </label>
                <textarea
                  id="message"
                  data-testid="message-input"
                  {...register('message', { required: t('contact.form.message.required') })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-c-bg-primary border border-c-border focus:border-c-accent-blue focus:ring-2 focus:ring-c-accent-blue focus:ring-offset-2 outline-none transition resize-none"
                  placeholder={t('contact.form.message.placeholder')}
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p
                    id="message-error"
                    className="mt-2 text-sm text-red-500 flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircle size={14} aria-hidden="true" />
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div aria-label="reCAPTCHA verification">
                <Suspense fallback={
                  <div
                    className="w-full h-[78px] bg-c-bg-primary rounded-xl animate-pulse"
                    role="status"
                    aria-label="Loading reCAPTCHA"
                  >
                    <span className="sr-only">Loading reCAPTCHA...</span>
                  </div>
                }>
                  <ReCAPTCHAComponent
                    ref={recaptchaRef}
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    onChange={setRecaptchaToken}
                    theme="dark"
                    aria-label="reCAPTCHA challenge"
                  />
                </Suspense>
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading' || !recaptchaToken}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 rounded-xl bg-gradient-primary text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-c-accent-blue focus:ring-offset-2"
                aria-live="polite"
                aria-busy={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                      role="status"
                      aria-label="Submitting form"
                    />
                    <span>{t('contact.form.sending')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('contact.form.submit')}</span>
                    <Send size={20} aria-hidden="true" />
                  </>
                )}
              </motion.button>

              {status === 'success' && (
                <motion.div
                  data-testid="success-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center gap-2 text-green-500"
                  role="alert"
                  aria-live="assertive"
                >
                  <CheckCircle size={20} aria-hidden="true" />
                  <span>{t('contact.form.success')}</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-500"
                  role="alert"
                  aria-live="assertive"
                >
                  <AlertCircle size={20} aria-hidden="true" />
                  <span>{t('contact.form.error')}</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};