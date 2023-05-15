const users = async (urls) => {
  const data = await fetch(urls)

  if(!data.ok) {
    console.log(data.status)
  }

  return await data.json()
}

export { users }

