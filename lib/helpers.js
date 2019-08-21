import _ from 'lodash'

export const truncate = function truncate(str, limit) {
  const stringLimit = limit
  const truncated = _.truncate(str, {length: stringLimit, separator: /,? +/, omission: ''})
  return (!str) ? '' : stringLimit < str.length ? `${truncated} ...` : truncated
}
