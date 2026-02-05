import { Text, Group, Anchor } from '@mantine/core';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1B241D' }} className="w-full py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-3">
            <Text size="lg" fw={600} c="white">
              Meet Pet
            </Text>
            <Text size="sm" c="gray.4">
              Conectando pets com tutores especializados para cuidados e treinamento.
            </Text>
          </div>

      
        </div>

        <div className="border-t border-gray-700 pt-6">
          <Group justify="space-between" className="flex-col md:flex-row gap-4">
            <Text size="sm" c="gray.5">
              © {new Date().getFullYear()} Meet Pet. Todos os direitos reservados.
            </Text>
            <Group gap="lg">
              <Anchor href="#" size="sm" c="gray.4" className="hover:text-white">
                Política de Privacidade
              </Anchor>
              <Anchor href="#" size="sm" c="gray.4" className="hover:text-white">
                Termos de Uso
              </Anchor>
            </Group>
          </Group>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
