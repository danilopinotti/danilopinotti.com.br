export interface Tool {
  label: string
  description: string
  to: string
  icon: string
  iconClass: string
}

export const useTools = (): Tool[] => [
  {
    label: 'Battery Life Estimator',
    description: 'Estimate battery life of IoT devices',
    to: '/tools/device-battery-life-estimator',
    icon: 'fa6-solid:battery-half',
    iconClass: 'text-green-500',
  },
  {
    label: 'Base64 Encoder/Decoder',
    description: 'Encode and decode Base64 strings',
    to: '/tools/base64',
    icon: 'fa6-solid:code',
    iconClass: 'text-gray-700',
  },
  {
    label: 'Document Generator',
    description: 'Generate valid CPF and CNPJ for testing',
    to: '/tools/document-generator',
    icon: 'fa6-regular:address-card',
    iconClass: 'text-blue-500',
  },
  {
    label: 'UUID Generator',
    description: 'Generate UUIDs in versions 4, 5 and 7',
    to: '/tools/uuid-generator',
    icon: 'heroicons:finger-print',
    iconClass: 'text-purple-500',
  },
]

