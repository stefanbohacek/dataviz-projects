const getServerPlatform = async (domain) => {
  let platform;
  try {
      const response = await fetch(`https://fediverse-info.stefanbohacek.dev/node-info?domain=${domain}`);
      let data = await response.json();
      platform = data?.software?.name.toLowerCase();
  } catch (error){
      console.log('getServerPlatform error', {error});
  }
  return platform;}

export default getServerPlatform;
