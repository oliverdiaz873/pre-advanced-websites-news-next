'use client';

import React from 'react'
import { useTranslations } from 'next-intl'
import { LegalLayout } from '@/shared/layouts';

export const Terms: React.FC = () => {
  const t = useTranslations('legal')
  
  const sections = t.raw('terms.sections') as Array<{
    id: string
    title: string
    content: string
    email?: string
  }>

  return (
    <>
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
