export interface Product {
  id: string;
  description: string;
  capacity?: string;
  connection?: string;
  unit_price: number;
  created_at: Date;
  updated_at: Date;
}

export interface ProductFormData {
  description: string;
  capacity?: string;
  connection?: string;
  unit_price: number;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    description: 'Aquabion ION AB-H32',
    capacity: '7m³/h',
    connection: '1.1/4"',
    unit_price: 26500.00,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '2',
    description: 'Aquabion ION AB-H40',
    capacity: '10m³/h',
    connection: '1.1/2"',
    unit_price: 32500.00,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '3',
    description: 'Aquabion ION AB-H50',
    capacity: '15m³/h',
    connection: '2"',
    unit_price: 41500.00,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '4',
    description: 'Aquabion ION AB-H65',
    capacity: '20m³/h',
    connection: '2.1/2"',
    unit_price: 52000.00,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '5',
    description: 'Serviço de Instalação',
    capacity: '-',
    connection: '-',
    unit_price: 2500.00,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '6',
    description: 'Frete',
    capacity: '-',
    connection: '-',
    unit_price: 800.00,
    created_at: new Date(),
    updated_at: new Date(),
  },
];
