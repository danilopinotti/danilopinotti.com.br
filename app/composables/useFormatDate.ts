import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function useFormatDate() {
  const formatDate = (date: string | Date) => {
    if (!date) return ''
    return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR })
  }

  const formatDateTime = (date: string | Date) => {
    if (!date) return ''
    return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: ptBR })
  }

  const fromNow = (date: string | Date) => {
    if (!date) return ''
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ptBR })
  }

  return { formatDate, formatDateTime, fromNow }
}

