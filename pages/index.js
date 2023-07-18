import Header from "../src/components/header";
import Footer from "../src/components/footer";
import { useSession, signIn, signOut } from "next-auth/react"


export default function Home() {

  const { data: session } = useSession()
  
  return (
    <>
      <Header />
      <Footer />
    </>
  );
}
