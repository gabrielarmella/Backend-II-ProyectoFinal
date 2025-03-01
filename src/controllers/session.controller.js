export default class SessionController {
  login(req, res) {
      try {
        let token = null;
        if (req.token) {
            token = req.token;
        } else if (req.cookies && req.cookies["token"]) {
            token = req.cookies["token"];
        }
        if (!token) {
            throw new Error("No se proporcionó token de autenticación");
        }
        

        res.redirect("/current");
    } catch (error) {
        res.sendError(error);
    }
  }

  getCurrentUser(req, res) {
    try{

        const user = {
            id: req.id,
            name: req.name,
            surname: req.surname,
            email: req.email,
            age: req.age,
            role: req.role,
        };
        res.render("/current", {user});
    }catch(error){
        res.sendError(error);
    }

  }
}