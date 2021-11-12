const formatDate = date =>
  new Intl.DateTimeFormat('en-US', {month: 'long', year: '2-digit'}).format(
    date,
  )
 const callAll =
  (...fns) =>
      async (...args) =>
          fns.forEach(async fn => fn && await fn(...args))

export {formatDate,callAll}
