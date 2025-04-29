export default (sequelize, DataTypes) => {
    // Définition du modèle "Todo"
    const Todo = sequelize.define('todos', {
      title: {
        type: DataTypes.STRING(255), // Le titre doit être une chaîne de caractères de max 255 caractères
        allowNull: false,            // Le titre est obligatoire
      },
      description: {
        type: DataTypes.TEXT,         // La description est facultative (champ texte long)
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(50),   // Le statut est une chaîne courte
        allowNull: false,             // Le statut est obligatoire
        defaultValue: 'pending',      // Par défaut, une tâche est "en attente" (pending)
      },
    });
  
    return Todo;
  };
  