import db from "../models/index.js";

const Todo = db.todo; //on recupere le modele Todo

//cration d'une nouvelle tache
export const createTodo = async (req, res) => {
    try {
        //creation d'un tache associé a m'utilisateur connecté (grace a req.userId)
        const todo = await Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status || 'pending', //si aucun statu forni on met 'penddig'
            user_id: req.userId,
        });

        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//recuperer toutes les taches utilisateurs connecté 

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.findAll({
            where: { user_id: req.userId }, // on filtre par l'utilisateur connecté
        });

        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// modifier une tache ( seulement si elle appartient a un utilisateur)

export const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findOne({
            where: { id: req.params.id, user_id: req.userId },
        });

        if (!todo) {
            return res.status(404).json({ message: "Tache non trouvé."});
        }
         await todo.uptdate(req.body); //On met les nouvelles données 
         res.status(200).json({ message : "Tache mise a jour ave succs !"});
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
};

// supprimer une tache (seulement si elle appartient a l'utilisateur)

export const deleteTodo =  async (req, res) => {
    try {
        const todo = await Todo.findOne({
            where: { id: req.params.id, user_id: req.userId },
        });

        if (!todo) {
            return res.status(404).json({ message: "tache non trouvée."});
        }

        await todo.destroy(); //suppression de la tache
        res.status(200).json({ message: "tache supprimée avec succes !"});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};
