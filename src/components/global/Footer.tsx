import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
  <div className="h-fit w-full bg-zinc-950 flex flex-col justify-center items-center py-8 md:pt-24">
    <div className='h-fit w-[90%] bg-transparent flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0'>

    <div className="space-y-4 flex-1 max-w-[400px] w-full">
        <p className="text-xl leading-none md:text-xl lg:text-4xl text-white font-extralight">NAVIGATION</p>
        <div className="text-base leading-snug md:text-sm lg:text-xl text-white font-extralight">
          <Link href="/" passHref><p className="hover:text-gray-400 transition-colors ease-in-out duration-300">Menu</p></Link>
          <Link href="/catalogue" passHref><p className="hover:text-gray-400 transition-colors ease-in-out duration-300">Catalogue</p></Link>
          <Link href="/realisations" passHref><p className="hover:text-gray-400 transition-colors ease-in-out duration-300">Réalisations</p></Link>
          <Link href="/infos" passHref><p className="hover:text-gray-400 transition-colors ease-in-out duration-300">Infos</p></Link>
          <Link href="/contact" passHref><p className="hover:text-gray-400 transition-colors ease-in-out duration-300">Contact</p></Link>
        </div>
      </div>

      <div className="space-y-4 flex-1 max-w-[350px] w-full">
        <p className="text-xl leading-none md:text-xl lg:text-4xl text-white font-extralight">CONTACT</p>
        <div className="text-base leading-snug md:text-sm lg:text-xl text-white font-extralight flex flex-col lg:space-y-1">
          <Link href="tel:+33768109617" className="inline-flex items-center text-white hover:text-gray-400 transition-colors ease-in-out duration-300 font-extralight group">
            07 68 10 96 17
            <svg width="25" height="25" viewBox="0 0 15 15" className="text-white group-hover:text-gray-400 transition-colors ease-in-out duration-300 sm:ml-1" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
          </Link>
          <Link href="mailto:mgevenementiel31@gmail.com" className="inline-flex items-center text-white hover:text-gray-400 transition-colors ease-in-out duration-300 font-extralight group">
            mgevenementiel31@gmail.com
            <svg width="25" height="25" viewBox="0 0 15 15" className="text-white group-hover:text-gray-400 transition-colors ease-in-out duration-300 sm:ml-1" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
          </Link>
          <Link href="/contact" className="inline-flex items-center text-white hover:text-gray-400 transition-colors ease-in-out duration-300 font-extralight group">
            Contactez-nous
            <svg width="25" height="25" viewBox="0 0 15 15" className="text-white group-hover:text-gray-400 transition-colors ease-in-out duration-300 sm:ml-1" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
          </Link>
          <div className='flex space-x-2 mt-1 sm:mt-0'>
            <Link href="https://www.instagram.com/mg_evenementiel/" target="_blank" className="hover:text-gray-400 transition-colors ease-in-out duration-300">
              <svg width="35" height="35" className='text-white hover:text-gray-400 transition-colors ease-in-out duration-300' viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12.9091 12.909C13.2365 12.5817 13.4918 12.1895 13.6588 11.7577C13.8195 11.3443 13.9294 10.8718 13.961 10.1799C13.9926 9.48665 14.0001 9.26529 14.0001 7.50001C14.0001 5.73473 13.9926 5.51328 13.961 4.82008C13.9294 4.12821 13.8195 3.65573 13.6588 3.24228C13.4956 2.80857 13.2398 2.41567 12.9091 2.091C12.5844 1.76028 12.1915 1.50437 11.7578 1.34113C11.3443 1.18056 10.8718 1.0707 10.1799 1.03924C9.48675 1.00748 9.26537 1 7.50006 1C5.73476 1 5.51333 1.00748 4.82014 1.03912C4.12826 1.0707 3.65578 1.18056 3.24233 1.34125C2.80862 1.50447 2.41573 1.76032 2.09105 2.09098C1.76032 2.41563 1.5044 2.80852 1.34113 3.24225C1.18056 3.65573 1.0707 4.12821 1.03924 4.82008C1.00748 5.51328 1 5.73471 1 7.50001C1 9.26532 1.00748 9.48675 1.03924 10.1799C1.07083 10.8718 1.18069 11.3443 1.34138 11.7577C1.5046 12.1915 1.76045 12.5843 2.09111 12.909C2.41578 13.2397 2.80867 13.4955 3.24238 13.6587C3.65586 13.8194 4.12834 13.9293 4.82019 13.9609C5.51348 13.9925 5.73483 14 7.50012 14C9.2654 14 9.48685 13.9925 10.18 13.9609C10.8719 13.9293 11.3444 13.8194 11.7578 13.6587C12.1896 13.4917 12.5818 13.2364 12.9091 12.909ZM1.99949 6.73496C1.99974 6.94524 2.00005 7.19543 2.00005 7.50002C2.00005 7.80461 1.99974 8.0548 1.99949 8.26507C1.99849 9.08596 1.99824 9.29856 2.01963 9.7655C2.04625 10.3509 2.07823 10.7811 2.17588 11.1053C2.26976 11.417 2.37505 11.7342 2.7188 12.1171C3.06255 12.4999 3.39411 12.6733 3.81645 12.8007C4.23879 12.928 4.7696 12.9554 5.23052 12.9764C5.75332 13.0003 5.96052 13.0002 7.05714 12.9999L7.50006 12.9999C7.79304 12.9999 8.03569 13.0001 8.2409 13.0004C9.08195 13.0013 9.29425 13.0015 9.76575 12.9799C10.3512 12.9533 10.7814 12.9213 11.1056 12.8237C11.4173 12.7298 11.7345 12.6245 12.1173 12.2807C12.5001 11.937 12.6735 11.6054 12.8009 11.1831C12.9283 10.7607 12.9557 10.2299 12.9767 9.76902C13.0005 9.24689 13.0004 9.04027 13.0002 7.94749V7.94738L13.0001 7.50039L13.0001 7.05747C13.0004 5.96085 13.0005 5.75365 12.9766 5.23085C12.9556 4.76993 12.9282 4.23912 12.8009 3.81678C12.6735 3.39445 12.5001 3.06288 12.1173 2.71913C11.7345 2.37538 11.4172 2.27009 11.1056 2.17621C10.7813 2.07856 10.3511 2.04658 9.76571 2.01996C9.29421 1.99836 9.08194 1.99859 8.24092 1.99951H8.24092C8.0357 1.99974 7.79305 2.00001 7.50006 2.00001L7.05704 1.99993C5.96051 1.99964 5.75331 1.99958 5.23052 2.02343C4.7696 2.04446 4.23879 2.07183 3.81645 2.19921C3.39411 2.32659 3.06255 2.49999 2.7188 2.88281C2.37505 3.26562 2.26976 3.58286 2.17588 3.89453C2.07823 4.21874 2.04625 4.64894 2.01963 5.23437C1.99824 5.70131 1.99849 5.91401 1.99949 6.73496ZM7.49996 5.25015C6.25741 5.25015 5.25012 6.25744 5.25012 7.49999C5.25012 8.74254 6.25741 9.74983 7.49996 9.74983C8.74251 9.74983 9.7498 8.74254 9.7498 7.49999C9.7498 6.25744 8.74251 5.25015 7.49996 5.25015ZM4.25012 7.49999C4.25012 5.70515 5.70512 4.25015 7.49996 4.25015C9.2948 4.25015 10.7498 5.70515 10.7498 7.49999C10.7498 9.29483 9.2948 10.7498 7.49996 10.7498C5.70512 10.7498 4.25012 9.29483 4.25012 7.49999ZM10.9697 4.7803C11.3839 4.7803 11.7197 4.44452 11.7197 4.0303C11.7197 3.61609 11.3839 3.2803 10.9697 3.2803C10.5555 3.2803 10.2197 3.61609 10.2197 4.0303C10.2197 4.44452 10.5555 4.7803 10.9697 4.7803Z" fill="currentColor"></path></svg>
            </Link>
            <Link href="https://www.mariages.net/chapiteau-mariage/mg-evenementiel--e331790" target="_blank">
              <svg width="35" height="35" className='text-white hover:text-gray-400 transition-colors ease-in-out duration-300' viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.89346 2.35248C3.49195 2.35248 2.35248 3.49359 2.35248 4.90532C2.35248 6.38164 3.20954 7.9168 4.37255 9.33522C5.39396 10.581 6.59464 11.6702 7.50002 12.4778C8.4054 11.6702 9.60608 10.581 10.6275 9.33522C11.7905 7.9168 12.6476 6.38164 12.6476 4.90532C12.6476 3.49359 11.5081 2.35248 10.1066 2.35248C9.27059 2.35248 8.81894 2.64323 8.5397 2.95843C8.27877 3.25295 8.14623 3.58566 8.02501 3.88993C8.00391 3.9429 7.98315 3.99501 7.96211 4.04591C7.88482 4.23294 7.7024 4.35494 7.50002 4.35494C7.29765 4.35494 7.11523 4.23295 7.03793 4.04592C7.01689 3.99501 6.99612 3.94289 6.97502 3.8899C6.8538 3.58564 6.72126 3.25294 6.46034 2.95843C6.18109 2.64323 5.72945 2.35248 4.89346 2.35248ZM1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.0084 1.35248 6.73504 1.76049 7.20884 2.2953C7.32062 2.42147 7.41686 2.55382 7.50002 2.68545C7.58318 2.55382 7.67941 2.42147 7.79119 2.2953C8.265 1.76049 8.99164 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-4 md:space-y-2 lg:space-y-4 flex-1 max-w-[400px] w-full text-start md:text-end">
        <p className="text-xl leading-none md:text-xl lg:text-4xl text-white font-extralight">MG ÉVÉNEMENTS</p>
        <div className="text-base leading-snug md:text-sm lg:text-xl text-white font-extralight">
          <p className="text-base md:text-sm lg:text-xl font-thin leading-snug">Adresse de récupération :</p>
            Labège 31670
        </div>
        <div className="flex justify-center md:justify-end w-full">
          <img
            src="/static/svg/footer-logo.svg"
            alt="Logo"
            width={200}
            height={200}
            className="md:ml-auto md:-mr-10 md:w-[200px] lg:w-[250px]"
          />
        </div>
      </div>   
    </div>
    <div className='w-[90%] flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0 mt-6 sm:mt-20'>
      <p className='text-sm leading-snug md:text-xs lg:text-base font-extralight text-white text-center md:text-left'>
        © {new Date().getFullYear()} MG Événementiel - All rights reserved. Developed by Void Sofwtare Inc.
      </p>
      <Link href="/mentions-legales" passHref>
        <p className='text-sm md:text-xs lg:text-base text-white hover:text-gray-400 transition-colors ease-in-out duration-300 font-extralight'>Mentions légales</p>
      </Link>
    </div>
  </div>
  );
};

export default Footer;