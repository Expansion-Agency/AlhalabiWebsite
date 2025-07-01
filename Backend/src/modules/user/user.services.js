import database from "../../../database/databaseConnection";
import UserRepository from "../../../database/repositories/user.repository";


const userRepository = new UserRepository(database);
console.log(userRepository);


