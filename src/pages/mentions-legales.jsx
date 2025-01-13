import React from 'react';
import styles from '../styles/Pages.module.scss';
import Link from 'next/link';

export default function MentionsLegales() {
  return (
    <main className={styles.pages}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Mentions Légales
        </h1>

        <div className="bg-white rounded-lg shadow p-8 space-y-8">
          {/* Informations sur l'association */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Informations légales
            </h2>
            <p className="text-gray-600 mb-4">
              Kréa Tout Eure<br />
              Association loi 1901<br />
              Créée en 2017<br />
              Siège social : MAIRIE PL BARETTE 27200 VERNON<br />
              SIRET : 832 116 735 00016<br />
            </p>
          </section>

          {/* Hébergeur */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. Hébergement du site
            </h2>
            <p className="text-gray-600">
              Ce site est hébergé par :<br />
              Hostinger<br />
               Hostinger International Ltd, 61 Lordou Vironos Street, 6023 Larnaca, Chypre<br />
              https://www.hostinger.fr/contact
            </p>
            <p className="text-gray-600">
                Directeur de la publication : THENEAU Maxime Contact :<br />
                <Link href="https://maximefreelance.fr" target='_blank'>maximefreelance.fr</Link><br />
                maximefreelance.fr; maxime@maximefreelance.fr
            </p>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. Propriété intellectuelle
            </h2>
            <p className="text-gray-600">
              L'ensemble de ce site relève de la législation française et internationale 
              sur le droit d'auteur et la propriété intellectuelle. Tous les droits de 
              reproduction sont réservés, y compris pour les documents téléchargeables 
              et les représentations iconographiques et photographiques.
            </p>
          </section>

          {/* Données personnelles */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Protection des données personnelles
            </h2>
            <p className="text-gray-600 mb-4">
              Conformément au Règlement Général sur la Protection des Données (RGPD), 
              vous disposez d'un droit d'accès, de rectification, de suppression et 
              d'opposition aux données personnelles vous concernant.
            </p>
            <p className="text-gray-600">
              Pour exercer ces droits ou pour toute question sur le traitement de vos 
              données, vous pouvez nous contacter à l'adresse suivante : maxime @ maximefreelance.fr
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Cookies
            </h2>
            <p className="text-gray-600">
              Notre site utilise des cookies à des fins techniques pour son bon fonctionnement. 
              Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.
            </p>
          </section>

          {/* Liens hypertextes */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. Liens hypertextes
            </h2>
            <p className="text-gray-600">
              La création de liens hypertextes vers notre site est soumise à notre accord 
              préalable. Notre site peut contenir des liens hypertextes vers d'autres sites. 
              Notre association n'est pas responsable du contenu de ces sites externes.
            </p>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              7. Droit applicable
            </h2>
            <p className="text-gray-600">
              Les présentes mentions légales sont soumises au droit français. En cas de 
              litige, les tribunaux français seront compétents.
            </p>
          </section>
        </div>

        {/* Date de mise à jour */}
        <p className="text-gray-500 text-sm text-center mt-8">
          Dernière mise à jour : Janvier 2025
        </p>
      </div>
    </main>
  );
}