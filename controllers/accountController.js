class AccountController {
  login = async (req, res) => {
    try {
      return res.status(200).message(`Welcome ${user.name}!`);
    } catch (error) {
      console.error(error);
      return res.status(404).message('Unable to login. Incorrect password or username.');
    }
  }

  logout = async (req, res) => {
    // TODO: Logout stuff.
  }

  signin = async (req, res) => {
    // TODO: Sign in stuff.
  }
};

const accountController = new AccountController();

export default accountController;
