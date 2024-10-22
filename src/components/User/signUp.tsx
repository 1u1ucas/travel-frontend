import { useState } from 'react';
import { UserType } from '../../types/user.type';
import bcrypt from 'bcryptjs';

import Steps from './steps';
import Button from '../ui/Button';

export interface User {
  accountType: number;
  name?: string;
  email?: string;
  password?: string;
  age?: string;
  interest?: string;
  bio?: string;
}




function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');



    


    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');

      try {
        // Vérifier si un utilisateur avec le même email existe déjà
        const checkResponse = await fetch(`http://localhost:8000/users?email=${email}`);
        const existingUsers = await checkResponse.json();
    
        if (existingUsers.length > 0) {
          setError('Un utilisateur avec cette adresse email existe déjà.');
          return (alert('Un utilisateur avec cette adresse email existe déjà.'));
        }
    

        // Créer un nouvel user avec un ID temporaire
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const hashedName = await bcrypt.hash(name, saltRounds);
        const newUser: UserType = {name: hashedName, email, password: hashedPassword };
  
      
        // Envoyer une requête POST pour ajouter le nouvel user
        const response = await fetch('http://localhost:8000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Convertir le user en JSON pour l'envoyer dans le corps de la requête
          body: JSON.stringify(newUser),
        });
  
        if (!response.ok) {
          throw new Error('Erreur lors de l\'ajout du user');
        }

        const result = await response.json();
        console.log('Utilisateur créé avec succès:', result);
  
        // Réinitialiser les champs du formulaire après l'ajout
        setName('');
        setEmail('');
        setPassword('');
      } catch (error) {
        console.error('Erreur:', error);
        setError('Une erreur est survenue lors de la soumission du formulaire.');
      }
    };

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-lg  max-w-md gap-10 bg-white">
        <div className="flex flex-col items-center  justify-start gap-4">
          <h1 className="font-bold text-3xl text-black">Registration Form</h1>
          <p className="text-black opacity-25">Please fill out this form with the required information</p>     
        </div>
        <Steps/>  
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input
                type="text"
                placeholder="User name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="email"
                placeholder="User email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="password"
                placeholder="User password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className='flex flex-row w-full items-end justify-end gap-2'>
                <Button 
                    variant="primary"
                    text="Ajouter Dépense"
                    type="submit"/>
            </div>
        </form>
    </div>
  )
}

export default SignUp
