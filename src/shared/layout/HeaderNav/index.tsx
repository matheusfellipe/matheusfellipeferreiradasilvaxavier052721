import { Burger, ActionIcon, Tooltip, Button, Group } from '@mantine/core';
import { IconPaw, IconDoorExit } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import AuthService from '@/app/auth/auth.service';
import { showNotification } from '@mantine/notifications';


type HeaderNavProps = {
  opened: boolean;
  toggle: () => void;
};

const HeaderNav = ({ opened, toggle }: HeaderNavProps) => {
  const navigate = useNavigate();
  const authService = new AuthService();

  const handleLogout = async () => {
    await authService.logout();
    showNotification({
      title: 'Success',
      message: 'Logout realizado com sucesso!',
      autoClose: 3000,
    });
    navigate('/login');
  };

  const scrollToPets = () => {
    const petsSection = document.getElementById('pets-section');
    if (petsSection) {
      petsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className='w-full px-4 py-3 flex items-center justify-between'>
      <div className="flex items-center gap-3 ml-8">
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />

        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-brand bg-brand text-white">
          <IconPaw size={20} />
        </div>

        <span className="text-2xl font-bold text-black">
          Meet Pets
        </span>
      </div>

      <Group gap="md" visibleFrom="sm">
        <Button variant="subtle" color="dark" size="sm" onClick={scrollToPets}>
          Pets
        </Button>
        <Button variant="subtle" color="dark" size="sm">
          Quero ser Tutor
        </Button>
        <Button variant="filled" color="green" size="sm">
          Tutores
        </Button>
      </Group>

      <Tooltip label="Logout" position="bottom">
        <ActionIcon
          variant="subtle"
          color="red"
          size="lg"
          onClick={handleLogout}
          className="mr-8"
        >
          <IconDoorExit size={24} />
        </ActionIcon>
      </Tooltip>

    </div>
  );
};

export default HeaderNav;
