/*
 * This file is here to help us to be able to use this file "components\researcher\orders\order-sidebar.js"
 * //TODO-refactorFile: refactor this file to follow the new component structure and best practice
 */

import useTranslation from 'next-translate/useTranslation';
import React, { useState, useEffect } from 'react';
import CopyIcon from 'public/img/files-and-text/copy.svg';
import EmailIcon from 'public/img/social-media/email.svg';
import FacebookIcon from 'public/img/social-media/facebook.svg';
import InstagramIcon from 'public/img/social-media/instagram.svg';
import TelegramIcon from 'public/img/social-media/telegram.svg';
import TwitterIcon from 'public/img/social-media/twitter.svg';
import WhatsappIcon from 'public/img/social-media/whatsapp.svg';
import { EncryptID } from './encrypt-id';
import QRcode from '@components/shared/QRcode';
import { ORIGIN, getEnv } from '@util';
import { useDispatch } from '@util/noval/index';
import { buildClass } from '@util/tag';

const OrderShareLink = ({
  surveyUrl,
  surveyId,
  surveyStatus,
  surveyType,
  surveyScaleId,
  assignmentId,
  checked,
  saveLink = null,
  showHeader = true,
  showShareLinks = false,
  iconsScale = '',
  responsesIsComplete,
  backgroundColor = 'bg-grey-300',
  urlSource = 'direct',
  mainStyle = '',
}) => {
  const origin = getEnv(ORIGIN);
  const { dispatch } = useDispatch();
  const { t, lang } = useTranslation();
  const [link, setLink] = useState('');
  const BASE_URL = `${origin}/${lang}/${
    assignmentId ? 'researcher' : 'survey'
  }`;
  const [copied, setCopied] = useState(false);
  const [source, setSource] = useState(urlSource);
  const [encryptedID, setEncryptedId] = useState();
  const scaleId = surveyScaleId && EncryptID(surveyScaleId);

  useEffect(() => {
    if (surveyUrl) setEncryptedId(surveyUrl);
    else if (surveyId !== undefined) {
      setEncryptedId(EncryptID(surveyId));
    }
  }, [surveyId, surveyUrl]);

  useEffect(() => {
    if (surveyType && surveyType === 'SCALE') {
      setLink(
        `${origin}/${lang}/scale/${
          source ?? 'direct'
        }/${scaleId}/${encryptedID}`
      );
    } else {
      setLink(
        `${BASE_URL}/${source}/${
          assignmentId ? 'protect' : 'anony'
        }/${encryptedID}/${
          assignmentId
            ? `${assignmentId}?responsesIsComplete=${responsesIsComplete}`
            : ''
        }`
      );
    }

    if (saveLink) saveLink(link);
    //TODO-warning: remove this warning
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encryptedID, source, responsesIsComplete]);

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }, [copied]);

  //Social media section
  const socialMedia = [
    {
      linkSource: 'facebook',
      Component: FacebookIcon,
    },
    {
      linkSource: 'twitter',
      Component: TwitterIcon,
    },
    {
      linkSource: 'instagram',
      Component: InstagramIcon,
    },
    {
      linkSource: 'whatsapp',
      Component: WhatsappIcon,
    },
    {
      linkSource: 'telegram',
      Component: TelegramIcon,
    },
    {
      linkSource: 'email',
      Component: EmailIcon,
    },
  ];

  const RenderSocialMedia = () => {
    return socialMedia.map(({ linkSource, Component }) => {
      return (
        <div
          className={`flex items-center justify-center gap-3 ${
            linkSource !== source && 'opacity-50'
          }`}
          key={linkSource}
          onClick={() => {
            setSource(linkSource);
          }}
        >
          <Component
            className={`w-8 h-9 cursor-pointer transform ${iconsScale} `}
          />
        </div>
      );
    });
  };

  const copyLink = e => {
    if (surveyStatus === 'OPENED' || checked) {
      //if their it is checked, it means that the condition was already done before this Component being used
      setCopied(true);
      return navigator.clipboard.writeText(e.target.value);
    } else {
      dispatch('notify', {
        type: 'warning',
        title: t('common:orders.order.shareWarningTitle'),
        info: t('common:orders.order.shareWarning'),
      });
    }
  };

  return (
    <div className={buildClass('flex flex-col gap-2', mainStyle)}>
      {showHeader && (
        <div className='capitalize text-md mx-3'>
          {t('common:orders.order.sidebar.shareSurvey')}
        </div>
      )}

      <div>
        <span
          className={buildClass(
            backgroundColor,
            `flex gap-1 ${
              lang === 'ar' ? 'flex - row - reverse' : 'flex'
            } justify-between px-3 py-2 h-14 w-full`
          )}
        >
          <input
            name='shareLink'
            dataTest='shareLink'
            readOnly
            value={link}
            style={{ direction: 'ltr' }}
            className={buildClass(
              backgroundColor,
              'w-full text-md outline-hidden border-none cursor-pointer focus:outline-hidden focus:border-none focus:ring-0 mt-2'
            )}
            onClick={e => {
              copyLink(e);
            }}
          />
          <CopyIcon className='h-1/2 mt-3' />
        </span>

        {copied && (
          <div className='mx-5 mt-2'>
            {t('common:orders.order.sidebar.copied')}
          </div>
        )}
      </div>

      <div className='flex gap-3 items-center justify-center mt-6'>
        <div className='flex flex-col gap-7 max-w-[50%]'>
          {showShareLinks && (
            <div className='text-md text-dark-100 text-center mt-3'>
              {t('common:orders.order.shareVia')}
            </div>
          )}
          <div
            className={`flex flex-wrap items-center justify-center gap-6 ${
              lang === 'ar' ? 'flex-row-reverse' : 'flex'
            }`}
          >
            {RenderSocialMedia()}
          </div>
        </div>

        <QRcode
          url={
            surveyType && surveyType === 'SCALE'
              ? `${origin}/${lang}/scale/qrcode/${scaleId}/${encryptedID}`
              : `${BASE_URL}/qrcode/${encryptedID}${
                  assignmentId
                    ? `/${assignmentId}?responsesIsComplete=${responsesIsComplete}`
                    : 'undefined'
                }`
          }
          size={120}
        />
      </div>
    </div>
  );
};

export default OrderShareLink;
