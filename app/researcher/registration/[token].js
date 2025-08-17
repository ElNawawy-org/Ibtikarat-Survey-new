import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import DownArrow from 'public/img/arrows/down-arrow.svg';
import LangIcon from 'public/img/lang.svg';
import ContactWhatsApp from '@components/researcher/contact-whatsApp';
import CreateResearcher from '@components/researcher/create-researcher';
import RenderMeta from '@util/render-meta';

const Registration = () => {
  //Start Hooks
  const { t, lang } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  //End Hooks

  //Start Variables
  const localSwitchTarget = lang === 'ar' ? 'en' : 'ar';
  //End Variables

  //Start Functions
  //TODO-typescript: set this function's type
  const toggleCard = () => {
    setIsOpen(!isOpen);
  };
  //End Functions

  return (
    <>
      <RenderMeta title={t('common:titles.registration')} />
      <div
        className='flex flex-col justify-center items-center w-full'
        style={{
          backgroundImage: 'url(/img/backgrounds/login-img.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div
          className='absolute top-4 rtl:left-7 ltr:right-7 cursor-pointer flex justify-center items-center gap-1 mb-8'
          onClick={() => setLanguage(localSwitchTarget)}
        >
          <h3 className='capitalize text-md text-white'>
            {t(`common:header.language.${localSwitchTarget}`)}
          </h3>
          <LangIcon
            className='relative cursor-pointer'
            fill='#FFF'
          />
        </div>

        <div className='flex flex-col gap-6 justify-center items-center w-full my-8 min-h-screen'>
          <div className='bg-white xl:w-1/2 md:w-3/4 p-6 sm:w-[90%] w-[98%] px-6 mt-8'>
            <div
              className='text-white cursor-pointer flex justify-between items-center my-4'
              onClick={toggleCard}
            >
              <h2 className='text-xl text-dark-400'>
                {t('common:researcher.registration.contactModal')}
              </h2>
              <span>
                <DownArrow className='transform scale-75' />
              </span>
            </div>
            {isOpen && (
              <div className=''>
                {/* <MySupervisor /> */}
                <ContactWhatsApp />
              </div>
            )}
          </div>
          <div className='h-full flex justify-center bg-white xl:w-1/2 md:w-3/4 sm:w-[90%] py-8 px-6 p-6 min-h-[60vh]'>
            <CreateResearcher />
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
