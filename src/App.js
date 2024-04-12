import React from 'react';
import './App.css';
import { Help, HelpTrigger, HelpStep } from './components/Tour';

function App() {
  const steps = [
    {
      target: '.header-title',
      content: 'Bienvenue sur notre plateforme! Cette section est pour vous accueillir et donner un aperçu rapide de l’application.',
      placement: 'bottom'
    },
    {
      target: '.input-field',
      content: 'Vous pouvez saisir des informations ici. Ce champ est prévu pour des entrées utilisateur comme des noms ou des numéros.',
      placement: 'bottom'
    },
    {
      target: '.submit-btn',
      content: 'Cliquez ici pour soumettre vos informations. Assurez-vous de vérifier les données avant de continuer.',
      placement: 'top'
    }
  ];

  return (
    <Help steps={steps}>
      <div className="App App-header min-h-screen flex flex-col items-center justify-center">
        <header className="App-header w-full max-w-lg">
          <HelpStep target=".header-title" >
            <h1 className="header-title text-3xl font-bold text-white mb-4">
              Bienvenue sur Notre App
            </h1>
          </HelpStep>
          <HelpStep target=".input-field" >
            <input type="text" placeholder="Entrez votre texte ici" className="input-field w-full px-4 py-2 bg-white bg-opacity-25 border border-white border-opacity-50 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition" />
          </HelpStep>
          <HelpStep target=".submit-btn">
            <button className="submit-btn mt-4 w-full bg-white bg-opacity-25 hover:bg-opacity-50 text-white font-bold py-2 px-4 rounded">
              Soumettre
            </button>
          </HelpStep>
          <HelpTrigger>
            <button className="mt-4 text-white hover:underline">
              Démarrer le guide
            </button>
          </HelpTrigger>
        </header>
      </div>
    </Help>
  );
}

export default App;
