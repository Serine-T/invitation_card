/* eslint-disable max-len */
/* eslint-disable jsx-a11y/iframe-has-title */
import { memo } from 'react';

const Map = () => (
  <>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d687.0376070437098!2d44.53269506454408!3d40.193073153328974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abcd9d0e98ec5%3A0xf7979599e110e690!2sSouvenir%20Restaurant%20and%20Cafe!5e0!3m2!1sen!2sam!4v1703580128094!5m2!1sen!2sam"
      width="500"
      height="300"
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />

    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3050.08271672747!2d44.81594961246494!3d40.14044117136642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406aaead91206219%3A0x4003cbe690889756!2sGeghard%20Monastery!5e0!3m2!1sen!2sam!4v1703580360979!5m2!1sen!2sam"
      width="500"
      height="300"
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </>
);

export default memo(Map);
