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
        res.sendSuccess201({ token });
    } catch (error) {
        res.sendError(error);
    }
  }

  getCurrentUser(req, res) {
    try{

        const user = {
            id:req.id,
            roles:req.roles,
            email:req.email,
        };
        res.sendSuccess200(user);
    }catch(error){
        res.sendError(error);
    }

  }
}