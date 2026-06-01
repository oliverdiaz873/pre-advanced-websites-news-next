'use client';

import React from 'react'
import { useTranslation } from 'react-i18next'
import { LegalLayout } from '../../shared/layouts'
import { SEO } from '../../shared/components'

export const Privacy: React.FC = () => {
  const { t } = useTranslation('legal')
  
  const sections = t('privacy.sections', { returnObjects: true }) as Array<{
    id: string
    title: string
    content: string
    email?: string
  }>

  return (
    <>
      <SEO 
        title={t('privacy.title')}
        description={t('privacy.intro')}
      />
      <LegalLayout title={t('privacy.title')} date={t('privacy.date')}>
      <p>{t('privacy.intro')}</p>
      {sections.map(section => (
        <div key={section.id}>
          <h2>{section.title}</h2>
          <p>
            {section.content}
            {section.email && <strong>{section.email}</strong>}
          </p>
        </div>
      ))}
    </LegalLayout>
    </>
  )
}

export default Privacy
