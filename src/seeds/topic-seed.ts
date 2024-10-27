import mongoose from 'mongoose';
import { dbConnection } from '../config/db';
import topicSchema from '../models/topic-model'

const topicsData = [
    {
        name: "Imagen",
        permission: {
            availableImage: true,
            availableVideo: false,
            availableText: false
        }
    },
    {
        name: "Video",
        permission: {
            availableImage: false,
            availableVideo: true,
            availableText: false
        }
    },
    {
        name: "Text",
        permission: {
            availableImage: false,
            availableVideo: false,
            availableText: true
        }
    }
];

const seedDatabase = async () => {
    try {
        // Conexión a la base de datos
        await dbConnection()

        console.log("Conectado a la base de datos");


        await topicSchema.deleteMany({});
        console.log("Colección 'Topic' limpia");

        await topicSchema.insertMany(topicsData);
        console.log("Datos de topics insertados correctamente");

    } catch (error) {
        console.error("Error al insertar los datos de topics:", error);
    } finally {
        // Cierra la conexión
        mongoose.connection.close();
    }
};

// Ejecuta la función de seed
seedDatabase();
