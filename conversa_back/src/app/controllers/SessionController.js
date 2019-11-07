const Usuario = require('../models/Usuario');

class SessionController {
	async session(req, res) {
		const { senha, email } = req.body;

		let usuario = await Usuario.get(email);

		if (usuario[0].length === 0) {
			let message = 'User Not Found';
			return res.status(404).json({ status: false, message });
		}

		let senhaHash = usuario[0][0].senha;

		let usuarioAutenticado = await Usuario.checaPassword(senhaHash, senha);

		if (usuarioAutenticado) {
			const { idUsuario, nome, admin } = usuario[0][0];
			const dataToken = { idUsuario, nome, admin };

			const token = Usuario.generateToken(dataToken);

			return res.status(200).json({ status: true, token });
		} else {
			let message = 'User Not Found';
			return res.status(404).json({ status: false, message });
		}
	}
}

module.exports = new SessionController();
