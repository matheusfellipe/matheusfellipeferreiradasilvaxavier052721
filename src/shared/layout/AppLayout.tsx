import { AppShell, Stack, Button } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import { Outlet } from "react-router-dom";

const AppLayout = () => {

    const [opened, { toggle, close }] = useDisclosure();
    const navigate = useNavigate();
    const location = useLocation();

    const handlePetsClick = () => {
      close();
      if (location.pathname === '/home') {
        const petsSection = document.getElementById('pets-section');
        if (petsSection) {
          petsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        navigate('/home');
        setTimeout(() => {
          const petsSection = document.getElementById('pets-section');
          if (petsSection) {
            petsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    };

    const handleNovoTutorClick = () => {
      close();
      navigate('/tutores/create');
    };

    const handleTutoresClick = () => {
      close();
      navigate('/tutores');
    };

    return (
        <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
        >
        <AppShell.Header>
           <HeaderNav 
             opened={opened} 
             toggle={toggle}
             onPetsClick={handlePetsClick}
             onNovoTutorClick={handleNovoTutorClick}
             onTutoresClick={handleTutoresClick}
           />
        </AppShell.Header>

        <AppShell.Navbar py="md" px={4}>
            <Stack gap="xs">
              <Button variant="subtle" color="dark" size="md" fullWidth onClick={handlePetsClick}>
                Pets
              </Button>
              <Button variant="subtle" color="dark" size="md" fullWidth onClick={handleNovoTutorClick}>
                Novo Tutor
              </Button>
              <Button variant="filled" color="green" size="md" fullWidth onClick={handleTutoresClick}>
                Tutores
              </Button>
            </Stack>
        </AppShell.Navbar>

        <AppShell.Main>
           <Outlet/> 
        </AppShell.Main>
        </AppShell>
    )
}

export default AppLayout


