import BaseModel from "../models/base.model.js";

 class UserRepository extends BaseModel {
    constructor(database) {
      super(database, "user");
    }

    async findByEmail(email) {
        try {
            const user = await this.database.findOne({email});
            if(!user) {
                throw new Error("User not found in the database with this email");
            }
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

}

export default UserRepository;