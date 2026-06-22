export interface BudgetItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: Date;
}

export interface Budget {
  id: string;
  budget_number: string;
  client_name: string;
  client_document: string;
  client_phone: string;
  client_email: string;
  client_address: string;
  client_address_number: string;
  client_address_complement: string;
  client_address_neighborhood: string;
  client_city: string;
  client_state: string;
  client_cep: string;
  client_contact: string;
  client_contact_role: string;
  client_observations: string;
  issue_date: Date;
  expiration_date: Date;
  subtotal: number;
  shipping_cost: number;
  discount: number;
  total_value: number;
  payment_terms: string;
  delivery_time: string;
  status: 'draft' | 'sent' | 'approved' | 'rejected' | 'expired';
  created_by: string;
  created_at: Date;
  updated_at: Date;
  items: BudgetItem[];
}

export interface BudgetFormData {
  client_name: string;
  client_document: string;
  client_phone: string;
  client_email: string;
  client_address: string;
  client_address_number: string;
  client_address_complement: string;
  client_address_neighborhood: string;
  client_city: string;
  client_state: string;
  client_cep: string;
  client_contact: string;
  client_contact_role: string;
  client_observations: string;
  issue_date: string;
  expiration_date: string;
  subtotal: number;
  shipping_cost: number;
  discount: number;
  total_value: number;
  payment_terms: string;
  delivery_time: string;
  status: Budget['status'];
  items: BudgetItem[];
}

export const DEFAULT_PAYMENT_TERMS = `À vista ou parcelado em até 24x no cartão.
Linhas de crédito específicas para aquisição de equipamentos de inovação tecnológica em até 60x.`;

export const DEFAULT_DELIVERY_TIME = '30 dias úteis após confirmação do pedido.';

export const DEFAULT_BUDGET_ITEM: Omit<BudgetItem, 'id' | 'created_at'> = {
  description: '',
  quantity: 1,
  unit_price: 0,
  total_price: 0,
};

export const INITIAL_CATALOG = [
  {
    description: "Aquabion ION AB-H32",
    capacity: "7m³/h",
    connection: "1.1/4\"",
    unit_price: 26500.00,
  },
  {
    description: "Aquabion ION AB-H40",
    capacity: "10m³/h",
    connection: "1.1/2\"",
    unit_price: 32500.00,
  },
  {
    description: "Aquabion ION AB-H50",
    capacity: "15m³/h",
    connection: "2\"",
    unit_price: 41500.00,
  },
  {
    description: "Aquabion ION AB-H65",
    capacity: "20m³/h",
    connection: "2.1/2\"",
    unit_price: 52000.00,
  },
  {
    description: "Serviço de Instalação",
    capacity: "-",
    connection: "-",
    unit_price: 2500.00,
  },
  {
    description: "Frete",
    capacity: "-",
    connection: "-",
    unit_price: 800.00,
  },
];
