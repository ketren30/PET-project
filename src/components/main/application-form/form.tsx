import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './form.css';

type Props = {
  isForAdults: boolean
}
interface Data {
  childName: string, 
  age: string, 
  yourName: string, 
  phone: string, 
  goal: string
}
 
const EmailContactForm: React.FC<Props> = ({isForAdults}) => {
  const form = useRef<HTMLFormElement>(null);
  const [childName, setChildName] = useState('');
  const [age, setAge] = useState('');
  const [yourName, setYourName] = useState('');
  const [phone, setPhone] = useState('');
  const [goal, setGoal] = useState('');
  
  const sendEmail = (e: React.FormEvent) => {
      e.preventDefault(); 
    
      if (form.current && !isForAdults) emailjs.sendForm('service_x2f1x25', 'child', form.current, 'm4D7pPGpvru3eYOH2')
        .then((result) => {
        }, (error) => {
      });
      if (form.current && isForAdults) emailjs.sendForm('service_x2f1x25', 'adult', form.current, 'm4D7pPGpvru3eYOH2')
        .then((result) => {
        }, (error) => {
      });
      setChildName('');
      setAge('');
      setYourName('');
      setPhone('');
      setGoal('');
  };

  const getPlaceholder = () => {
    if (isForAdults) return 'Ваш возраст'
    else return 'Возраст ученика'
  }
  
 
  return (
    <form ref={form} onSubmit={(sendEmail)} className='call-form'>
      {!isForAdults && <input 
        name="pupil_name" 
        className='main-input' 
        placeholder='Имя ученика'
        value={childName}
        onChange={(e)=>setChildName(e.currentTarget.value)}
      />}

      <input 
        type="number" 
        name="age" 
        className='main-input' 
        placeholder={getPlaceholder()}
        value={age}
        onChange={(e)=>setAge(e.currentTarget.value.toString())}
      />

      <input 
        type="text" 
        name="your_name" 
        className='main-input' 
        placeholder='Ваше имя'
        value={yourName}
        onChange={(e)=>setYourName(e.currentTarget.value)}
      />

      <input 
        type="text" 
        name="phone" 
        pattern='[0-9]{11}' 
        className='main-input' 
        placeholder='Номер телефона'
        value={phone}
        onChange={(e)=>setPhone(e.currentTarget.value)}
      /> 

      {isForAdults && <input 
        type="text" 
        name="goal" 
        className='main-input' 
        placeholder='Цель изучения языка'
        defaultValue={goal}
        onChange={(e)=>setGoal(e.currentTarget.value)}
      />}
      
      <input type="submit" value="Отправить" className='main-button' />
    </form>
  );
};
 
export default EmailContactForm;