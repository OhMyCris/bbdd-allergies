const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const salt = 10; // complejidad del encriptado

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, unique: true, required: true, trim: true },
		password: { type: String, required: true, trim: true },
		phone: { type: String, required: true, trim: true },
		allergies: { type: Object, required: false, trim: true },
		favorites: [{ type: Schema.Types.ObjectId, ref: "Food" }],
        diary:[{type: Schema.Types.ObjectId, ref: "Diario"}]
	},
	{
		timestamps: true, //te genera la fecha de creacion y modificacion del objeto
	}
);

userSchema.pre("save", (next) => {
	console.log(this);
	if (this.password) {
		this.password = bcrypt.hashSync(this.password, salt);
	}
	next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
