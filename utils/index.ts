import axios from "axios";
import jwtDecode from "jwt-decode";

interface ILogin {
  name: string;
  sub: string;
  picture: string;
  email?: string;
}

export const createOrGetUser = async (response: any, addUser: any) => {
  const decoded: ILogin = jwtDecode(response.credential);

  const { email, name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };

  addUser(user);

  await axios.post("http://localhost:3000/api/auth", user);
};
