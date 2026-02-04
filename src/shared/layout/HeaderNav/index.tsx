import { Group, Burger } from '@mantine/core';
import { IconPaw } from '@tabler/icons-react';


type HeaderNavProps = {
  opened: boolean;
  toggle: () => void;
};

const HeaderNav = ({ opened, toggle }: HeaderNavProps) => {
  return (
    <Group className='w-full border-b border-borderColor px-4 py-3 justify-between'>

    
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

     
     

    </Group>
  );
};

export default HeaderNav;
