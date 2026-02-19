import React from 'react';
import { motion } from 'framer-motion';
import TranslationsDictionary from '../Translations';
import { useLang } from '../LangProvider';

const LegalPage = ({ title, content }) => {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#010116] text-gray-900 dark:text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white dark:bg-[#1a1a2e] shadow-lg rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#5328EA] to-[#7855E6] py-6 px-8">
            <h1 className="text-3xl font-Gotham font-bold text-white">{title}</h1>
          </div>
          <div className="p-8 space-y-6 text-gray-700 dark:text-gray-200">
            {content}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const CGU = () => {
  const selectedLang = useLang();
  
  return (
    <LegalPage
      title={TranslationsDictionary[selectedLang]?.["terms_of_service"]}
      content={
        <>
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {TranslationsDictionary[selectedLang]?.["effective_date"]} 05/06/2025
            </p>
            <span className="px-3 py-1 text-xs font-medium text-[#5328EA] bg-[#5328EA]/10 rounded-full">
              {TranslationsDictionary[selectedLang]?.["official_document"]}
            </span>
          </div>

          <p className="text-lg">
            {TranslationsDictionary[selectedLang]?.["cgu_intro"]}
          </p>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">
              {TranslationsDictionary[selectedLang]?.["legal_mentions"]}
            </h2>
            <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
              <p>{TranslationsDictionary[selectedLang]?.["publisher"]}</p>
              <p className="mt-2">{TranslationsDictionary[selectedLang]?.["hosting_provider"]}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">
              {TranslationsDictionary[selectedLang]?.["site_access"]}
            </h2>
            <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
              <p>{TranslationsDictionary[selectedLang]?.["site_access_desc"]}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">
              {TranslationsDictionary[selectedLang]?.["user_account"]}
            </h2>
            <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
              <p>{TranslationsDictionary[selectedLang]?.["user_account_desc"]}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">
              {TranslationsDictionary[selectedLang]?.["training_content"]}
            </h2>
            <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
              <p>{TranslationsDictionary[selectedLang]?.["training_content_desc"]}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">
              {TranslationsDictionary[selectedLang]?.["ai_training"]}
            </h2>
            <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
              <p>{TranslationsDictionary[selectedLang]?.["ai_training_desc"]}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">
              {TranslationsDictionary[selectedLang]?.["payment_access"]}
            </h2>
            <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
              <p>{TranslationsDictionary[selectedLang]?.["payment_access_desc"]}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">
              {TranslationsDictionary[selectedLang]?.["data_collection"]}
            </h2>
            <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
              <p>{TranslationsDictionary[selectedLang]?.["data_collection_desc"]}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">
              {TranslationsDictionary[selectedLang]?.["intellectual_property"]}
            </h2>
            <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
              <p>{TranslationsDictionary[selectedLang]?.["intellectual_property_desc"]}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">
              {TranslationsDictionary[selectedLang]?.["responsibilities"]}
            </h2>
            <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
              <p>{TranslationsDictionary[selectedLang]?.["responsibilities_desc"]}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">
              {TranslationsDictionary[selectedLang]?.["applicable_law"]}
            </h2>
            <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
              <p>{TranslationsDictionary[selectedLang]?.["applicable_law_desc"]}</p>
            </div>
          </div>
        </>
      }
    />
  );
};


export const CGV = () => {
  const selectedLang = useLang();

  return (
  <LegalPage
    title={TranslationsDictionary[selectedLang]?.["terms_of_service"]}
    content={(
      <>
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{TranslationsDictionary[selectedLang]?.["terms_effective_date"]}</p>
          <span className="px-3 py-1 text-xs font-medium text-[#5328EA] bg-[#5328EA]/10 rounded-full">{TranslationsDictionary[selectedLang]?.["official_document"]}</span>
        </div>
        
        <p className="text-lg">{TranslationsDictionary[selectedLang]?.["terms_intro"]}</p>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">{TranslationsDictionary[selectedLang]?.["pricing_title"]}</h2>
          <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
            <p>{TranslationsDictionary[selectedLang]?.["pricing_text"]}</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">{TranslationsDictionary[selectedLang]?.["payment_title"]}</h2>
          <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
            <p>{TranslationsDictionary[selectedLang]?.["payment_text"]}</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">{TranslationsDictionary[selectedLang]?.["delivery_title"]}</h2>
          <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
            <p>{TranslationsDictionary[selectedLang]?.["delivery_text"]}</p>
          </div>
        </div>
      </>
    )}
  />
  );
}

export const MentionsLegales = () => {
  const selectedLang = useLang();
  
  return (
  <LegalPage
    title="Mentions légales"
    content={(
      <>
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{TranslationsDictionary[selectedLang]?.["legal_effective_date"]}</p>
          <span className="px-3 py-1 text-xs font-medium text-[#5328EA] bg-[#5328EA]/10 rounded-full">{TranslationsDictionary[selectedLang]?.["legal_info"]}</span>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">{TranslationsDictionary[selectedLang]?.["publisher_title"]}</h2>
          <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
            <p>
              <strong>Lumia</strong> (https://eip-lumia.fr)
              <br />
              <strong>LUMIA </strong>{TranslationsDictionary[selectedLang]?.["publisher_text"]}
              <br />
              Email : contact@eip-lumia.fr
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">{TranslationsDictionary[selectedLang]?.["director_title"]}</h2>
          <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
            <p>{TranslationsDictionary[selectedLang]?.["director_text"]}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">{TranslationsDictionary[selectedLang]?.["hosting_title"]}</h2>
          <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
            <p>
              {TranslationsDictionary[selectedLang]?.["hosting_text"]}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">{TranslationsDictionary[selectedLang]?.["activity_title"]}</h2>
          <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
            <p>
              {TranslationsDictionary[selectedLang]?.["activity_text"]}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">{TranslationsDictionary[selectedLang]?.["intellectual_property_title"]}</h2>
          <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
            <p>
              {TranslationsDictionary[selectedLang]?.["intellectual_property_text"]}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">{TranslationsDictionary[selectedLang]?.["personal_data_title"]}</h2>
          <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
            <p>
              {TranslationsDictionary[selectedLang]?.["personal_data_text"]} <a href="/confidentialite" className="text-[#5328EA] underline">politique de confidentialité</a>.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">{TranslationsDictionary[selectedLang]?.["contact_title"]}</h2>
          <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
            <p>{TranslationsDictionary[selectedLang]?.["contact_text"]}</p>
          </div>
        </div>
      </>
    )}
  />
  );
}

export const Confidentialite = () => {
  const selectedLang = useLang();
  
  return (
    <LegalPage
      title={TranslationsDictionary[selectedLang]?.["confidentiality_policy"]}
      content={(
        <>
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              2025
            </p>
            <span className="px-3 py-1 text-xs font-medium text-[#5328EA] bg-[#5328EA]/10 rounded-full">
              {TranslationsDictionary[selectedLang]?.["official_document"]}
            </span>
          </div>
          
          <p className="text-lg leading-relaxed">
            {TranslationsDictionary[selectedLang]?.["confidentiality_intro"]}
          </p>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">
              1. {TranslationsDictionary[selectedLang]?.["your_privacy_matters"]}
            </h2>
            <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
              <p className="leading-relaxed">
                {TranslationsDictionary[selectedLang]?.[["privacy_commitment"]]}
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">
              2. {TranslationsDictionary[selectedLang]?.["information_collection"]}
            </h2>
            <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
              <p className="leading-relaxed">
                {TranslationsDictionary[selectedLang]?.["collection_policy"]}
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">
              3. {TranslationsDictionary[selectedLang]?.["data_storage_security"]}
            </h2>
            <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
              <p className="leading-relaxed">
                {TranslationsDictionary[selectedLang]?.["security_measures"]}
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">
              4. {TranslationsDictionary[selectedLang]?.["third_party_services"]}
            </h2>
            <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
              <p className="leading-relaxed">
                {TranslationsDictionary[selectedLang]?.["third_party_policy"]}
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">
              5. {TranslationsDictionary[selectedLang]?.["access_control"]}
            </h2>
            <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
              <p className="leading-relaxed">
                {TranslationsDictionary[selectedLang]?.["user_rights"]}
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">
              6. {TranslationsDictionary[selectedLang]?.["employee_confidentiality"]}
            </h2>
            <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
              <p className="leading-relaxed">
                {TranslationsDictionary[selectedLang]?.["employee_policy"]}
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">
              7. {TranslationsDictionary[selectedLang]?.["legal_compliance"]}
            </h2>
            <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
              <p className="leading-relaxed">
                {TranslationsDictionary[selectedLang]?.["legal_disclosure"]}
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#5328EA] dark:text-[#9579FA] mb-4">
              8. {TranslationsDictionary[selectedLang]?.["policy_changes"]}
            </h2>
            <div className="pl-4 border-l-2 border-[#5328EA] dark:border-[#9579FA]">
              <p className="leading-relaxed">
                {TranslationsDictionary[selectedLang]?.["changes_notice"]}
              </p>
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-gradient-to-r from-[#5328EA]/5 to-[#7855E6]/5 rounded-xl border border-[#5328EA]/20">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-[#5328EA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#5328EA] dark:text-[#9579FA] mb-2">
                  {TranslationsDictionary[selectedLang]?.["contact_us"]}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {TranslationsDictionary[selectedLang]?.["contact_privacy"]}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    />
  );
};
