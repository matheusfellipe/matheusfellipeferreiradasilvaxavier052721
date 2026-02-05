import { Burger, ActionIcon, Tooltip, Button, Group } from '@mantine/core';
import { IconPaw, IconDoorExit } from '@tabler/icons-react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthService from '@/app/auth/auth.service';
import { showNotification } from '@mantine/notifications';


type HeaderNavProps = {
  opened: boolean;
  toggle: () => void;
  onPetsClick?: () => void;
  onNovoTutorClick?: () => void;
  onTutoresClick?: () => void;
};

const HeaderNav = ({ opened, toggle, onPetsClick, onNovoTutorClick, onTutoresClick }: HeaderNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const handlePetsClick = () => {
    if (onPetsClick) {
      onPetsClick();
    } else {
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
    }
  };

  const handleNovoTutorClick = () => {
    if (onNovoTutorClick) {
      onNovoTutorClick();
    } else {
      navigate('/tutores/create');
    }
  };

  const handleTutoresClick = () => {
    if (onTutoresClick) {
      onTutoresClick();
    } else {
      navigate('/tutores');
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
        <Button variant="subtle" color="dark" size="sm" onClick={handlePetsClick}>
          Pets
        </Button>
        <Button variant="subtle" color="dark" size="sm" onClick={handleNovoTutorClick}>
          Novo Tutor
        </Button>
        <Button variant="filled" color="green" size="sm" onClick={handleTutoresClick}>
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
