import { useState } from 'react';
import Button from '../ui/Button';
import { UserType } from '../../types/user.type';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Vérifier si un utilisateur avec le même email existe déjà
      const checkResponse = await fetch(`http://localhost:8000/users?email=${email}`);
      const existingUsers = await checkResponse.json();

      if (existingUsers.length > 0) {
        setError('Un utilisateur avec cette adresse email existe déjà.');
        return;
      }

      // Créer un nouvel utilisateur
      const newUser: UserType = { name, email, password };

      // Envoyer une requête POST pour ajouter le nouvel utilisateur
      const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de l\'utilisateur');
      }

      const result = await response.json();
      console.log('Utilisateur créé avec succès:', result);
      setSuccess('Utilisateur créé avec succès.');

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
    <div className="flex flex-col items-center justify-center p-6 rounded-lg max-w-md gap-10 bg-white">
      <div className="flex flex-col items-center justify-start gap-4">
        <h1 className="font-bold text-3xl text-black">Registration Form</h1>
        <p className="text-black opacity-25">Please fill out this form with the required information</p>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

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
        <div className="flex flex-row w-full items-end justify-end gap-2">
          <Button
            variant="primary"
            text="Créer un compte"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

export default SignUp;
