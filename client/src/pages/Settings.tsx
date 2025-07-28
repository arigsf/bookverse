import { Navbar } from "../components/Navbar";
import { MainContainer } from "../components/Containers/MainContainer";

export default function Settings() {
	return (
		<>
			<Navbar></Navbar>
			<MainContainer>
				<h1 className="text-2xl font-bold mb-6">Configurações da Conta</h1>
			</MainContainer>
		</>
	);
}