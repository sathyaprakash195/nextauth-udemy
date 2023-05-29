import axios from "axios";
import { cookies } from "next/headers";

async function getUser() {
  try {
    const response = await axios.get(`${process.env.domain}/api/users/me`, {
      headers: {
        Cookie: `token=${cookies().get("token")?.value}`,
      },
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const user: any = await getUser();
  return (
    <div>
      <h1>Heyyy {user?.userName}</h1>
      <h1>Welcome To NEXT JS AUTHENTICATION</h1>
    </div>
  );
}
