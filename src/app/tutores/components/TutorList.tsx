import { Table, Avatar, Text, Group, ActionIcon, Card } from '@mantine/core';
import { IconEdit, IconEye, IconMail, IconPhone } from '@tabler/icons-react';
import type { Tutor } from '../types';

interface TutorListProps {
  tutores: Tutor[];
  onEdit?: (tutor: Tutor) => void;
  onViewDetails?: (tutor: Tutor) => void;
}

export const TutorList = ({ tutores, onEdit, onViewDetails }: TutorListProps) => {
  if (tutores.length === 0) {
    return (
      <div className="py-12 text-center">
        <Text size="lg" c="dimmed">
          Nenhum tutor encontrado
        </Text>
      </div>
    );
  }

  const rows = tutores.map((tutor) => (
    <Table.Tr key={tutor.id} className="hover:bg-gray-50">
      <Table.Td>
        <Group gap="sm">
          {tutor.foto?.url ? (
            <Avatar src={tutor.foto.url} size={40} radius="xl" />
          ) : (
            <Avatar size={40} radius="xl" color="green">
              {tutor.nome.substring(0, 2).toUpperCase()}
            </Avatar>
          )}
          <div>
            <Text size="sm" fw={500}>
              {tutor.nome}
            </Text>
            {tutor.cpf && (
              <Text size="xs" c="dimmed" className="font-mono">
                {tutor.cpf.toString().padStart(11, '0').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
              </Text>
            )}
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        {tutor.email && (
          <Group gap={6}>
            <IconMail size={14} className="text-gray-500" />
            <Text size="sm">{tutor.email}</Text>
          </Group>
        )}
      </Table.Td>
      <Table.Td>
        {tutor.telefone && (
          <Group gap={6}>
            <IconPhone size={14} className="text-gray-500" />
            <Text size="sm">{tutor.telefone}</Text>
          </Group>
        )}
      </Table.Td>
      <Table.Td>
        {tutor.endereco && (
          <Text size="sm" lineClamp={1} className="max-w-xs">
            {tutor.endereco}
          </Text>
        )}
      </Table.Td>
      <Table.Td>
        <Group gap="xs" justify="flex-end">
          <ActionIcon
            variant="light"
            color="blue"
            onClick={() => onViewDetails?.(tutor)}
          >
            <IconEye size={16} />
          </ActionIcon>
          <ActionIcon
            variant="light"
            color="green"
            onClick={() => onEdit?.(tutor)}
          >
            <IconEdit size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Card shadow="sm" padding="0" radius="md" withBorder>
      <Table.ScrollContainer minWidth={800}>
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Tutor</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Telefone</Table.Th>
              <Table.Th>Endereço</Table.Th>
              <Table.Th style={{ width: 100, textAlign: 'right' }}>Ações</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Card>
  );
};
