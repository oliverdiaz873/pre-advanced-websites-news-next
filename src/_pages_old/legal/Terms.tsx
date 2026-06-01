'use client';

import React from 'react'
import { useTranslation } from 'react-i18next'
import { LegalLayout } from '../../shared/layouts';
import { SEO } from '../../shared/components'

export const Terms: React.FC = () => {
  const { t } = useTranslation('legal')
  
  const sections = t('terms.sections', { returnObjects: true }) as Array<{
    id: string
    title: string
    content: string
    email?: string
  }>

  return (
    <>
      <SEO 
        title={t('terms.title')}
        description={t('terms.intro')}
      />
      <LegalLayout title={t('terms.title')} date={t('terms.date')}>
      <p>{t('terms.intro')}</p>
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

export default Terms
