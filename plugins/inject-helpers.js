export default (context, inject) => {
  inject('fromNow', (date) => date ? context.$moment(date).fromNow() : '')
  inject('formatDate', (date) => date ? context.$moment(date).format('L') : '')
  inject('formatDateTime', (date) => date ? context.$moment(date).format('L LT') : '')
}
